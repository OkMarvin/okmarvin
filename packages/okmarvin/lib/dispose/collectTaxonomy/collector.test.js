'use strict'

const collector = require('./collector')
const files = [
  {
    template: 'post.js',
    author: 'Sam Chen',
    title: 'hello okmarvin',
    tags: ['Hello', 'okMarvin']
  },
  {
    template: 'post.js',
    author: 'Sam Chen',
    title: 'why okmarvin'
  },
  {
    template: 'post.js',
    author: 'Sami',
    title: 'installation'
  }
]
test('collect by author', () => {
  const results = collector(files, 'author')
  expect(results).toHaveProperty('sam chen', [
    {
      title: 'hello okmarvin',
      data: {},
      date: undefined,
      datePublished: undefined,
      permalink: undefined,
      template: 'post.js'
    },
    {
      title: 'why okmarvin',
      data: {},
      date: undefined,
      datePublished: undefined,
      permalink: undefined,
      template: 'post.js'
    }
  ])
  expect(results).toHaveProperty('sami', [
    {
      title: 'installation',
      data: {},
      date: undefined,
      datePublished: undefined,
      permalink: undefined,
      template: 'post.js'
    }
  ])
})
test('collect by tags', () => {
  expect(collector(files, 'tags')).toEqual({
    hello: [
      {
        title: 'hello okmarvin',
        data: {},
        date: undefined,
        datePublished: undefined,
        permalink: undefined,
        template: 'post.js'
      }
    ],
    okmarvin: [
      {
        title: 'hello okmarvin',
        data: {},
        date: undefined,
        datePublished: undefined,
        permalink: undefined,
        template: 'post.js'
      }
    ]
  })
})
