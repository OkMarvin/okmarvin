'use strict'

module.exports = function (conn) {
  return [{
    permalink: '/404.html',
    template: '404.js',
    css: '404.css',
    title: 'Page Not Found',
    description: 'The page does not exist',
    dirty: true,
    dateModified: conn.builtAt
  }]
}
