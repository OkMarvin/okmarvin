const path = require('path')
const glob = require('glob')
const logger = require('@okmarvin/logger')
const assert = require('assert')
const fs = require('fs-extra')
const async = require('neo-async')
const readUserSiteConfig = require('./readUserSiteConfig')
const computeSiteConfig = require('./computeSiteConfig')
const readMarkdown = require('./readMarkdown')
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
  async.parallel(
    {
      siteConfig: callback =>
        async.waterfall(
          [
            callback =>
              readUserSiteConfig(path.join(cwd, 'siteConfig.yml'), callback),
            computeSiteConfig
          ],
          callback
        ),
      files: callback =>
        async.waterfall(
          [
            callback => glob(searchPattern, { cwd: content, absolute: true }, callback),
            (files, callback) =>
              async.map(
                files,
                readMarkdown,
                callback
              )
          ],
          callback
        )
    },
    callback
  )
}
