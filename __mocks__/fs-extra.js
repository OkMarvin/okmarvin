'use strict'
const fse = require('fs-extra')
let mock = false
function pathExistsSync () {
  return mock
}
function __setPathExists (v) {
  mock = v
}
fse.pathExistsSync = pathExistsSync
fse.__setPathExists = __setPathExists
module.exports = fse
