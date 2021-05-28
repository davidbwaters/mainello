//
// blog
//

const fs = require('fs')
const md = require('markdown-it')()
const {
  blogPosts
} = require('../../data/data.json')


module.exports = () => {

  blogPosts.forEach(post => {

    const body = md.render(
      fs.readFileSync(
        'data/posts/' + post.slug + '.md',
        'utf8'
      )
    )

    const outpath =
      'src/posts/' +
      post.slug +
      '.ejs'

    const output =
      '<% locals.postTitle = \'' +
      post.title +
      '\' %> \n' +
      '<% locals.postDate = \'' +
      post.date +
      '\' %> \n' +
      '<%- include(\'../../templates/post-before.ejs\'); %> \n' +
      body +
      '<%- include(\'../../templates/post-after.ejs\'); %> \n'

    fs.writeFileSync(outpath, output)

  })

}

