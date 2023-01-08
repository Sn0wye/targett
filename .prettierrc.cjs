/** @type {import("prettier").Config} */
module.exports = {
  arrowParens: 'avoid',
  printWidth: 80,
  singleQuote: true,
  jsxSingleQuote: true,
  semi: true,
  trailingComma: 'none',
  tabWidth: 2,
  plugins: [require.resolve('prettier-plugin-tailwindcss')],
  tailwindConfig: './tailwind.config.js',
};
