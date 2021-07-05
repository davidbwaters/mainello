//
// build
//

import getData from './lib/getData.mjs'
import { writeFileSync } from 'fs'

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
      image: 'https://admin.mainellomontage.com/assets/' + i.featured_image
    }

    homeData.work_preview[index] = i

  })

  homeData.news_post_list.forEach((item, index) => {

    let i = newsData.filter(j => {

      return j.id === item && j.status === 'published'

    })[0]

    homeData.news_post_list[index] = i

  })

  writeFileSync(
    'data/home.json', JSON.stringify(homeData, null, 2)
  )

}

buildData()
