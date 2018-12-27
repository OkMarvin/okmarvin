const isPost = require('../parse/isPost')
const chunk = require('lodash/chunk')
const shrink = require('../helpers/shrink')
module.exports = function (conn, callback) {
  const {
    siteConfig: { title, description, author, paginate },
    files,
    builtAt
  } = conn
  const fields = {
    title: title,
    description: description,
    author: author,
    template: 'index.js',
    css: 'index.css',
    datePublished: builtAt,
    dateModified: builtAt,
    permalink: '/'
  }
  const permalinkFormat = '/page:num/'
  const list = files
    .filter(isPost)
    .map(shrink)
    .sort((a, b) => b.datePublished - a.datePublished)
  if (!paginate || (paginate && list.length < paginate + 1)) {
    return callback(null, [
      {
        ...fields,
        list
      }
    ])
  }
  const arr = chunk(list, paginate)
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
        list: arr[i],
        paginator
      })
    } else {
      result = result.concat({
        ...fields,
        title: `${fields.title} - Page ${i + 1}`,
        list: arr[i],
        paginator,
        permalink: permalinkFormat.replace(/:num/, i + 1)
      })
    }
  }
  callback(null, result)
}
