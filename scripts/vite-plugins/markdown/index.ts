import { type Plugin, createFilter } from 'vite'
import { markdownToSolid } from './transform'

export default function vitePluginMarkdown(): Plugin {
  const filter = createFilter([/\.md$/], /node_modules/)
  const demoFilter = createFilter([/use.*?\/demo\/.*\.tsx$/])
  let isBuild = false
  return {
    name: 'vite-plugin-solid-markdown',
    enforce: 'pre',
    configResolved(config) {
      isBuild = config.command === 'build'
    },
    async transform(code, id) {
      if (!filter(id)) return
      try {
        return (await markdownToSolid(code, id, isBuild)).code
      } catch (e: any) {
        this.error(e)
      }
    },
    handleHotUpdate(ctx) {
      if (!filter(ctx.file)) return

      const defaultRead = ctx.read
      ctx.read = async function () {
        return (await markdownToSolid(await defaultRead(), ctx.file)).code
      }
    },
  }
}
