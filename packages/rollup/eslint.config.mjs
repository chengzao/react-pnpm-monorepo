// 构建工具包 ESLint 配置 - 适用于 rollup
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
    files: ['**/*.config.{js,ts,mjs}', 'babel.config.js', 'rollup.config.js'],
    rules: {
      'no-console': 'off',
      'no-debugger': 'off',
      'no-unused-vars': 'off',
    },
  },

  // 示例代码
  {
    files: ['example/**/*', 'components/**/*.tsx'],
    rules: {
      'no-console': 'off',
      'no-debugger': 'off',
      'no-unused-vars': 'off',
    },
  },
];
