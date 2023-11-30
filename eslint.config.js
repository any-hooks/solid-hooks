import eslintConfig from '@pengzhanbo/eslint-config-solid'

export default eslintConfig(
  {
    ignores: ['**/docs_dist'],
    unocss: true,
  },
  {
    files: ['src/**/demo/**'],
    rules: {
      'no-console': 'off',
    },
  },
  {
    rules: {
      'ts/ban-ts-comment': 'off',
      'ts/prefer-ts-expect-error': 'off',
    },
  },
)
