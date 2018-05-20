module.exports = function (data) {
  const {date} = data
  return (date && new Date(date).getTime()) || new Date().getTime()
}
