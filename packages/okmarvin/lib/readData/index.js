const path = require('path')
const glob = require('glob')
const fse = require('fs-extra')
const async = require('neo-async')
const invariant = require('invariant')
const readUserSiteConfig = require('./readUserSiteConfig')
const computeSiteConfig = require('./computeSiteConfig')
const readMarkdown = require('./readMarkdown')
const readThemeManifest = require('./readThemeManifest')
const chalk = require('chalk')
/**
 * Collect all markdown files under `post` & `page`
 * @param {String} cwd current working directory
 * @param {Function} callback
 */
module.exports = function (
  cwd,
  source = 'content',
  destination = 'dist',
  callback = function () {}
) {
  const content = path.join(cwd, source)
  invariant(fse.pathExistsSync(content), chalk.red(`${content} doesn't exist`))
  const searchPattern = '{post,page}/**/*.md'
  async.parallel(
    {
      config: callback => {
        // read custom config from .okmarvin/config.js
        try {
          const config = require(path.join(cwd, '.okmarvin', 'config.js'))
          callback(null, config)
        } catch (e) {
          callback(null, {})
        }
      },
      siteConfig: callback =>
        async.waterfall(
          [
            callback =>
              readUserSiteConfig(path.join(cwd, '_config.toml'), callback),
            computeSiteConfig,
            readThemeManifest
          ],
          callback
        ),
      files: callback =>
        async.waterfall(
          [
            callback =>
              glob(searchPattern, { cwd: content, absolute: true }, callback),
            (files, callback) => async.map(files, readMarkdown, callback)
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
        destination,
        now: new Date().getTime()
      })
    }
  )
}
