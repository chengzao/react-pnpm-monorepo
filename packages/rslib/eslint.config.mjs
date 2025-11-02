// 构建工具包 ESLint 配置 - 适用于 rslib, rollup, vite, tsup, gulp
import js from '@eslint/js';
import globals from 'globals';
import tseslint from 'typescript-eslint';
import reactHooks from 'eslint-plugin-react-hooks';
import reactRefresh from 'eslint-plugin-react-refresh';
import { fileURLToPath } from 'node:url';

export default [
  // 忽略构建目录
  {
    ignores: [
      '**/dist/**',
      '**/lib/**',
      '**/es/**',
      '**/node_modules/**',
      '**/.next/**',
      '**/build/**',
      '**/pnpm-lock.yaml',
      '**/*.md',
    ],
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
      curly: ['error', 'multi-line'],
      'no-eval': 'error',
    },
  },

  // TypeScript 配置
  {
    files: ['**/*.{ts,tsx}'],
    languageOptions: {
      parser: tseslint.parser,
      parserOptions: {
        ecmaVersion: 'latest',
        sourceType: 'module',
        tsconfigRootDir: fileURLToPath(new URL('.', import.meta.url)),
      },
    },
    plugins: {
      '@typescript-eslint': tseslint.plugin,
      'react-hooks': reactHooks,
    },
    rules: {
      ...tseslint.configs.recommended.rules,
      '@typescript-eslint/no-unused-vars': 'off',
      '@typescript-eslint/no-console': 'off',
      '@typescript-eslint/no-debugger': 'off',
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

  // 配置文件特殊规则（适用于所有配置文件）
  {
    files: [
      '**/*.config.{js,ts,mjs}',
      '**/.fatherrc.ts',
      'rslib.config.ts',
      'vite.config.ts',
      'rollup.config.js',
      'gulpfile.js',
    ],
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

  // 示例代码和文档（允许更宽松的规则）
  {
    files: ['example/**/*', '**/*.stories.*', '**/*.md'],
    rules: {
      'no-console': 'off',
      'no-debugger': 'off',
      '@typescript-eslint/no-unused-vars': 'off',
      'no-unused-vars': 'off',
    },
  },
];
