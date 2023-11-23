const htmlUnescapeMap = {
  '&amp;': '&',
  '&#38;': '&',
  '&lt;': '<',
  '&#60;': '<',
  '&gt;': '>',
  '&#62;': '>',
  '&apos;': '\'',
  '&#39;': '\'',
  '&quot;': '"',
  '&#34;': '"',
}

const htmlUnescapeRegexp = /&(amp|#38|lt|#60|gt|#62|apos|#39|quot|#34);/g

/**
 * Unescape html chars
 */
export function htmlUnescape(str: string): string {
  return str.replace(
    htmlUnescapeRegexp,
    char => htmlUnescapeMap[char as keyof typeof htmlUnescapeMap],
  )
}
