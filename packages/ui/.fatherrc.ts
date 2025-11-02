import { defineConfig } from 'father';

export default defineConfig({
  esm: {},
  cjs: {},
  alias: {},
  sourcemap: false,
  extraBabelPlugins: [
    [
      './plugin/babel-less-to-css.js', // 把 js/ts 文件中的 '.less' 字符转为 '.css'
      {
        test: '\\.less',
      },
    ],
  ],
  plugins: ['./plugin/loader-less-plugin.js'],
});
