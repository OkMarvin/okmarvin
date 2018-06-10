const path = require('path')
const glob = require('glob')
const assert = require('assert')
const fs = require('fs-extra')
const async = require('neo-async')
const readUserSiteConfig = require('./readUserSiteConfig')
const computeSiteConfig = require('./computeSiteConfig')
const readMarkdown = require('./readMarkdown')
const readThemeManifest = require('./readThemeManifest')
/**
 * Collect all markdown files under `post` & `page`
 * @param {String} cwd current working directory
 * @param {Function} callback
 */
module.exports = function (cwd, source, destination, callback) {
  const content = path.join(cwd, source)
  assert.ok(fs.pathExistsSync(content), `${content} folder doesn't exist`)
  const searchPattern = '{post,page}/**/*.md'
  async.parallel(
    {
      siteConfig: callback =>
        async.waterfall(
          [
            callback =>
              readUserSiteConfig(path.join(cwd, '_config.yml'), callback),
            computeSiteConfig,
            readThemeManifest
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
    function (err, results) {
      if (err) return callback(err)
      return callback(null, {
        ...results,
        cwd,
        source,
        destination
      })
    }
  )
}
