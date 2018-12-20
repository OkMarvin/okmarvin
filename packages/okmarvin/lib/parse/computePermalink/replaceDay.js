module.exports = function (permalink, day) {
  return permalink.replace(
    /:day/g,
    day
  )
}
