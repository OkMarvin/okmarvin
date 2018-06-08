const generateFeed = require('@okmarvin/generate-feed')
const fs = require('fs-extra')
const path = require('path')
module.exports = function (data, callback) {
  const {cwd} = data
  fs.outputFile(
    path.join(
      cwd, 'dist', 'feed.xml'
    ),
    generateFeed(data),
    callback
  )
}
