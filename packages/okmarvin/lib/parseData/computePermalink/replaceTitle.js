module.exports = function (permalink, data) {
  return permalink.replace(/:title/g, data.title)
}
