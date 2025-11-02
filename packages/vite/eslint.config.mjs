// 构建工具包 ESLint 配置 - 适用于 vite
import js from '@eslint/js';
import globals from 'globals';
import tseslint from 'typescript-eslint';

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
      '@typescript-eslint/no-unused-vars': 'off',
      '@typescript-eslint/no-console': 'off',
      '@typescript-eslint/no-debugger': 'off',
    },
  },

  // 配置文件特殊规则
  {
    files: ['**/*.config.{js,ts,mjs}', 'vite.config.*', 'tsconfig.node.json'],
    rules: {
      'no-console': 'off',
      'no-debugger': 'off',
      '@typescript-eslint/no-unused-vars': 'off',
      'no-unused-vars': 'off',
    },
  },

  // 示例代码
  {
    files: ['example/**/*', 'src/**/*'],
    rules: {
      'no-console': 'off',
      'no-debugger': 'off',
      '@typescript-eslint/no-unused-vars': 'off',
      'no-unused-vars': 'off',
    },
  },
];
