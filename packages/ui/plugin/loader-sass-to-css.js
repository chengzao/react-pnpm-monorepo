const postcss = require('postcss');
const syntax = require('postcss-sass');
const atImport = require('postcss-import');
const autoprefixer = require('autoprefixer');

const loader = function (content) {
  const cb = this.async();
  this.setOutputOptions({
    ext: '.css',
  });
  postcss([
    autoprefixer({
      overrideBrowserslist: ['last 10 versions'],
    }),
    atImport({
      resolve: (id) => {
        if (id.startsWith('@')) {
          console.log(this.resource);
          // todo: resolve your code
        }
        return id;
      },
    }),
  ])
    .process(content, { syntax })
    .then((result) => {
      cb(null, result.content);
    })
    .catch(cb);
};

module.exports = loader;
