module.exports = function (conn, callback) {
  const { siteConfig } = conn
  const { themeManifest } = siteConfig
  // if there's no 404.js template, then don't render one
  if (!themeManifest['404.js']) return callback(null, [])
  callback(null, [
    {
      permalink: '/404.html',
      template: '404.js',
      css: '404.css',
      title: 'Page Not Found',
      description: 'The page does not exist'
    }
  ])
}
