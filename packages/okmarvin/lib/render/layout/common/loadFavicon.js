module.exports = function (icon) {
  if (icon.endsWith('.ico')) {
    return `<link rel="shortcut icon" href="${icon}" />`
  }
  if (icon.endsWith('.gif')) {
    return `<link rel="icon" type="image/gif" href="${icon} />`
  }
  if (icon.endsWith('.png')) {
    return `<link rel="icon" type="image/png" href="${icon} />`
  }
}
