module.exports = function (url) {
  if (url.endsWith('/')) {
    return url
  } else {
    return url + '/'
  }
}
