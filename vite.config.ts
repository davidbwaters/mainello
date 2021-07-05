//
// vite config
//

import { resolve } from 'path'
import { defineConfig } from 'vite'
import handlebars from 'vite-plugin-handlebars'
import { readFileSync } from 'fs'

const data = JSON.parse(
  readFileSync('data/home.json', 'utf8')
)

data.scrolling_tag_row_1 = JSON.stringify(
  data.scrolling_tag_row_1
)

data.scrolling_tag_row_2 = JSON.stringify(
  data.scrolling_tag_row_2
)

data.work_preview = JSON.stringify(
  data.work_preview
)

export default defineConfig({
  root: 'src',
  plugins: [
    handlebars({
      context: data,
      partialDirectory: resolve(__dirname, 'src/templates/partials')
    })
  ],
  publicDir: '../public',
  build: {
    outDir: '../dist'
  }
})
