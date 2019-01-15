'use strict'
const async = require('neo-async')
const logger = require('@parcel/logger')

const { prettyTime } = require('@okmarvin/helpers')

const md = require('@okmarvin/markdown')

module.exports = function (conn, callback) {
  const begin = Date.now()
  const { files, okmarvinConfig, ...others } = conn
  const MD = md(okmarvinConfig)

  async.map(
    files,
    function (file, callback) {
      // composed page do not have `content`
      // we need to prerender `content` as feed/sitemap need
      const content = file.content ? MD.render(file.content) : ''

      callback(null, { ...file, content }) // we should keep rendered content or feed will have raw markdown
    },
    function (err, files) {
      if (err) return callback(err)
      logger.success(
        `Rendered ${files.length} markdown files in ${prettyTime(Date.now() - begin)}`
      )
      callback(null, {
        ...others,
        okmarvinConfig,
        files
      })
    }
  )
}
