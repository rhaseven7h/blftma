/** @type {import('prettier').Config} */
const config = {
  arrowParens: 'always',
  bracketSameLine: true,
  bracketSpacing: true,
  htmlWhitespaceSensitivity: 'css',
  jsxSingleQuote: true,
  printWidth: 120,
  proseWrap: 'preserve',
  quoteProps: 'consistent',
  semi: true,
  singleAttributePerLine: true,
  singleQuote: true,
  tabWidth: 2,
  trailingComma: 'none',
  useTabs: false,
  tailwindFunctions: ['clsx', 'tw'],
  plugins: ['prettier-plugin-organize-imports', 'prettier-plugin-tailwindcss']
};

export default config;
