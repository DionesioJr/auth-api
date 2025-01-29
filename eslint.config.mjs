// @ts-check
import eslint from '@eslint/js'
import eslintPluginPrettierRecommended from 'eslint-plugin-prettier/recommended'
import globals from 'globals'
import tseslint from 'typescript-eslint'

export default tseslint.config({
  ignores: ['eslint.config.mjs', 'dist', 'node_modules'], // ✅ Ignora arquivos desnecessários

  extends: [
    eslint.configs.recommended,
    ...tseslint.configs.recommendedTypeChecked,
    eslintPluginPrettierRecommended
  ],

  languageOptions: {
    globals: {
      ...globals.node,
      ...globals.jest,
    },
    ecmaVersion: 2021, // ✅ Agora atualizado para código moderno (NestJS usa ES2021+)
    sourceType: 'module',
    parserOptions: {
      projectService: true,
      tsconfigRootDir: import.meta.dirname,
    },
  },

  rules: {
    '@typescript-eslint/no-explicit-any': 'off', // ✅ Permite `any` sem avisos chatos
    '@typescript-eslint/no-floating-promises': 'warn', // ⚠️ Apenas avisa se uma Promise for esquecida
    '@typescript-eslint/no-unsafe-argument': 'warn', // ⚠️ Aviso, mas não bloqueia código
    '@typescript-eslint/no-unsafe-assignment': 'warn', // ⚠️ Aviso para evitar bugs, mas sem impedir o desenvolvimento
    '@typescript-eslint/explicit-module-boundary-types': 'off', // ✅ Não obriga definir tipo de retorno nas funções
    '@typescript-eslint/no-unused-vars': ['warn', {
      'argsIgnorePattern': '^_'
    }], // ⚠️ Ignora variáveis iniciadas com `_`
    'prettier/prettier': ['error', {
      endOfLine: 'auto'
    }], // ✅ Mantém Prettier alinhado ao ESLint
    'no-console': 'warn', // ⚠️ Permite console.log, mas avisa
    'prefer-const': 'warn' // ⚠️ Sugere `const` quando possível
  }
})