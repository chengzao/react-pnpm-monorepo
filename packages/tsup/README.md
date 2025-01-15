# @learnbase/stylelint

[![NPM version](https://img.shields.io/npm/v/@learnbase/stylelint.svg?style=flat)](https://npmjs.org/package/@learnbase/stylelint)
[![NPM downloads](http://img.shields.io/npm/dm/@learnbase/stylelint.svg?style=flat)](https://npmjs.org/package/@learnbase/stylelint)

## Install

- yarn

```bash
yarn add stylelint @learnbase/stylelint
```

- npm

```bash
npm install stylelint @learnbase/stylelint
```

- pnpm

```bash
pnpm add stylelint @learnbase/stylelint stylelint-config-standard-scss stylelint-config-recess-order stylelint-config-recess-order stylelint-declaration-block-no-ignored-properties
```

## Use

- Project Root dir create `stylelint.config.js` file

```js
import { defaultConfig } from '@learnbase/stylelint';

export default defaultConfig({
  ignoreFiles: ['dist/**/*', 'node_modules/**/*', '.git/**/*'],
});
```

## Options

- Generator VScode `.vscode` Config file

```bash
npx learnbase-stylelint init
```
