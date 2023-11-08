import { defineConfig } from 'dumi';

export default defineConfig({
  mfsu: false,
  publicPath: process.env.DEPLOY_SITE === 'github' ? '/react-pnpm-monorepo/' : '/',
  base: process.env.DEPLOY_SITE === 'github' ? '/react-pnpm-monorepo' : '/',
  themeConfig: {
    name: 'example',
    lastUpdated: true,
    github: 'https://github.com/chengzao/react-pnpm-monorepo',
    footer: 'Made with<span style="color: rgb(255, 255, 255);">❤</span>by <span>chengzao | Copyright © 2023-present</span>',
    nav: [
      { title: '指南', link: '/guide/introduce' },
      { title: '组件', link: '/components/overview' },
    ],
    sidebarGroupModePath: ['/guide', '/components'],
    title: 'Welcome to use!',
    rtl: false,
    actions: [
      {
        type: 'primary',
        text: '开始使用',
        link: '/guide/introduce',
      },
      {
        text: '组件',
        link: '/components/overview',
      },
    ],
    loading: {
      skeleton: ['/guide', '/components'],
    },
    features: [
      {
        title: '样式风格统一',
        details: '基于 antd 5.0 样式加持，统一组件样式，提高开发效率。',
      },
      {
        title: '内置全文搜索',
        details: '快速查找你想要的关键字，快速定位你想要的组件。',
      },
      {
        title: 'Feature',
        details: '更多功能在骑马赶来的路上，敬请期待。',
      },
    ],
  },
});
