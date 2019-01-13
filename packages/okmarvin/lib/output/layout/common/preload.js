module.exports = function (type, href) {
  return `<link rel="preload" href="${href}" as="${type}" />`
}
