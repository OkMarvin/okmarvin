module.exports = function (data, callback) {
  const { siteConfig } = data
  const { themeManifest } = siteConfig
  if (!themeManifest['404.js']) return callback(null, [])
  callback(null, [{
    permalink: '/404.html',
    template: '404.js',
    css: '404.css',
    title: 'Page Not Found'
  }])
}
