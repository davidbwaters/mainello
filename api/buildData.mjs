//
// build
//

import { writeFileSync } from 'fs'
import date from 'date-and-time'

import {
  buildPostTemplate
} from './lib/postTemplage.mjs'

import {
  buildPageTemplate
} from './lib/pageTemplage.mjs'

import {
  buildWorkTemplate
} from './lib/workTemplage.mjs'


import getData from './lib/getData.mjs'
import config from '../config.mjs'


const datePatternIn = 'YYYY-MM-DD[T]HH:mm:ss[Z]'
const datePatternOut = 'MMMM D, YYYY'
const assetPath = config.assets + '/'

async function getFile(id, collection) {

  const file = await getData(
    'items/' + collection + '_directus_files' + '/' +
    id
  )

  const fileInfo = await getData(
    'files/' + file.directus_files_id
  )

  const sort = file.sort_item

  return {
    url: assetPath + file.directus_files_id,
    title: fileInfo.title,
    sort: sort
  }

}

async function getBlock(block) {

  let item = {
    component: block.collection
  }

  item = {
    ...item,
    ...await getData(
      'items/' + block.collection + '/' +
      block.item
    )
  }

  if (block.collection === 'offset_columns') {

    for (
      const [index, i] of item.items.entries()
    ) {

      item.items[index] = await getFile(
        i, block.collection
      )

    }

  }

  if (block.collection === 'image_row') {

    for (
      const [index, i] of item.images.entries()
    ) {

      item.images[index] = await getFile(
        i, block.collection
      )

    }

  }

  if (block.collection === 'featured_video') {

    const fileInfo = await getData(
      'files/' + item.media
    )

    item.media = assetPath + item.media
    item.type = fileInfo.type

  }

  if (block.collection === 'featured_image') {

    const fileInfo = await getData(
      'files/' + item.media
    )

    item.media = assetPath + item.media
    item.title = fileInfo.title

  }

  if (block.collection === 'pattern') {

    item.image = assetPath + item.image

  }

  if (block.collection === 'image_with_text') {

    item.image = assetPath + item.image

  }

  return item

}

async function buildData() {

  const data = {}

  data.site = await getData('items/site')

  data.news = await getData('items/posts')

  data.work = await getData('items/portfolio')

  data.home = await getData('items/home')

  data.services = await getData('items/services')

  data.agency = await getData('items/agency')

  const workContent = await getData(
    'items/portfolio_content'
  )

  const agencyContent = await getData(
    'items/agency_content'
  )

  for (
    const [index, item] of data.work.entries()
  ) {

    const content = []

    for (
      const [blockIndex, block] of item.content.entries()
    ) {

      content[blockIndex] = workContent
        .filter(i => {

          return block === i.id

        })[0]

      content[blockIndex] = await getBlock(

        content[blockIndex]

      )

    }

    data.work[index].featured_image =
      assetPath + data.work[index].featured_image

    data.work[index].cover_image =
      assetPath + data.work[index].cover_image

    data.work[index].content = content

  }

  for (
    const [
      blockIndex, block
    ] of data.agency.content.entries()
  ) {

    data.agency.content[blockIndex] = agencyContent
      .filter(i => {

        return block === i.id

      })[0]

    data.agency.content[blockIndex] = await getBlock(

      data.agency.content[blockIndex]

    )

  }


  data.home.work_preview.forEach((item, index) => {

    let i = data.work.filter(j => {

      return j.id === item && j.status === 'published'

    })[0]

    i = {
      id: i.id,
      heading: i.title,
      image: i.cover_image,
      slug: i.slug,
      text: i.description_text
    }

    data.home.work_preview[index] = i

  })

  data.home.news_post_list.forEach((item, index) => {

    let i = data.news.filter(j => {

      return j.id === item && j.status === 'published'

    })[0]

    i.date = date.format(
      date.parse(
        i.date_created,
        datePatternIn
      ),
      datePatternOut
    )

    i = {
      id: i.id,
      date: i.date,
      title: i.title,
      text: i.preview_text,
      content: i.content,
      slug: i.slug
    }

    data.home.news_post_list[index] = i

  })

  data.site.logo_header = assetPath + data.site.logo_header
  data.site.logo_footer = assetPath + data.site.logo_footer

  writeFileSync(
    'data/data.json', JSON.stringify(data, null, 2)
  )

  data.news.forEach((item) => {

    const post = buildPostTemplate(item.title, item.content)

    writeFileSync(
      'src/news/' + item.slug + '.html',
      post
    )

  })

  data.work.forEach((item) => {

    const post = buildWorkTemplate(
      item.title,
      item.heading,
      item.featured_image,
      item.description_label,
      item.description_text,
      item.content
    )

    writeFileSync(
      'src/work/' + item.slug + '.html',
      post
    )

  })

}

buildData()
