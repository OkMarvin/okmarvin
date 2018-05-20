module.exports = function (permalink, data) {
  return permalink.replace(
    /:category/g,
    (data.categories || []).join('/')
  )
}
