module.exports = function (manifest) {
  // theme should at least has three templates
  ['index.js', 'post.js', 'page.js'].forEach(t => {
    if (!manifest[t]) throw new Error(`template ${t} is missing`)
  })
}
