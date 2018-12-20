const findRelated = require('./findRelated')
const files = [
  {
    template: 'post.js',
    tags: ['React.js'],
    title: 'hello react',
    permalink: '/hello-react',
    datePublished: 1
  },
  {
    template: 'post.js',
    tags: ['react.js', 'webpack'],
    title: 'hi react',
    permalink: '/hi-react',
    datePublished: 2
  }
]
it('should call callback', () => {
  const cb = jest.fn()
  findRelated([], cb)
  expect(cb).toBeCalled()
  expect(cb).toBeCalledWith(null, [])
})
it('should be called with data', () => {
  const cb = jest.fn()
  findRelated(files, cb)
  expect(cb).toBeCalled()
  expect(cb).toBeCalledWith(null, [
    {
      template: 'post.js',
      tags: ['React.js'],
      title: 'hello react',
      permalink: '/hello-react',
      datePublished: 1,
      related: [
        {
          template: 'post.js',
          tags: ['react.js', 'webpack'],
          title: 'hi react',
          permalink: '/hi-react',
          datePublished: 2
        }
      ]
    },
    {
      template: 'post.js',
      tags: ['react.js', 'webpack'],
      title: 'hi react',
      permalink: '/hi-react',
      datePublished: 2,
      related: [
        {
          template: 'post.js',
          tags: ['React.js'],
          title: 'hello react',
          permalink: '/hello-react',
          datePublished: 1
        }
      ]
    }
  ])
})
