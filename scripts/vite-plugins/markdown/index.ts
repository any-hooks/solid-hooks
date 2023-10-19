import { type Plugin, createFilter } from 'vite'
import { markdownToSolid } from './transform'

export default function vitePluginMarkdown(): Plugin {
  const filter = createFilter([/\.md$/], /node_modules/)

  return {
    name: 'vite-plugin-solid-markdown',
    enforce: 'pre',
    async transform(code, id) {
      if (!filter(id)) return
      try {
        return (await markdownToSolid(code, id)).code
      } catch (e: any) {
        this.error(e)
      }
    },
    handleHotUpdate(ctx) {
      if (!filter(ctx.file)) return

      const defaultRead = ctx.read
      ctx.read = async function () {
        return (await markdownToSolid(ctx.file, await defaultRead())).code
      }
    },
  }
}
