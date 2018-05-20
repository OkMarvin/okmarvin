module.exports = function (data, content) {
  const { description } = data
  if (description) return description
  // FIXME
  // this might be slow
  return content.split(/(?!$)/u).slice(0, 230).join('')
}
