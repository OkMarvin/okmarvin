const groupBy = require('lodash/groupby')
const async = require('async')
const ensureMiniTemplates = require('./ensureMiniTemplates')
function print (arr) {
  return arr.map(i => `\n` + i.filePath || i.title)
}
module.exports = function (data, callback) {
  const { files, siteConfig } = data
  const { themeManifest } = siteConfig
  const groupsByPermalink = groupBy(files, file => file.permalink)
  async.parallel(
    [
      callback => {
        async.each(
          Object.keys(groupsByPermalink),
          (key, callback) => {
            if (groupsByPermalink[key].length > 1) {
              return callback(
                new Error(
                  `Permalink duplicated: ${print(groupsByPermalink[key])}`
                )
              )
            }
            if (key.startsWith('/static')) {
              return callback(
                new Error(
                  `Preserved permalink: ${print(groupsByPermalink[key])}}`
                )
              )
            }
            return callback()
          },
          callback
        )
      },
      callback => callback(null, ensureMiniTemplates(themeManifest))
    ],
    err => {
      if (err) return callback(err)
      callback(null, data)
    }
  )
}
