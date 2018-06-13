module.exports = function (permalink, month) {
  return permalink.replace(
    /:month/g,
    month
  )
}
