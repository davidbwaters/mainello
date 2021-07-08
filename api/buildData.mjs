//
// build
//

import { writeFileSync } from 'fs'
import date from 'date-and-time'

import {
  postTemplateStart,
  postTemplateMiddle,
  postTemplateEnd
} from './lib/postTemplage.mjs'

import getData from './lib/getData.mjs'
import config from '../config.mjs'

const datePatternIn = 'YYYY-MM-DD[T]HH:mm:ss[Z]'
const datePatternOut = 'MMMM D, YYYY'
const assetPath = config.assets + '/'

async function buildData() {

  const data = {}

  data.site = await getData('items/site')

  data.news = await getData('items/posts')

  data.work = await getData('items/portfolio')

  data.home = await getData('items/home')

  data.services = await getData('items/services')

  data.home.work_preview.forEach((item, index) => {

    let i = data.work.filter(j => {

      return j.id === item && j.status === 'published'

    })[0]

    i = {
      id: i.id,
      heading: i.title,
      text: i.description_text,
      image: assetPath + i.cover_image
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

    console.log(i)
    data.home.news_post_list[index] = i

  })

  data.site.logo_header = assetPath + data.site.logo_header
  data.site.logo_footer = assetPath + data.site.logo_footer

  writeFileSync(
    'data/data.json', JSON.stringify(data, null, 2)
  )

  data.news.forEach((item) => {

    writeFileSync(
      'src/posts/' + item.slug + '.html',
      JSON.stringify(data, null, 2)
    )

  })

}

buildData()
