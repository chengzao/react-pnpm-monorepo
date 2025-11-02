// 统一的 ESLint 配置 - ESLint 9.x flat config
import js from '@eslint/js';
import globals from 'globals';
import tseslint from 'typescript-eslint';
import reactHooks from 'eslint-plugin-react-hooks';
import reactRefresh from 'eslint-plugin-react-refresh';

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
      // 基本规则
      'prefer-const': 'error',
      'no-unused-vars': 'off',
      'no-console': 'warn',
      'no-debugger': 'error',
      eqeqeq: 'error',
      curly: 'error',
      'no-eval': 'error',
    },
  },

  // TypeScript 配置
  {
    files: ['**/*.{ts,tsx}'],
    languageOptions: {
      parser: tseslint.parser,
      parserOptions: {
        project: './tsconfig.json',
      },
    },
    plugins: {
      '@typescript-eslint': tseslint.plugin,
      'react-hooks': reactHooks,
    },
    rules: {
      ...tseslint.configs.recommended.rules,
      '@typescript-eslint/no-unused-vars': 'error',
      'react-hooks/rules-of-hooks': 'error',
      'react-hooks/exhaustive-deps': 'warn',
    },
  },

  // React 配置
  {
    files: ['**/*.{jsx,tsx}'],
    plugins: {
      'react-hooks': reactHooks,
      'react-refresh': reactRefresh,
    },
    rules: {
      'react-hooks/rules-of-hooks': 'error',
      'react-hooks/exhaustive-deps': 'warn',
      'react-refresh/only-export-components': 'warn',
    },
  },

  // 配置文件特殊规则
  {
    files: ['**/*.config.{js,ts,mjs}', '**/.fatherrc.ts', 'rslib.config.ts'],
    languageOptions: {
      parserOptions: {},
    },
    rules: {
      'no-console': 'off',
      'no-debugger': 'off',
      '@typescript-eslint/no-unused-vars': 'off',
      'no-unused-vars': 'off',
    },
  },
];
