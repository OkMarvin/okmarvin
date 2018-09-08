const GithubSlugger = require('github-slugger')
const slugger = new GithubSlugger()
module.exports = (i) => {
  slugger.reset()
  return slugger.slug(i)
}
