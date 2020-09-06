var typescript = require('rollup-plugin-typescript2');
var commonjs = require('rollup-plugin-commonjs');
var external = require('rollup-plugin-peer-deps-external');
var resolve = require('rollup-plugin-node-resolve');

var pkg = require('./package.json');

module.exports = {
  input: 'src/index.ts',
  output: [
    {
      file: pkg.main,
      format: 'cjs',
      exports: 'named',
      sourcemap: true
    },
    {
      file: pkg.module,
      format: 'es',
      exports: 'named',
      sourcemap: true
    }
  ],
  external: [ 'rxjs', 'rxjs/webSocket', 'rxjs/internal/Subscription' , 'q'],
  plugins: [
    external(),
    resolve(),
    typescript({
      rollupCommonJSResolveHack: true,
      exclude: '**/__tests__/**',
      clean: true
    }),
    commonjs({
      include: ['node_modules/**']
    })
  ]
}