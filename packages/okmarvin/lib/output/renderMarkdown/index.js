'use strict'

const logger = require('@parcel/logger')

const { prettyTime } = require('@okmarvin/helpers')

const md = require('@okmarvin/markdown')

module.exports = function(conn) {
  const begin = Date.now()
  const { files, okmarvinConfig, ...others } = conn
  const MD = md(okmarvinConfig)
  const newFiles = files.reduce((acc, file) => {
    const { content = '', ...others } = file
    return [...acc, { ...others, content: content ? MD.render(content) : '' }]
  }, [])
  logger.success(
    `Parsed ${files.length} markdown contents in ${prettyTime(
      Date.now() - begin
    )}`
  )
  return {
    ...others,
    okmarvinConfig,
    files: newFiles
  }
}
