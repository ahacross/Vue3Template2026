import globals from 'globals'
import pluginVue from 'eslint-plugin-vue'
import oxlint from 'eslint-plugin-oxlint'
import prettierConfig from '@vue/eslint-config-prettier'
import autoImport from './.eslintrc-auto-import.js'

export default [
  ...pluginVue.configs['flat/recommended'],
  ...oxlint.configs['flat/recommended'], // Spread in case it's an array
  ...(prettierConfig.rules ? [prettierConfig] : Array.isArray(prettierConfig) ? prettierConfig : [prettierConfig]), // Handle spread safely
  {
    files: ['**/*.{js,mjs,cjs,ts,vue}'],
    languageOptions: {
      globals: {
        ...globals.browser,
        ...globals.node,
        ...autoImport.globals,
        defineModel: 'readonly',
        definePage: 'readonly',
      },
    },
    rules: {
      'vue/block-order': [
        'error',
        {
          order: ['route', 'template', 'script', 'script setup', 'style'],
        },
      ],
      'vue/require-prop-types': 'off',
      'vue/multi-word-component-names': 'off',
    },
  },
]
