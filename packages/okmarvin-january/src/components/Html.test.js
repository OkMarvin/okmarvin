import React from 'react'
import ReactDOM from 'react-dom'
import Html from './Html'
it('renders without crashing', () => {
  const div = document.createElement('div')
  const props = {
    siteConfig: {
      lang: 'zh',
      title: 'okmarvin',
      theme: '@okmarvin/january'
    },
    title: 'okmarvin',
    description: 'static site generator with better theme developer experience'
  }
  ReactDOM.render(<Html {...props}>okmarvin</Html>, div)
})
