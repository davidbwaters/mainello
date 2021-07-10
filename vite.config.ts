//
// vite config
//

import { resolve } from 'path'
import { defineConfig } from 'vite'
import handlebars from 'vite-plugin-handlebars'

import {
  readFileSync
} from 'fs'

import * as fg from 'fast-glob'


const entriesList = fg.sync('src/**/*.html')

const entries = {}

entriesList.forEach((i, index) => {

  entries[index.toString()] = resolve(
    __dirname, i
  )

})

console.log(entries)

const data = JSON.parse(
  readFileSync('data/data.json', 'utf8')
)

data.home.scrolling_tag_row_1 = JSON.stringify(
  data.home.scrolling_tag_row_1
)

data.home.scrolling_tag_row_2 = JSON.stringify(
  data.home.scrolling_tag_row_2
)

data.home.work_preview = JSON.stringify(
  data.home.work_preview
)

data.site.social_links = JSON.stringify(
  data.site.social_links
)

data.site.menu_items = JSON.stringify(
  data.site.menu_items
)

export default defineConfig({
  root: 'src',
  plugins: [
    handlebars({
      context: data,
      partialDirectory: resolve(
        __dirname, 'src/templates/partials'
      )
    })
  ],
  publicDir: '../public',
  build: {
    outDir: '../dist',
    rollupOptions: {
      input: entries
    }
  }
})
