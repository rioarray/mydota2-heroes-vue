// @ts-check
import eslintConfigPrettier from 'eslint-config-prettier/flat'
import pluginQuery from '@tanstack/eslint-plugin-query'
import withNuxt from './.nuxt/eslint.config.mjs'

export default withNuxt(
  // Your custom configs here
  eslintConfigPrettier,
  ...pluginQuery.configs['flat/recommended']
)
