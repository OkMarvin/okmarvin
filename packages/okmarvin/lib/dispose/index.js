'use strict'

const async = require('neo-async')

// const isAnyLayoutChanged = require('./isAnyLayoutChanged')
// const isClientJsChanged = require('./isClientJsChanged')
// const isOkmarvinConfigChanged = require('./isOkmarvinConfigChanged')
// const isSiteConfigChanged = require('./isSiteConfigChanged')

const parse = require('./parse')
const compose = require('./compose')
const validation = require('./validation')

module.exports = (conn, callback) => {
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
  async.waterfall([async.constant(conn), parse, compose, validation], callback)
}
