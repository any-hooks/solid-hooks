import fs from 'node:fs'
import path from 'node:path'
import gm from 'gray-matter'
import MarkdownIt from 'markdown-it'
import { escapeHtml } from 'markdown-it/lib/common/utils'
import anchorPlugin from 'markdown-it-anchor'
import attrsPlugin from 'markdown-it-attrs'
import { type Highlighter, getHighlighter, renderToHtml } from 'shiki'
import { normalizePath } from 'vite'
import { headersPlugin } from './headersPlugin'
import { tocPlugin } from './tocPlugin'
import { slugify } from './utils/slugify'

const RE_CODE = /<code src="(.+?)" \/>/gm
const RE_CODE_SIGNAL = /<code src="(.+?)" \/>/
const RE_DEMO = /(\/\*[\s\S]*?\*\/)([\s\S]*)/
const RE_DATA = /(title|desc)(?:\.)?(en|en\-US|zh\-CN)?\:\s+(.*)/
const RE_SAFE_CODE = /[\{\}\$]/gm
const RE_SAFE_LEFT = /{&#39;/g
const RE_SAFE_RIGHT = /&#39;}/g
const RE_SAFE_EMPTY = /\s+/g

const cache = new Map<string, readonly [string, string]>()
let uid = 1

const themes = {
  dark: 'material-theme-palenight',
  light: 'vitesse-light',
}

let hls: Highlighter

async function createHls() {
  if (hls) return hls
  hls = await getHighlighter({ themes: [themes.light, themes.dark] })
  return hls
}

function renderCode(code: string, lang: string, theme: string) {
  const tokens = hls.codeToThemedTokens(
    code.replace(/^[\n\r]+|[\n\r]+$/g, '').trim(),
    lang,
    theme,
  )
  tokens.forEach((token) => {
    token.forEach((t) => {
      if (t.content) {
        t.content = safeContent(t.content)
      }
    })
  })
  return renderToHtml(tokens)
    .replace(RE_SAFE_LEFT, "{'")
    .replace(RE_SAFE_RIGHT, "'}")
}

function safeContent(content: string) {
  return content
    .replace(RE_SAFE_CODE, (match) => {
      if (match === '$') {
        return '\\$'
      }
      return `{'${match}'}`
    })
    .replace(RE_SAFE_EMPTY, (s) => `{'${s}'}`)
}

let md!: MarkdownIt
async function createMarkdownRender() {
  if (md) return md
  await createHls()
  md = MarkdownIt({
    html: true,
    linkify: true,
    highlight(str, lang) {
      if (lang) {
        const lightContent = renderCode(str, lang, themes.light)
        const darkContent = renderCode(str, lang, themes.dark)

        const lines = lightContent.split('\n')
        const lineNumbersCode = lines
          .map(() => '<div class="line-number"></div>')
          .join('')
        const content = `<div class="light-code">${lightContent}</div><div class="dark-code">${darkContent}</div>`
        return `<div class="language-${lang}" data-lang="${lang}"><span class="copy-code"></span>${content}<div class="line-numbers" aria-hidden="true">${lineNumbersCode}</div></div>`
      }
    },
  })

  md.linkify.set({ fuzzyLink: false })
  md.use(attrsPlugin)
  md.use(anchorPlugin, {
    slugify,
    level: [2, 3],
    permalink: anchorPlugin.permalink.linkInsideHeader({
      symbol: '&ZeroWidthSpace;',
      renderAttrs: (slug, state) => {
        // Find `heading_open` with the id identical to slug
        const idx = state.tokens.findIndex((token) => {
          const attrs = token.attrs
          const id = attrs?.find((attr) => attr[0] === 'id')
          return id && slug === id[1]
        })
        // Get the actual heading content
        const title = state.tokens[idx + 1].content
        return {
          'aria-label': `Permalink to "${title}"`,
        }
      },
    }),
  })
  md.use(headersPlugin, { level: [2, 3, 4, 5, 6], slugify })
  md.use(tocPlugin)
  md.renderer.rules.code_inline = (tokens, idx, options, env, slf) => {
    const token = tokens[idx]
    // const lang = token.info.trim().slice(1, -1)
    return `<code ${slf.renderAttrs(token)}>${safeContent(
      escapeHtml(token.content),
    )}</code>`
  }
  return md
}

function parseDemo(content: string) {
  const match = content.match(RE_DEMO)
  if (!match) return { data: '{}', content }
  const data = {}
  match[1]
    .replace(/[\/\*]/gm, '')
    .split('\n')
    .map((m) => m.trim())
    .filter(Boolean)
    .forEach((m) => {
      const [_, key, lang = 'en-US', value] = m.match(RE_DATA) || []
      if (!data[`/${lang}`]) {
        data[`/${lang}`] = {}
      }
      data[`/${lang}`][key] = value
    })
  content = match[2].trim()
  return {
    data: JSON.stringify(data),
    content,
  }
}

export async function markdownToSolid(
  raw: string,
  id: string,
  _isBuild = false,
) {
  const resolve = (url: string) => path.join(path.dirname(id), url)
  const basename = path.basename(id)
  const dirnameList = path.dirname(id).replace(/\/$/, '').split('/')

  const md = await createMarkdownRender()
  const { content, data } = gm(raw)
  data.lang = basename.match(/index\.(.*)?.md$/)?.[1] ?? 'en-US'
  data.title = data.title ?? dirnameList[dirnameList.length - 1]
  const filename = data.title
  const matter = JSON.stringify(data)

  let prerender = md.render(`${content}\n[[toc]]`)
  const demoList: (readonly [string, string])[] = []
  const demoCodeList = prerender.match(RE_CODE) || []

  for (const m of demoCodeList) {
    const [, url] = m.match(RE_CODE_SIGNAL) || []
    const resolveUrl = resolve(url)
    let cached = cache.get(resolveUrl)
    if (!cached) {
      cached = [
        `Component${uid++}`,
        normalizePath(path.join('~~', filename, url)),
      ] as const
      cache.set(resolveUrl, cached)
    }
    demoList.push(cached)
    const code = await fs.promises.readFile(resolveUrl, 'utf8')
    const { data, content } = parseDemo(code)
    const ext = path.extname(url).slice(1)
    const demoCode = md.render(
      `
\`\`\` ${ext}
${content}
\`\`\`
      `,
    )
    prerender = prerender.replace(
      m,
      `<Demo data={${data}} component={<${cached[0]} />}>${demoCode}</Demo>`,
    )
  }

  const rendered = prerender.split('<nav class="table-of-contents">')

  const code = `import Demo from '~/components/Demo'
${demoList.map(([name, url]) => `import ${name} from '${url}'`).join('\n')}

export const frontmatter = ${matter}

export default () => {
  return (<div class="flex justify-start items-start">
    <div class="markdown-body flex-1 w-1px pb-10">${rendered[0]}</div>
    ${rendered[1] ? `<nav class="toc-container">${rendered[1]}` : ''}
  </div>)
}
  `

  return { code, map: null }
}
