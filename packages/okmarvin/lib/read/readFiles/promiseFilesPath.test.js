const path = require('path')
const promiseFilesPath = require('./promiseFilesPath')
const root = path.join(__dirname, '..', 'fixtures')
test('returns all markdown files', () => {
  return promiseFilesPath(root, '{_posts,_pages}/**/*.{md,markdown}').then(
    data => {
      expect(data).toEqual([
        '_pages/about-okmarvin.md',
        '_posts/hello-okmarvin.md',
        '_posts/why-okmarvin/index.md'
      ])
    }
  )
})
test('returns all files', () => {
  return promiseFilesPath(root, '{_posts,_pages}/**/*').then(
    data => {
      expect(data).toEqual([
        '_pages/about-okmarvin.md',
        '_posts/hello-okmarvin.md',
        '_posts/why-okmarvin/a.txt',
        '_posts/why-okmarvin/dir/b.txt',
        '_posts/why-okmarvin/dir/c/e.txt',
        '_posts/why-okmarvin/index.md'
      ])
    }
  )
})
