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
        title: 'vitePack',
        link: '/vite-packs/Button',
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
        type: 'vite-pack',
        dir: 'packages/vitePack/src',
      },
      {
        type: 'hook',
        dir: 'packages/hooks/src',
      },
    ],
  },
  alias: {
    '@learnbase/ui': `${process.cwd()}/packages/ui/src`,
    '@learnbase/vite-pack': `${process.cwd()}/packages/vitePack/src`,
    '@learnbase/hooks': `${process.cwd()}/packages/hooks/src`,
  },
  // locales: [
  //   { id: 'zh-CN', name: '中文' },
  //   { id: 'en-US', name: 'English' },
  // ],
});
