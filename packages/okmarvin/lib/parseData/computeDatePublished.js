module.exports = function (date, now = new Date().getTime()) {
  return (date && new Date(date).getTime()) || now
}
