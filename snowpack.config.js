const data = require('./data/data.json')

module.exports = {
  mount: {
    static: { url: '/', static: true },
    src: { url: '/' }
  },
  plugins: [
    '@snowpack/plugin-sass',
    ['snowpack-plugin-ejs', {
      renderData: data
    }]
  ],
  optimize: {
    bundle: true,
    minify: true,
    target: 'es2018',
    splitting: true,
    treeshake: true
  },
  devOptions: {
    open: 'false'
  },
  buildOptions: {
    out: 'dist',
    clean: true
  }
}
