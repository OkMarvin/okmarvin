const generateFeed = require('@okmarvin/generate-feed')
module.exports = function (conn, callback) {
  callback(null, [{
    permalink: '/feed.xml',
    html: generateFeed(conn)
  }])
}
