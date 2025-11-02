// 组件库包 ESLint 配置 - 适用于 ui 包
import js from '@eslint/js';
import globals from 'globals';
import tseslint from 'typescript-eslint';
import reactHooks from 'eslint-plugin-react-hooks';
import reactRefresh from 'eslint-plugin-react-refresh';

export default [
  // 忽略构建目录
  {
    ignores: ['**/dist/**', '**/lib/**', '**/es/**', '**/node_modules/**', '**/.next/**', '**/build/**'],
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
      'no-unused-vars': 'error',
      'no-console': 'warn',
      'no-debugger': 'error',
      eqeqeq: 'error',
      curly: 'error',
      'no-eval': 'error',
    },
  },

  // TypeScript 配置（更严格）
  {
    files: ['**/*.{ts,tsx}'],
    languageOptions: {
      parser: tseslint.parser,
      parserOptions: {
        ecmaVersion: 'latest',
        sourceType: 'module',
      },
    },
    plugins: {
      '@typescript-eslint': tseslint.plugin,
      'react-hooks': reactHooks,
    },
    rules: {
      ...tseslint.configs.recommended.rules,
      ...tseslint.configs.recommendedTypeChecked.rules,
      '@typescript-eslint/no-unused-vars': 'error',
      '@typescript-eslint/explicit-function-return-type': 'off',
      '@typescript-eslint/explicit-module-boundary-types': 'off',
      'react-hooks/rules-of-hooks': 'error',
      'react-hooks/exhaustive-deps': 'error', // 组件库要求更严格
    },
  },

  // React 配置（组件库要求）
  {
    files: ['**/*.{jsx,tsx}'],
    plugins: {
      'react-hooks': reactHooks,
      'react-refresh': reactRefresh,
    },
    rules: {
      'react-hooks/rules-of-hooks': 'error',
      'react-hooks/exhaustive-deps': 'error', // 组件库要求更严格
      'react-refresh/only-export-components': 'warn',
      'react/jsx-key': 'error',
      'react/jsx-no-useless-fragment': 'error',
    },
  },

  // 配置文件特殊规则
  {
    files: ['**/*.config.{js,ts,mjs}', '**/.fatherrc.ts'],
    rules: {
      'no-console': 'off',
      'no-debugger': 'off',
      '@typescript-eslint/no-unused-vars': 'off',
      'no-unused-vars': 'off',
    },
  },

  // 样式文件相关
  {
    files: ['**/*.less', '**/*.css'],
    rules: {
      'no-unused-vars': 'off',
      'no-console': 'off',
    },
  },
];
