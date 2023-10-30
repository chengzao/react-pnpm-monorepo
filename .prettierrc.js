module.exports = {
  semi: true,
  singleQuote: true,
  jsxSingleQuote: false,
  useTabs: false,
  tabWidth: 2,
  printWidth: 140,
  proseWrap: 'never',
  trailingComma: 'all',
  overrides: [
    {
      files: '*.md',
      options: {
        proseWrap: 'preserve',
      },
    },
  ],
};
