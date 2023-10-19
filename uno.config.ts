import {
  defineConfig,
  presetUno,
  transformerDirectives,
  transformerVariantGroup,
} from 'unocss'
import type { Theme } from 'unocss/preset-uno'

export default defineConfig({
  shortcuts: {
    'border': 'b b-solid b-border',
    'border-t': 'b-t b-t-solid b-border',
    'border-r': 'b-r b-r-solid b-border',
    'border-b': 'b-b b-b-solid b-border',
    'border-l': 'b-l b-l-solid b-border',
    'flex-center': 'flex justify-center items-center',
    'flex-items-center': 'flex items-center',
    'fixed-0': 'fixed top-0 left-0',
    'icon': 'inline-block w-1em h-1em text-1em leading-1em vertical-middle',
    'pt-navbar': 'pt-[var(--navbar-height)]',
    'top-navbar': 'top-[var(--navbar-height)]',
    'mt-navbar': 'mt-[var(--navbar-height)]',
    'pl-sidebar': 'pl-[var(--sidebar-width)]',
    'ml-sidebar': 'ml-[var(--sidebar-width)]',
    'left-sidebar': 'left-[var(--sidebar-width)]',
  },
  theme: {
    colors: {
      'border': 'var(--c-border)',
      'brand': 'var(--c-brand)',
      'brand-light': 'var(--c-brand-light)',
      'text': 'var(--c-text-2)',
    },
    width: {
      sidebar: 'var(--sidebar-width)',
    },
    height: {
      navbar: 'var(--navbar-height)',
    },
  } as Theme,
  safelist: ['border', 'icon', 'flex', 'text-brand', 'text-brand-light'],
  presets: [presetUno()],
  transformers: [transformerDirectives(), transformerVariantGroup()],
})
