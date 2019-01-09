module.exports = function (permalink, year) {
  return permalink.replace(
    /:year/g,
    year
  )
}
