module.exports = {
  title: 'OkMarvin',
  description:
    'OkMarvin is a Static Site Generator with better theme developer experience',
  url: 'https://okmarvin.com',
  author: 'Sam Chen',
  lang: 'en',
  theme: '@okmarvin/january',
  themeColor: '',
  toc: true,
  permalink: '/:dir/:filename',
  rss: true,
  favicon: '',
  layoutHierarchy: {
    'post.js': ['post.js', 'single.js', 'singular.js', 'index.js'],
    'page.js': ['page.js', 'singular.js', 'index.js'],
    'index.js': ['index.js'],
    'tag.js': ['tag.js', 'archive.js', 'index.js'],
    '404.js': ['404.js', 'index.js']
  }
}
