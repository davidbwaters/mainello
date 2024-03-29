//
// build
//
import { writeFileSync } from 'fs'
import date from 'date-and-time'

import escapeQuotes from 'escape-quotes'

import {
  buildPostTemplate
} from './lib/postTemplage.mjs'
import {
  buildPageTemplate
} from './lib/pageTemplage.mjs'
import {
  buildWorkTemplate
} from './lib/workTemplage.mjs'

import {
  buildNewsTemplate
} from './lib/newsTemplage.mjs'

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

  if (block.collection === 'labeled_image') {

    item.image = assetPath + item.image

  }


  if (block.collection === 'labeled_text') {

    item.background_image =
      assetPath + item.background_image

  }

  if (block.collection === 'image_with_text') {

    item.image = assetPath + item.image

  }

  if (block.collection === 'article') {

    item.background_image =
      assetPath + item.background_image

  }

  return item

}

async function buildData() {

  let data = {}
  data.site = await getData('items/site')
  data.news = await getData('items/posts')
  data.work = await getData('items/portfolio')
  data.home = await getData('items/home')
  data.services = await getData('items/services')
  data.agency = await getData('items/agency')

  //console.log(data)

  //console.log(data.news)

  data.work = data.work.filter(item => {

    return item.status === 'published'

  })

  const workContent = await getData(
    'items/portfolio_content'
  )

  const agencyContent = await getData(
    'items/agency_content'
  )

  const servicesContent = await getData(
    'items/services_content'
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

    data.work[index].next = JSON.stringify(data.work
      .filter(i => {

        return data.work[index]
          .next === i.id

      })[0]
    )

  }

  data.agency.featured_image =
    assetPath + data.agency.featured_image

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


  for (
    const [
      blockIndex, block
    ] of data.services.content.entries()
  ) {

    data.services.content[blockIndex] = servicesContent
      .filter(i => {

        return block === i.id

      })[0]


    data.services.content[blockIndex] = await getBlock(
      data.services.content[blockIndex]
    )

  }

  await Promise.all(

    data.home.work_preview.map(async(item, index) => {

      let workPreviewData = await getData(
        'items/home_portfolio_1'
      )

      let j = workPreviewData.filter(k => {

        return k.id === item

      })[0]

      let i = data.work.filter(h => {

        return j.portfolio_id === h.id

      })[0]

      if (i) {

        i = {
          id: i.id,
          heading: i.title,
          image: i.cover_image,
          slug: i.slug,
          text: JSON.stringify(i.description_text)
        }
        data.home.work_preview[index] = i

      }

    })

  )

  data.news.forEach((item, index) => {

    let i = data.news.filter(j => {

      return j.status === 'published' && j.id === item.id

    })[0]

    i.date = date.format(
      date.parse(
        i.date_created,
        datePatternIn
      ),
      datePatternOut
    )

    i.featured_image = i.featured_image !== null
      ? assetPath + i.featured_image
      : ''

    i = {
      id: i.id,
      date: i.date,
      title: i.title,
      text: i.preview_text,
      content: i.content,
      slug: i.slug,
      status: i.status,
      featured_image: i.featured_image
    }


    data.news[index] = i

  })

  data.home.news_post_list.forEach((item, index) => {

    let i = data.news.filter(j => {

      return j.id === item && j.status === 'published'

    })[0]

    i = {
      id: i.id,
      date: i.date,
      title: i.title,
      text: i.preview_text,
      content: i.content,
      slug: i.slug,
      featured_image: i.featured_image
    }

    // console.log(i)
    data.home.news_post_list[index] = i

  })

  data.site.logo_header = assetPath + data.site.logo_header
  data.site.logo_footer = assetPath + data.site.logo_footer


  data = JSON.stringify(data).replace(/'/g, '&#39;')


  writeFileSync(
    'data/data.json', data
  )


  data = JSON.parse(data)

  const newsTemplate = buildNewsTemplate(
    data.news
  )

  writeFileSync(
    'src/news.html',
    newsTemplate
  )

  data.news.forEach((item) => {

    const post = buildPostTemplate(
      item.title,
      item.content,
      item.date,
      item.featured_image
    )
    writeFileSync(
      'src/news/' + item.slug + '.html',
      post
    )

  })

  data.work.forEach((item) => {

    //console.log(item.content)

    const work = buildWorkTemplate(
      item.title,
      item.heading,
      item.featured_image,
      item.description_label,
      item.description_text,
      JSON.stringify(item.content),
      item.next
    )

    //console.log(item.content)
    writeFileSync(
      'src/work/' + item.slug + '.html',
      work
    )

  })

}

buildData()
