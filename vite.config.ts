/// <reference types="vitest" />
/// <reference types="vite/client" />

import path from 'node:path'
import unocss from 'unocss/vite'
import { defineConfig } from 'vite'
import Solid from 'vite-plugin-solid'
import Markdown from './scripts/vite-plugins/markdown'

export default defineConfig({
  plugins: [
    Markdown(),
    Solid({
      extensions: ['.tsx', '.md'],
    }),
    unocss(),
  ],
  resolve: {
    alias: [
      { find: '~', replacement: path.resolve(__dirname, 'docs') },
      { find: '@any-hooks/solid', replacement: path.resolve(__dirname, 'src') },
    ],
  },
  css: {
    modules: {
      localsConvention: 'camelCase',
      scopeBehaviour: 'local',
    },
  },
  build: {
    outDir: 'docs/dist',
  },
  test: {
    deps: {
      optimizer: {
        web: {
          include: ['solid-js', '@solidjs/router'],
        },
      },
    },
    environment: 'jsdom',
    globals: true,
    setupFiles: ['node_modules/@testing-library/jest-dom/vitest.js'],
    testTransformMode: {
      web: ['.tsx', '.jsx'],
    },
  },
})
