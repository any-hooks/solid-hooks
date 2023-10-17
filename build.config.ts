import { defineBuildConfig } from 'unbuild'

export default defineBuildConfig({
  entries: [
    {
      input: 'src/index.ts',
      format: 'esm',
      ext: 'mjs',
      // pattern: ['**/*.ts', '!**/*.test.ts'],
    },
  ],
  declaration: true,
  clean: true,
  failOnWarn: false,
  outDir: 'dist',
  externals: [/solid\-js/],
})
