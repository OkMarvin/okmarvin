module.exports = function (permalink, data) {
  return permalink.replace(
    /:category/g,
    (data.categories || []).map(c => encodeURIComponent(c)).join('/')
  )
}
