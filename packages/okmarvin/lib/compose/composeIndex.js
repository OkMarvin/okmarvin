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
  let result = []
  const list = files
    .filter(isPost)
    .map(shrink)
    .sort((a, b) => b.datePublished - a.datePublished)
  const indexArray = chunk(list, paginate)
  const permalinkFormat = '/page:num/'
  for (let i = 0; i < indexArray.length; i++) {
    let paginator = {
      current: i + 1,
      total: indexArray.length,
      permalinkFormat
    }
    if (i === 0) {
      result = result.concat({
        ...fields,
        list: indexArray[i],
        paginator
      })
    } else {
      result = result.concat({
        ...fields,
        title: `${fields.title} - Page ${i + 1}`,
        list: indexArray[i],
        paginator,
        permalink: permalinkFormat.replace(/:num/, i + 1)
      })
    }
  }
  callback(null, result)
}
