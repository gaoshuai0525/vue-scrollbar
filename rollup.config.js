const vue = require('rollup-plugin-vue')
const buble = require('rollup-plugin-buble')
const cleanup = require('rollup-plugin-cleanup')
const uglify = require('rollup-plugin-uglify')
const resolve = require('rollup-plugin-node-resolve')
const commonjs = require('rollup-plugin-commonjs')
const scss = require('rollup-plugin-scss')
const alias = require('rollup-plugin-alias')
const rootImport = require('rollup-plugin-root-import')
export default {
  input: 'src/index.js',
  output:{
      file:'dist/vue-scrollbar.min.js',
      format:'cjs',
      sourcemap:true
  },
  name: 'Vue-Scrollbar',
  sourceMap: false,
  plugins: [
      rootImport({
          // Will first look in `client/src/*` and then `common/src/*`.
          root: `${__dirname}/index`,
          useEntry: 'prepend',

          // If we don't find the file verbatim, try adding these extensions
          extensions: ['.js', '.vue', '.css']
      }),
      // scss({ output: 'dist/vue-select.min.css' }),
      alias({
          vue$: 'vue/dist/vue.js',
          resolve: ['.js', '.vue']
      }),
    resolve(),
    commonjs(),
    vue({
      compileTemplate: false,
      css: true,
      autoStyles: false,
      styleToImports: false,
    }),
    buble({
        exclude: 'node_modules/**'
    }),
    // cleanup({
    //       extensions: ['.js', '.css']
    //   }),
    uglify({
      compress: {
        global_defs: {
          __DEV__: process.env.NODE_ENV !== 'production'
        }
      }
    })
  ]
}
