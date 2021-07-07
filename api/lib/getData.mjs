//
// get data
//

import fetch from 'node-fetch'
import config from '../../config.mjs'

export default async function getData(
  endpoint, remote = config.remote
) {

  let obj

  const url = remote + '/' + endpoint

  await fetch(url)
    .then(res => res.json())
    .then(json => {

      obj = json

    })

  return obj.data

}
