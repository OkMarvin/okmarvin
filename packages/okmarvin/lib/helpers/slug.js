const GithubSlugger = require('github-slugger')
const slugger = new GithubSlugger()
module.exports = (value) => {
  slugger.reset()
  return slugger.slug(value)
}
