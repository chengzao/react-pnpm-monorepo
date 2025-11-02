'use strict';

// CJS 版本的 father bundless loader 注册插件，兼容 ESM/CJS 的导出形态
const bundlessLoaders = require('father/dist/builder/bundless/loaders');

const addLoader =
  (bundlessLoaders && bundlessLoaders.addLoader) ||
  (bundlessLoaders && bundlessLoaders.default && bundlessLoaders.default.addLoader);

/**
 * Father v4 插件入口
 * @param {import('father').IApi} api
 */
module.exports = async function loaderLessPlugin(api) {
  // 通过插件体系获取/合并 postcss loader 列表
  const postcssLoaders =
    (await api.applyPlugins({
      key: 'addPostcssLoader',
      initialValue: [
        {
          key: 'father-less-to-css-loader',
          test: /\.(le|c)ss$/,
          loader: require.resolve('./loader-less-to-css'),
        },
      ],
    })) || [];

  // 注册到 bundless loader 管理器
  if (typeof addLoader === 'function') {
    postcssLoaders.forEach((loader) => addLoader(loader));
  }
};
