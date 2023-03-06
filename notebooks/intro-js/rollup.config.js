// rollup.config.js
const vue = require('rollup-plugin-vue');
const commonjs = require('@rollup/plugin-commonjs');
const resolve = require('@rollup/plugin-node-resolve');
const babel = require('@rollup/plugin-babel');

module.exports = {
  input: 'MyComponent.vue',
  output: {
    file: 'dist/bundle.js',
    format: 'iife',
    name: 'MyComponent',
  },
  plugins: [
    vue({ css: true }),
    commonjs(),
    resolve(),
    babel({
      babelHelpers: 'bundled',
      presets: [['env', { modules: false }]],
      plugins: ['@babel/plugin-transform-runtime'],
    }),
  ],
};
