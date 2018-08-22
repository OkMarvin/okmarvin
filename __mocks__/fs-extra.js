'use strict'
const fse = jest.genMockFromModule('fs-extra')
let mock = false
function pathExistsSync () {
  return mock
}
function __setPathExists (v) {
  mock = v
}
fse.pathExistsSync = pathExistsSync
fse.__setPathExists = __setPathExists
fse.outputFile = function (filePath, data, callback) {}

let readFileErr = null
let readFileContent = ''
function __setReadFileErr (err) {
  readFileErr = err
}
function __setReadFileContent (str) {
  readFileContent = str
}
fse.readFile = function (filePath, options, callback) {
  callback(readFileErr, readFileContent)
}
fse.__setReadFileErr = __setReadFileErr
fse.__setReadFileContent = __setReadFileContent
module.exports = fse
