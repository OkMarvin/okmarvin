module.exports = function(url) {
  url = url.replace(/\/\//g, '/')
  return url.endsWith('/')
    ? (url + 'index.html').replace(/index\.html$/, '')
    : (url + '/' + 'index.html').replace(/index\.html$/, '')
}
