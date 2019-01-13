'use strict'
const async = require('neo-async')
const path = require('path')
const { performance } = require('perf_hooks')
const logger = require('@parcel/logger')

const requireResolve = require('../../helpers/requireResolve')
const { prettyTime } = require('@okmarvin/helpers')
const react = require('./ssr/react')

const md = require('@okmarvin/markdown')

module.exports = function (conn, callback) {
  const begin = performance.now()
  const {
    files,
    siteConfig,
    themeManifest,
    clientJsManifest,
    layouts,
    okmarvinConfig,
    css = {}
  } = conn
  const { theme } = siteConfig
  const { root } = conn
  const MD = md(okmarvinConfig)

  const themeRoot = path.join(requireResolve(theme, { paths: [root] }), '..')
  async.waterfall(
    [
      callback => {
        if (clientJsManifest['client.js']) {
          callback(null, `/static/js/${clientJsManifest['client.js']}`)
        } else {
          callback(null, '')
        }
      },
      (clientJS, callback) => {
        async.map(
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
            const content = file.content
              ? MD.render(file.toc ? `{:toc}\n${file.content}` : file.content)
              : undefined
            const rendered = react(Component, {
              file: {
                ...file,
                content
              },
              siteConfig
            })
            const useLayout = layouts[file.layout]
            // TODO consider moving html generating to write
            const html = useLayout(
              file,
              siteConfig,
              css[file.css] || '',
              rendered,
              clientJS
            )
            callback(null, { ...file, html, content }) // we should keep rendered content or feed will have raw markdown
          },
          callback
        )
      }
    ],
    function (err, files) {
      if (err) return callback(err)
      logger.success(
        `Rendered ${files.length} files in ${prettyTime(
          performance.now() - begin
        )}`
      )
      callback(null, {
        ...conn,
        files
      })
    }
  )
}
