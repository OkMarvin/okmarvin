'use strict'

const async = require('neo-async')

// const isAnyLayoutChanged = require('./isAnyLayoutChanged')
// const isClientJsChanged = require('./isClientJsChanged')
// const isOkmarvinConfigChanged = require('./isOkmarvinConfigChanged')
// const isSiteConfigChanged = require('./isSiteConfigChanged')

// const parseFiles = require('./parse/parseFiles')
const compose = require('./compose')
const validation = require('./validation')

const findPostSiblings = require('./findPostSiblings')
const collectTaxonomy = require('./collectTaxonomy')
const findRelatedPostsByTags = require('./findRelatedPostsByTags')

module.exports = (conn, callback) => {
  // console.log('dispose', conn.files)
  // const { clean } = conn
  // const tasks =
  // if (clean) {
  //   // incremental rebuild disabled
  //   tasks = [async.constant(conn), parse, compose, validation]
  // } else {
  // incremental rebuild enabled
  // tasks = [
  //   async.constant(conn),
  // (conn, callback) => {
  //   async.parallel(
  //     {
  //       layoutStatus: callback => isAnyLayoutChanged(conn, callback),
  //       clientJsStatus: callback => isClientJsChanged(conn, callback),
  //       okmarvinConfigStatus: callback =>
  //         isOkmarvinConfigChanged(conn, callback),
  //       siteConfigStatus: callback => isSiteConfigChanged(conn, callback)
  //     },
  //     (
  //       err,
  //       {
  //         layoutStatus,
  //         clientJsStatus,
  //         okmarvinConfigStatus,
  //         siteConfigStatus
  //       }
  //     ) => {
  //       if (err) return callback(err)
  //       callback(null, {
  //         ...conn,
  //         clean:
  //           layoutStatus ||
  //           clientJsStatus ||
  //           okmarvinConfigStatus ||
  //           siteConfigStatus
  //       })
  //     }
  //   )
  // },
  //   parse,
  //   compose,
  //   validation
  // ]
  // }
  async.waterfall(
    [
      async.constant(conn),
      collectTaxonomy,
      compose,
      validation,
      findPostSiblings,
      findRelatedPostsByTags
    ],
    callback
  )
}
