module.exports = function (conn, callback) {
  callback(null, {
    permalink: '/404.html',
    template: '404.js',
    css: '404.css',
    title: 'Page Not Found',
    description: 'The page does not exist',
    dirty: true
  })
}
