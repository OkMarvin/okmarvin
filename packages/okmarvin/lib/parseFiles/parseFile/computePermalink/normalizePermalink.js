module.exports = function(url) {
  return url.endsWith('/')
    ? (url + 'index.html').replace(/index\.html$/, '')
    : (url + '/' + 'index.html').replace(/index\.html$/, '')
}
