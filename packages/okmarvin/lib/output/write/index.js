'use strict'

const async = require('neo-async')
const fs = require('fs-extra')
const path = require('path')
const logger = require('@parcel/logger')
const generateFeed = require('@okmarvin/generate-feed')
const generateSitemap = require('@okmarvin/generate-sitemap')

const { prettyTime } = require('@okmarvin/helpers')

const requireResolve = require('../../helpers/requireResolve')
const react = require('./ssr/react')

module.exports = function (conn, callback) {
  const begin = Date.now()
  const { files, okmarvinConfig } = conn
  const {
    root,
    dest,
    builtAt,
    siteConfig,
    themeManifest,
    layoutHash,
    clientJsManifest,
    clientJsPath,
    layouts,
    css = {}
  } = conn
  const { theme } = siteConfig
  const themeRoot = path.join(requireResolve(theme, { paths: [root] }), '..')
  async.parallel(
    [
      callback => {
        fs.outputJson(
          path.join(root, '_cache.json'),
          {
            builtAt,
            themeManifest,
            clientJsManifest,
            files: files.map(file => file.permalink),
            layoutHash,
            okmarvinConfig,
            siteConfig
          },
          err => {
            if (err) return callback(err)
            callback(null)
          }
        )
      },
      callback =>
        async.each(
          files,
          function (file, callback) {
            const Component = require(path.join(
              themeRoot,
              themeManifest[file.template]
            )).default
            /**
             * right now we only support React ssr
             * but vue, preact, etc. can be supported too
             */
            const rendered = react(Component, {
              file,
              siteConfig
            })
            const useLayout = layouts[file.layout]
            // TODO consider moving html generating to write
            const html = useLayout(
              file,
              siteConfig,
              css[file.template.replace(/\.js$/, '.css')] || '',
              rendered,
              clientJsPath
            )
            const target =
              path.extname(file.permalink) !== ''
                ? file.permalink
                : path.join(file.permalink, 'index.html')
            const filePath = path.join(root, dest, decodeURIComponent(target))
            fs.outputFile(filePath, html, callback)
          },
          callback
        ),
      callback => {
        fs.outputFile(
          path.join(root, dest, 'feed.xml'),
          generateFeed(conn),
          callback
        )
      },
      callback => {
        fs.outputFile(
          path.join(root, dest, 'sitemap.xml'),
          generateSitemap(conn),
          callback
        )
      }
    ],
    err => {
      if (err) return callback(err)
      logger.success(
        `Wrote ${files.length} files in ${prettyTime(Date.now() - begin)}.`
      )
      return callback(null, conn)
    }
  )
}
