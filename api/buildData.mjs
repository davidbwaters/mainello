//
// build
//

import { writeFileSync } from 'fs'
import date from 'date-and-time'
import getData from './lib/getData.mjs'
import config from '../config.mjs'

const datePatternIn = 'YYYY-MM-DD[T]HH:mm:ss[Z]'
const datePatternOut = 'MMMM D, YYYY'

async function buildData() {

  let homeData = Object.assign(
    await getData('items/home'),
    await getData('items/site')
  )

  let workData = await getData('items/portfolio')
  let newsData = await getData('items/posts')

  homeData.work_preview.forEach((item, index) => {

    let i = workData.filter(j => {

      return j.id === item && j.status === 'published'

    })[0]

    i = {
      id: i.id,
      heading: i.title,
      text: i.description_text,
      image: config.assets + '/' + i.cover_image
    }

    homeData.work_preview[index] = i

  })

  homeData.news_post_list.forEach((item, index) => {

    let i = newsData.filter(j => {

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
    homeData.news_post_list[index] = i

  })

  homeData.logo_header = config.assets + '/' + homeData.logo_header
  homeData.logo_footer = config.assets + '/' + homeData.logo_footer

  writeFileSync(
    'data/home.json', JSON.stringify(homeData, null, 2)
  )

}

buildData()
