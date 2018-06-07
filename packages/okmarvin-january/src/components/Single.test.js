import React from 'react'
import ReactDOM from 'react-dom'
import Single from './Single'
it('renders without crashing', () => {
  const div = document.createElement('div')
  const props = {
    siteConfig: {
      lang: 'zh',
      url: 'https://okmarvin.com'
    },
    title: 'okmarvin',
    description: 'static site generator with better theme support',
    author: 'Sam Chen',
    datePublished: new Date().getTime(),
    dateModified: new Date().getTime(),
    permalink: '/hello-okmarvin',
    content: 'well'
  }
  ReactDOM.render(<Single {...props}>okmarvin</Single>, div)
})
