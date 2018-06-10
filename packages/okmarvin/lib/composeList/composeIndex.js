const computeTemplate = require('../parseData/computeTemplate')
const computeCss = require('../parseData/computeCss')
const isPost = require('../parseData/isPost')
module.exports = function (data, callback) {
  const { siteConfig, files } = data
  const { paginate } = siteConfig
  const list = files
    .filter(isPost)
    .sort((a, b) => b.datePublished - a.datePublished)
  const date = new Date().getTime()
  const base = {
    title: siteConfig.title,
    description: siteConfig.description,
    author: siteConfig.author,
    template: computeTemplate(siteConfig.themeManifest, 'index'),
    css: computeCss(siteConfig.themeManifest, 'index'),
    datePublished: date,
    dateModified: date,
    permalink: '/'
  }
  // which data an index page would need?
  if (!paginate) {
    callback(null, [
      {
        ...base,
        list
      }
    ])
  } else {
    if (list.length < paginate + 1) {
      return callback(null, [{ ...base, list }])
    }
    let num = Math.ceil(list.length / paginate)
    let results = []
    for (let i = 0; i < num; i++) {
      let paginator = {
        current: i + 1,
        total: num,
        urlFormat: '/page:num'
      }
      if (i === 0) {
        results = results.concat({
          ...base,
          list: list.slice(i * paginate, i * paginate + paginate),
          paginator
        })
      } else {
        results = results.concat({
          ...base,
          title: base.title + ' - Page ' + (i + 1),
          list: list.slice(i * paginate, i * paginate + paginate),
          paginator,
          permalink: `/page${i + 1}`
        })
      }
    }
    callback(null, results)
  }
}
