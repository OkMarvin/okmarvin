const path = require('path')
const read = require('./index')
test('returns data', done => {
  const callback = (err, data) => {
    expect(err).toBeNull()
    expect(data).toHaveProperty('okmarvinConfig')
    expect(data).toHaveProperty('site')
    expect(data).toHaveProperty('files')
    expect(data).toHaveProperty('fileAssets')
    expect(data.files).toHaveLength(3)
    expect(data.fileAssets).toHaveLength(3)
    expect(data).toHaveProperty('dest', 'dist')
    expect(data).toHaveProperty('clientJsManifest', {
      'client.js': 'client.abc.js'
    })
    expect(data).toHaveProperty('themeManifest', {
      'index.js': 'index.js',
      'post.js': 'post.js',
      'page.js': 'page.js'
    })
    const { root, files, ...others } = data
    expect(others).toMatchSnapshot()
    done()
  }
  read(
    {
      root: path.join(__dirname, 'fixtures'),
      dest: 'dist',
      builtAt: new Date('2018-10-10').getTime()
    },
    callback
  )
})
