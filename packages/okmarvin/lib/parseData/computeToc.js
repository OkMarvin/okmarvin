module.exports = function (siteConfig, data) {
  return typeof data.toc !== 'undefined' ? data.toc : siteConfig.toc
}
