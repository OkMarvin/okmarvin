const collectTags = require('./collectTags')
const files = [
  {
    template: 'post.js',
    tags: ['React.js'],
    title: 'hello react'
  },
  {
    template: 'post.js',
    tags: ['react.js', 'webpack'],
    title: 'hi react'
  }
]
it('should call the callback', () => {
  const cb = jest.fn()
  collectTags({ files: [] }, cb)
  expect(cb).toBeCalled()
  expect(cb).toBeCalledWith(null, { files: [], tags: {} })
})
it('should be called with data', () => {
  const cb = jest.fn()
  collectTags({ files }, cb)
  expect(cb).toBeCalledWith(null, { files,
    tags: {
      'react.js': files,
      'webpack': [
        {
          template: 'post.js',
          tags: ['react.js', 'webpack'],
          title: 'hi react'
        }
      ]
    } })
})
