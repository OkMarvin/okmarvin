const GithubSlugger = require('github-slugger')
const slugger = new GithubSlugger()
module.exports = function(v) {
  slugger.reset()
  return slugger.slug(v)
}
