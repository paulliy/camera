import js from '@eslint/js'
import globals from 'globals'
import tseslint from 'typescript-eslint'
import pluginVue from 'eslint-plugin-vue'
import { defineConfig } from 'eslint/config'
import prettierConfig from '@electron-toolkit/eslint-config-prettier'

export default defineConfig([
  { ignores: ['node_modules', 'dist', 'out', 'build'] },
  {
    files: ['**/*.{js,mjs,cjs,ts,mts,cts,vue}'],
    plugins: { js },
    extends: ['js/recommended'],
    languageOptions: { globals: globals.browser }
  },
  tseslint.configs.recommended,
  pluginVue.configs['flat/essential'],
  { files: ['**/*.vue'], languageOptions: { parserOptions: { parser: tseslint.parser } } },
  {
    rules: {
      '@typescript-eslint/no-require-imports': 'warn',
      'no-unused-vars': 'off',
      '@typescript-eslint/no-unused-vars': [
        'warn',
        {
          argsIgnorePattern: '^(_|err|props)',
          varsIgnorePattern: '^(_|err|props)',
          caughtErrorsIgnorePattern: '^(_|err)'
        }
      ],
      'vue/multi-word-component-names': 'off'
    }
  },
  prettierConfig
])
