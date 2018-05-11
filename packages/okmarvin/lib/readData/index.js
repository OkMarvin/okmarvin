const path = require('path')
const glob = require('glob')
const logger = require('@okmarvin/logger')
const assert = require('assert')
const fs = require('fs-extra')
const async = require('neo-async')

const loadSiteConfig = require('./loadSiteConfig')
/**
 * Collect all markdown files under `post` & `page`
 * @param {String} cwd current working directory
 * @param {Function} callback
 */
module.exports = function (cwd, callback) {
  logger.profile('Collect markdown files')
  const content = path.join(cwd, 'content')
  assert.ok(fs.pathExistsSync(content), `${content} folder doesn't exist`)
  const searchPattern = '{post,page}/**/*.md'
  async.waterfall(
    [
      callback => loadSiteConfig(cwd, callback),
      (siteConfig, callback) => {
        glob(searchPattern, {cwd: content}, callback)
      }
    ],
    callback
  )
}
