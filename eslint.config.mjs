import antfu from '@antfu/eslint-config'

// @ts-check
import withNuxt from './.nuxt/eslint.config.mjs'

// TODO: add tailwindcss plugin

export default withNuxt(antfu({
  type: 'app',
  vue: true,
  typescript: true,
  formatters: true,
  stylistic: {
    indent: 2,
    semi: false,
    quotes: 'single',
  },
  ignores: ['.pnpm-store/**', '**/migrations/*', 'README.md'],
}, {
  rules: {
    'vue/max-attributes-per-line': ['error', {
      singleline: {
        max: 2,
      },
      multiline: {
        max: 1,
      },
    }],
    // 'padding-line-between-statements': [
    //   'error',
    //   { blankLine: 'always', prev: 'export', next: 'export' },
    // ],
    'ts/no-redeclare': 'off',
    'ts/consistent-type-definitions': ['error', 'type'],
    'no-console': ['warn'],
    'antfu/no-top-level-await': ['off'],
    'node/prefer-global/process': ['off'],
    'node/no-process-env': ['error'],
    'perfectionist/sort-imports': ['error', {
      tsconfig: {
        rootDir: '.',
      },
    }],
    'unicorn/filename-case': ['error', {
      case: 'kebabCase',
      ignore: ['README.md'],
    }],
  },
}))
