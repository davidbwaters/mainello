//
// helpers
//

import { readFileSync } from 'fs'

export function stringify(data) {

  JSON.stringify(data, null, 2)

}

export function readFile(path) {

  readFileSync(path, 'utf8')

}
