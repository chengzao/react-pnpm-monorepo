import type { IApi } from 'father';
import { addLoader, ILoaderItem } from 'father/dist/builder/bundless/loaders';

export default async (api: IApi) => {
  const loaders: ILoaderItem[] = await api.applyPlugins({
    key: 'addPostcssLoader',
    initialValue: [
      {
        key: 'father-postcss-loader',
        test: /\.(le|c)ss$/,
        loader: require.resolve('./loader'),
      },
    ],
  });

  loaders.forEach((loader) => addLoader(loader));
};
