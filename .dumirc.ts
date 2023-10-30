import { defineConfig } from 'dumi';

export default defineConfig({
  outputPath: 'docs-dist',
  apiParser: {},

  themeConfig: {
    name: 'dumi-ui',
    nav: [
      {
        title: '组件',
        link: '/components/Button',
      },
      {
        title: 'hook',
        link: '/hooks/',
      },
    ],
  },
  resolve: {
    entryFile: './.dumi/resolveEntry.ts',
    atomDirs: [
      {
        type: 'component',
        dir: 'packages/ui/src',
      },
      {
        type: 'hook',
        dir: 'packages/hooks/src',
      },
    ],
  },
  alias: {
    '@bossjobmatt/ui': `${process.cwd()}/packages/ui/src`,
    '@bossjobmatt/hooks': `${process.cwd()}/packages/hooks/src`,
  },
  locales: [
    { id: 'zh-CN', name: '中文' },
    { id: 'en-US', name: 'English' },
  ],
});
