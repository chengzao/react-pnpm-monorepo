// fork from : https://github.com/willson-wang/react-components-style.git
const resolve = require('@rollup/plugin-node-resolve');
const json = require('@rollup/plugin-json');
const commonjs = require('@rollup/plugin-commonjs');
const typescript = require('@rollup/plugin-typescript');
const babel = require('@rollup/plugin-babel');
const copy = require('rollup-plugin-copy');
const postcss = require('rollup-plugin-postcss');
const path = require('path');
const glob = require('glob');

const { ROLLUP_WATCH } = process.env;

function createCssAndIndexFile({ dest, format, file, files, isStyleIndex }) {
  return {
    name: 'createCssAndIndexFile',
    generateBundle(options, bundle) {
      console.log('dest', dest);

      const cssSource = "import '../../style/index.css';\nimport './index.css';";
      const jsSource = "import '../../style/index.less';\nimport './index.less';";

      if (!isStyleIndex) {
        this.emitFile({
          name: 'css.js',
          fileName: `${dest}/css.js`,
          type: 'asset',
          source: cssSource,
        });

        this.emitFile({
          name: 'index.js',
          fileName: `${dest}/index.js`,
          type: 'asset',
          source: jsSource,
        });
      }

      // 生成 components.less , 在umd中less使用
      if (isStyleIndex && format === 'esm') {
        const code = files
          .filter((item) => item !== file)
          .map((item) => {
            return `@import "${item.replace('components', '..')}"`;
          })
          .join(',')
          .replace(',', ';\n');

        this.emitFile({
          name: 'components.less',
          fileName: `${dest}/components.less`,
          type: 'asset',
          source: `${code};`,
        });
      }

      delete bundle['index.js'];
      delete bundle['index.js.map'];
    },
  };
}

function createComponentsLessFile() {
  return {
    name: 'createComponentsLessFile',
    generateBundle(options, bundle) {
      Object.keys(bundle).forEach((filename) => {
        if (!filename.includes('antd')) {
          delete bundle[filename];
        }
      });
      this.emitFile({
        name: 'antd.less',
        fileName: 'antd.less',
        type: 'asset',
        source: `
@import "../es/style/index.less";
@import "../es/style/components.less";
        `,
      });
    },
  };
}

const dirMap = {
  esm: 'es',
  cjs: 'lib',
  umd: 'dist',
};

const _createStyleConfig = (file, format, files) => {
  const dir = dirMap[format];
  const styleDir = path.dirname(file);
  const isStyleIndex = file.includes('components/style/index.less');
  return {
    input: file,
    output: {
      format,
      entryFileNames: '[name].js',
      exports: 'named',
      preserveModules: false,
      sourcemap: true,
      dir,
    },
    plugins: [
      copy({
        // 将源目录下的less文件，原样copy一份到lib、es目录下
        copyOnce: true,
        targets: isStyleIndex
          ? [
              { src: file, dest: styleDir.replace('components', dir) },
              { src: 'components/style/themes/*.less', dest: `${styleDir.replace('components', dir)}/themes` },
              { src: 'components/style/mixins/*.less', dest: `${styleDir.replace('components', dir)}/mixins` },
              { src: 'components/style/core/*.less', dest: `${styleDir.replace('components', dir)}/core` },
            ]
          : [{ src: file, dest: styleDir.replace('components', dir) }],
      }),
      postcss({
        // 将源目录下的.less文件转化成.css文件输出
        extensions: ['.less', '.css', '.sss', '.pcss'],
        extract: path.resolve(`${styleDir}/index.css`.replace('components', dir)),
      }),
      createCssAndIndexFile({
        // 创建css.js、index.js、components.less文件
        dest: styleDir.replace('components/', ''),
        format,
        file,
        files,
        isStyleIndex,
      }),
    ],
  };
};

// 找到所有需要处理的入口less文件，其实就是每个组件下的less文件及公共style下的入口less文件
const files = glob.sync('components/**/*.less', {
  ignore: ['**/style/themes/*.less', '**/style/mixins/*.less', '**/style/core/*.less'],
});

// 创建es、lib目录下的所有style下的.less、.css、.js文件
const createStyleConfig = () => {
  console.log('files', files);

  return files.reduce((prev, file) => {
    const result = (ROLLUP_WATCH ? ['esm'] : ['esm', 'cjs']).map((format) => {
      return _createStyleConfig(file, format, files);
    });
    return [...prev, ...result];
  }, []);
};

// 负责创建es、lib下的所有js文件及创建dist下的antd.js文件
function createJsConfig() {
  return (ROLLUP_WATCH ? ['esm'] : ['esm', 'cjs', 'umd']).map((format) => {
    return {
      input: ['components/index.ts'],
      treeshake: false,
      output:
        format === 'umd'
          ? {
              format,
              entryFileNames: '[name].umd.js',
              preserveModules: false,
              sourcemap: true,
              file: 'dist/antd.js',
              name: 'antd',
              globals: {
                react: 'react',
                reactDom: 'react-dom',
              },
            }
          : {
              format,
              entryFileNames: '[name].js',
              exports: 'named',
              preserveModules: true,
              sourcemap: true,
              dir: dirMap[format],
            },
      plugins: [
        resolve({
          browser: true,
        }),
        json({}),
        commonjs({
          transformMixedEsModules: true,
        }),
        typescript({
          declaration: format !== 'umd',
          declarationDir: format !== 'umd' ? dirMap[format] : null,
          noEmitOnError: false,
        }),
        babel({
          babelHelpers: 'runtime',
          exclude: [/node_modules/],
          extensions: ['.ts', '.tsx', '.js', '.jsx', '.es6', '.es', '.mjs'],
        }),
      ],
      external: ['react', 'react-dom'],
    };
  });
}

const styleConfigs = createStyleConfig();
const jsConfigs = createJsConfig();

// 创建dist/antd.css及dist/antd.less
const umdCss = {
  input: files,
  output: {
    format: 'esm',
    entryFileNames: '[name].js',
    exports: 'named',
    dir: 'dist',
  },
  plugins: [
    postcss({
      extensions: ['.less', '.css', '.sss', '.pcss'],
      extract: 'antd.css',
    }),
    createComponentsLessFile(),
  ],
};

module.exports = [...jsConfigs, ...styleConfigs, ROLLUP_WATCH ? null : umdCss].filter((item) => item);
