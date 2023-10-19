import type MarkdownIt from 'markdown-it'
import {
  type MarkdownItHeader,
  resolveHeadersFromTokens,
} from '../utils/resolve-headers'
import { slugify as defaultSlugify } from '../utils/slugify'

/**
 * Options of @mdit-vue/plugin-headers
 */
export interface HeadersPluginOptions {
  /**
   * A custom slugification function
   *
   * Should use the same slugify function with markdown-it-anchor
   * to ensure the link is matched
   */
  slugify?: (str: string) => string

  /**
   * A function for formatting header title
   */
  format?: (str: string) => string

  /**
   * Heading level that going to be extracted
   *
   * Should be a subset of markdown-it-anchor's `level` option
   * to ensure the slug is existed
   *
   * @default [2,3]
   */
  level?: number[]

  /**
   * Should allow headers inside nested blocks or not
   *
   * If set to `true`, headers inside blockquote, list, etc. would also be extracted.
   *
   * @default false
   */
  shouldAllowNested?: boolean
}

/**
 * Get markdown headers info
 *
 * Extract them into env
 */
export const headersPlugin: MarkdownIt.PluginWithOptions<
  HeadersPluginOptions
> = (
  md,
  {
    level = [2, 3],
    shouldAllowNested = false,
    slugify = defaultSlugify,
    format,
  } = {},
): void => {
  // extract headers to env
  const render = md.renderer.render.bind(md.renderer)
  md.renderer.render = (
    tokens,
    options,
    env: { headers?: MarkdownItHeader[] },
  ) => {
    env.headers = resolveHeadersFromTokens(tokens, {
      level,
      shouldAllowHtml: false,
      shouldAllowNested,
      shouldEscapeText: false,
      slugify,
      format,
    })
    return render(tokens, options, env)
  }
}
