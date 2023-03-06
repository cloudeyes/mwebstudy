// build.js
const rollup = require('rollup');
const config = require('./rollup.config.js');

async function build() {
  const bundle = await rollup.rollup(config);
  await bundle.write(config.output);
}

build();
