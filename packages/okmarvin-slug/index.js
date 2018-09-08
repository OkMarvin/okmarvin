const GithubSlugger = require('github-slugger')
const slugger = new GithubSlugger()
module.exports = (v) => {
  slugger.reset()
  return slugger.slug(v)
}
