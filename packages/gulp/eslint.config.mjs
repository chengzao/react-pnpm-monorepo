// 构建工具包 ESLint 配置 - 适用于 gulp
import js from '@eslint/js';
import globals from 'globals';

export default [
  // 忽略构建目录
  {
    ignores: ['**/dist/**', '**/lib/**', '**/es/**', '**/node_modules/**', '**/.next/**', '**/build/**', '**/pnpm-lock.yaml'],
  },

  // 基础配置
  {
    files: ['**/*.{js,jsx,ts,tsx}'],
    languageOptions: {
      ecmaVersion: 2020,
      sourceType: 'module',
      globals: {
        ...globals.browser,
        ...globals.node,
      },
    },
    rules: {
      'prefer-const': 'error',
      'no-unused-vars': 'off',
      'no-console': 'off',
      'no-debugger': 'off',
      eqeqeq: 'error',
      curly: 'error',
      'no-eval': 'error',
    },
  },

  // 配置文件特殊规则
  {
    files: ['**/*.config.{js,ts,mjs}', 'gulpfile.js', '.babelrc.js', '.browserslistrc'],
    rules: {
      'no-console': 'off',
      'no-debugger': 'off',
      'no-unused-vars': 'off',
    },
  },

  // TypeScript 源码（如果需要）
  {
    files: ['src/**/*.ts', 'src/**/*.tsx'],
    languageOptions: {
      parser: '@typescript-eslint/parser',
      parserOptions: {
        ecmaVersion: 'latest',
        sourceType: 'module',
      },
    },
    plugins: {
      '@typescript-eslint': require('@typescript-eslint/eslint-plugin'),
    },
    rules: {
      '@typescript-eslint/no-unused-vars': 'off',
      '@typescript-eslint/no-console': 'off',
      '@typescript-eslint/no-debugger': 'off',
    },
  },
];
