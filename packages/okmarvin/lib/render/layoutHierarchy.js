/**
 * see https://developer.wordpress.org/files/2014/10/wp-hierarchy.png
 */
module.exports = {
  'post.js': ['post.js', 'single.js', 'singular.js', 'index.js'],
  'page.js': ['page.js', 'singular.js', 'index.js'],
  'index.js': ['index.js'],
  'tag.js': ['tag.js', 'archive.js', 'index.js'],
  '404.js': ['404.js', 'index.js']
}
