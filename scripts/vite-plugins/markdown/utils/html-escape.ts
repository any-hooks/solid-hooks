const htmlEscapeMap = {
  '&': '&amp;',
  '<': '&lt;',
  '>': '&gt;',
  '\'': '&#39;',
  '"': '&quot;',
}

const htmlEscapeRegexp = /[&<>'"]/g

/**
 * Escape html chars
 */
export function htmlEscape(str: string): string {
  return str.replace(
    htmlEscapeRegexp,
    char => htmlEscapeMap[char as keyof typeof htmlEscapeMap],
  )
}
