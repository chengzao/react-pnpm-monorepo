// 测试包 ESLint 配置 - 适用于 vitest 等测试工具包
import js from '@eslint/js';
import globals from 'globals';
import tseslint from 'typescript-eslint';

export default [
  // 忽略构建目录
  {
    ignores: ['**/dist/**', '**/lib/**', '**/es/**', '**/node_modules/**', '**/.next/**', '**/build/**', '**/tests/**'],
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
        ...globals.jest,
      },
    },
    rules: {
      'prefer-const': 'error',
      'no-unused-vars': 'warn',
      'no-console': 'off', // 测试文件允许 console.log
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
        ecmaVersion: 'latest',
        sourceType: 'module',
      },
    },
    plugins: {
      '@typescript-eslint': tseslint.plugin,
    },
    rules: {
      ...tseslint.configs.recommended.rules,
      '@typescript-eslint/no-unused-vars': 'warn',
      '@typescript-eslint/no-console': 'off',
      '@typescript-eslint/explicit-function-return-type': 'off',
      '@typescript-eslint/explicit-module-boundary-types': 'off',
    },
  },

  // 测试文件特殊规则
  {
    files: ['**/*.{test,spec}.{js,jsx,ts,tsx}', '**/tests/**/*'],
    rules: {
      'no-console': 'off', // 测试中允许 console
      'no-debugger': 'off',
      '@typescript-eslint/no-console': 'off',
      '@typescript-eslint/no-debugger': 'off',
    },
  },

  // 配置文件特殊规则
  {
    files: ['**/*.config.{js,ts,mjs}', 'vitest.config.ts'],
    rules: {
      'no-console': 'off',
      'no-debugger': 'off',
      '@typescript-eslint/no-unused-vars': 'off',
      'no-unused-vars': 'off',
    },
  },
];
