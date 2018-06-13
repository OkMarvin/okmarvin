const generateFeed = require('@okmarvin/generate-feed')
module.exports = function (data, callback) {
  callback(null, [{
    permalink: '/feed.xml',
    html: generateFeed(data)
  }])
}
