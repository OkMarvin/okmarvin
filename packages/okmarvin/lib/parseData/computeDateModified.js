module.exports = function (data) {
  const { date, dateModified } = data
  return (
    (dateModified && new Date(dateModified).getTime()) ||
    (date && new Date(date).getTime()) ||
    new Date().getTime()
  )
}
