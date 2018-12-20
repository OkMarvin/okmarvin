module.exports = function (date, time = new Date().getTime()) {
  return (date && new Date(date).getTime()) || time
}
