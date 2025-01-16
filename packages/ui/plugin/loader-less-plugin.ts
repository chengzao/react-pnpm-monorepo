// https://github.com/hexh250786313/blog/issues/30

import type { IApi } from 'father';
import { addLoader, ILoaderItem } from 'father/dist/builder/bundless/loaders';

export default async (api: IApi) => {
  const loaders: ILoaderItem[] = await api.applyPlugins({
    key: 'addPostcssLoader',
    initialValue: [
      {
        key: 'father-less-to-css-loader',
        test: /\.(le|c)ss$/,
        loader: require.resolve('./loader-less-to-css'),
      },
    ],
  });

  loaders.forEach((loader) => addLoader(loader));
};
