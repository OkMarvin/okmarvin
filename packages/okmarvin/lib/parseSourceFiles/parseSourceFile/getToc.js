module.exports = function (toc, defaultToc) {
  if (typeof toc === 'undefined') {
    return defaultToc
  }
  return toc
}
