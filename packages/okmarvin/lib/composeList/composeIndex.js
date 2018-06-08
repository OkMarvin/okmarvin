const computeTemplate = require('../parseData/computeTemplate')
const computeCss = require('../parseData/computeCss')
module.exports = function (data, callback) {
  const { siteConfig, files } = data
  const { paginate } = siteConfig
  const list = files
    .filter(file => file.template === 'post.js')
    .sort((a, b) => b.datePublished - a.datePublished)
  const base = {
    title: siteConfig.title,
    description: siteConfig.description,
    author: siteConfig.author,
    template: computeTemplate(siteConfig.themeManifest, 'index'),
    css: computeCss(siteConfig.themeManifest, 'index'),
    permalink: ''
  }
  // which data an index page would need?
  if (!paginate) {
    callback(null, [{
      ...base,
      list
    }])
  } else {
    let num = Math.ceil(list.length / paginate)
    if (num === 1) {
      return callback(null, [{...base, list}])
    }
    let results = []
    for (let i = 0; i < num; i++) {
      if (i === 0) {
        results = results.concat({
          ...base,
          list: list.slice(i * paginate, i * paginate + paginate),
          paginator: {
            current: i + 1,
            total: num,
            urlFormat: '/page:num'
          }
        })
      } else {
        results = results.concat({
          ...base,
          title: base.title + ' - Page ' + (i + 1),
          list: list.slice(i * paginate, i * paginate + paginate),
          paginator: {
            current: i + 1,
            total: num,
            urlFormat: '/page:num'
          },
          permalink: `/page${i + 1}`
        })
      }
    }
    callback(null, results)
  }
}
