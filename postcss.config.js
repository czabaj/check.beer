const cssnano = require('cssnano');
const combineSelectors = require('postcss-combine-duplicated-selectors');
const postcssExtendRule = require('postcss-extend-rule');
const postcssImport = require('postcss-import');
const postcssPresetEnv = require('postcss-preset-env');

module.exports = {
  plugins: [
    postcssImport(),
    postcssExtendRule(),
    postcssPresetEnv({
      stage: 0,
      autoprefixer: false,
      features: {
        'logical-properties-and-values': false,
        'prefers-color-scheme-query': false,
        'gap-properties': false,
        'custom-properties': false,
        'place-properties': false,
        'not-pseudo-class': false,
        'focus-visible-pseudo-class': false,
        'focus-within-pseudo-class': false,
        'color-functional-notation': false,
        'custom-media-queries': { preserve: false },
      },
    }),
    combineSelectors(),
    cssnano({
      preset: 'default',
    }),
  ],
};
