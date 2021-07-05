//
// build posts
//

import { writeFileSync } from 'fs'
import date from 'date-and-time'
import md from 'markdown-it'
import { readFile } from './helpers.mjs'
import { blogPosts } from '../../data/data.json'


const datePatternIn = 'YYYY-MM-DD[T]HH:mm:ss[Z]'
const datePatternOut = 'MMMM D, YYYY'

export function buildPosts() {

  blogPosts.forEach(post => {

    const postBody = md.render(
      readFile(
        'data/posts/' + post.slug + '.md'
      )
    )

    const postDateIn = date.parse(
      post.date,
      datePatternIn
    )

    const postDate = date.format(
      postDateIn,
      datePatternOut
    )

    console.log(postDate)

    const outPath =
      'src/posts/' +
      post.slug +
      '.ejs'

    const output =
      '<% locals.postTitle = \'' +
      post.title +
      '\' %> \n' +
      '<% locals.postDate = \'' +
      postDate +
      '\' %> \n' +
      '<%- include(\'../../templates/post-before.ejs\'); %> \n' +
      postBody +
      '<%- include(\'../../templates/post-after.ejs\'); %> \n'

    writeFileSync(outPath, output)

  })

}

