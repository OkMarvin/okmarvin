'use strict'
const chunk = require('lodash/fp/chunk')
module.exports = function (data, paginate, fields, permalinkFormat) {
  if (!paginate || (paginate && data.length < paginate + 1)) {
    return [{
      ...fields,
      posts: data
    }]
  }
  const arr = chunk(paginate, data)
  let result = []
  for (let i = 0; i < arr.length; i++) {
    let paginator = {
      current: i + 1,
      total: arr.length,
      permalinkFormat
    }
    if (i === 0) {
      result = result.concat({
        ...fields,
        posts: arr[i],
        paginator
      })
    } else {
      result = result.concat({
        ...fields,
        title: `${fields.title} - Page ${i + 1}`,
        posts: arr[i],
        paginator,
        permalink: permalinkFormat.replace(/:num/, i + 1)
      })
    }
  }
  return result
}
