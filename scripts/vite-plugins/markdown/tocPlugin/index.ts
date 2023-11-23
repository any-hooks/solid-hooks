import type MarkdownIt from 'markdown-it'
import { resolveHeadersFromTokens } from '../utils/resolve-headers'
import { slugify as defaultSlugify } from '../utils/slugify'
import { createRenderHeaders } from './create-render-headers.js'
import { createTocBlockRule } from './create-toc-block-rule.js'

/**
 * Generate table of contents
 *
 * Forked and modified from markdown-it-toc-done-right:
 *
 * @see https://github.com/nagaozen/markdown-it-toc-done-right
 */
export const tocPlugin: MarkdownIt.PluginWithOptions<TocPluginOptions> = (
  md,
  {
    pattern = /^\[\[toc\]\]$/i,
    slugify = defaultSlugify,
    format,
    level = [2, 3],
    shouldAllowNested = false,
    containerTag = 'nav',
    containerClass = 'table-of-contents',
    listTag = 'ul',
    listClass = '',
    itemClass = '',
    linkTag = 'a',
    linkClass = '',
  }: TocPluginOptions = {},
): void => {
  // add toc syntax as a block rule
  md.block.ruler.before(
    'heading',
    'toc',
    createTocBlockRule({
      pattern,
      containerTag,
      containerClass,
    }),
    {
      alt: ['paragraph', 'reference', 'blockquote'],
    },
  )

  // create the headers renderer from the options
  const renderHeaders = createRenderHeaders({
    listTag,
    listClass,
    itemClass,
    linkTag,
    linkClass,
  })

  // custom toc_body render rule
  // Notice that markdown-it-toc-done-right collects ast (i.e. headers) by pushing a custom ruler,
  // that's good because it ensures we only collect headers once. However the collected headers
  // are possible to be overridden by calling `md.render` / `md.renderInline` before the toc_body
  // is rendered (like https://github.com/vuejs/vitepress/issues/1093).
  // Here we changed to collect headers during rendering toc_body. The drawback is that it is possible
  // to collect headers multiple times if there are more than one toc_body, which is acceptable because
  // in most cases there is only one toc per page.
  md.renderer.rules.toc_body = tokens =>
    renderHeaders(
      resolveHeadersFromTokens(tokens, {
        level,
        shouldAllowHtml: true,
        shouldAllowNested,
        shouldEscapeText: true,
        slugify,
        format,
      }),
    )
}

export interface TocPluginOptions {
  /**
   * The pattern serving as the TOC placeholder in your markdown
   *
   * @default /^\[\[toc\]\]$/i
   */
  pattern?: RegExp

  /**
   * A custom slugification function
   *
   * Should use the same slugify function with markdown-it-anchor
   * to ensure the link is matched
   */
  slugify?: (str: string) => string

  /**
   * A function for formatting headings
   */
  format?: (str: string) => string

  /**
   * Heading level that going to be included in the TOC
   *
   * Should be a subset of markdown-it-anchor's `level` option
   * to ensure the link is existed
   *
   * @default [2,3]
   */
  level?: number[]

  /**
   * Should allow headers inside nested blocks or not
   *
   * If set to `true`, headers inside blockquote, list, etc. would also be included.
   *
   * @default false
   */
  shouldAllowNested?: boolean

  /**
   * HTML tag of the TOC container
   *
   * @default 'nav'
   */
  containerTag?: string

  /**
   * The class for the TOC container
   *
   * @default 'table-of-contents'
   */
  containerClass?: string

  /**
   * HTML tag of the TOC list
   *
   * @default 'ul'
   */
  listTag?: 'ul' | 'ol'

  /**
   * The class for the TOC list
   *
   * @default ''
   */
  listClass?: string

  /**
   * The class for the `<li>` tag
   *
   * @default ''
   */
  itemClass?: string

  /**
   * The tag of the link inside `<li>` tag
   *
   * @default 'a'
   */
  linkTag?: 'a' | 'router-link'

  /**
   * The class for the link inside the `<li>` tag
   *
   * @default ''
   */
  linkClass?: string
}
