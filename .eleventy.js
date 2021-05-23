//
// eleventy config
//

const navigationPlugin = require('@11ty/eleventy-navigation')
const shortcodes = require('./config/shortcodes')
const CleanCSS = require('clean-css')
const esbuild = require('esbuild')
const { sassPlugin } = require('esbuild-sass-plugin')

const config = {
  dir: {
    data: 'data',
    input: 'content',
    includes: '../templates/partials',
    layouts: '../templates/layouts',
    output: 'build'
  },
  htmlTemplateEngine: 'njk',
  markdownTemplateEngine: 'njk'
}

const formats = {
  templates: [
    'html',
    'njk',
    'md'
  ],
  assets: [
    'css',
    'jpeg',
    'jpg',
    'png',
    'svg',
    'woff',
    'woff2'
  ]
}

module.exports = function(eleventyConfig) {

  eleventyConfig.setTemplateFormats([
    ...formats.templates,
    ...formats.assets
  ])

  eleventyConfig.addFilter('cssmin', function(code) {

    return new CleanCSS({}).minify(code).styles

  })

  eleventyConfig.addPairedShortcode(
    'carousel', shortcodes.carousel
  )
  eleventyConfig.addPairedShortcode(
    'fullWidthImage', shortcodes.fullWidthImage
  )
  eleventyConfig.addPairedShortcode(
    'fullWidthVideo', shortcodes.fullWidthVideo
  )
  eleventyConfig.addPairedShortcode(
    'labeledText', shortcodes.labeledText
  )
  eleventyConfig.addPairedShortcode(
    'offsetColumns', shortcodes.offsetColumns
  )
  eleventyConfig.addPairedShortcode(
    'spacedImage', shortcodes.spacedImage
  )
  eleventyConfig.addPairedShortcode(
    'spacedColumns', shortcodes.spacedColumns
  )

  eleventyConfig.addPlugin(navigationPlugin)

  eleventyConfig.on('afterBuild', () => {

    return esbuild.build({
      entryPoints: [
        'scripts/app.js'
      ],
      outdir: 'build/scripts',
      bundle: true,
      minify: process.env.ELEVENTY_ENV === 'production',
      sourcemap: process.env.ELEVENTY_ENV !== 'production',
      plugins: [sassPlugin()]
    })

  })

  eleventyConfig.on('afterBuild', () => {

    return esbuild.build({
      entryPoints: [
        'stylesheets/app.scss',
        'stylesheets/home.scss'
      ],
      outdir: 'build/stylesheets',
      minify: process.env.ELEVENTY_ENV === 'production',
      sourcemap: process.env.ELEVENTY_ENV !== 'production',
      plugins: [sassPlugin()]
    })

  })

  eleventyConfig.setUseGitIgnore(false)

  eleventyConfig.addWatchTarget('./scripts/')
  eleventyConfig.addWatchTarget('./stylesheets/')

  eleventyConfig.addPassthroughCopy(
    'scripts/vendor'
  )
  eleventyConfig.addPassthroughCopy(
    'scripts/shaders'
  )
  eleventyConfig.addPassthroughCopy({
    'assets/animations': 'animations'
  })
  eleventyConfig.addPassthroughCopy({
    'assets/fonts': 'fonts'
  })
  eleventyConfig.addPassthroughCopy({
    'assets/icons': 'icons'
  })
  eleventyConfig.addPassthroughCopy({
    'assets/images': 'images'
  })
  eleventyConfig.addPassthroughCopy({
    'assets/videos': 'videos'
  })


  return config

}
