import React from 'react'
import ReactDOM from 'react-dom'
import { HelmetProvider } from 'react-helmet-async'
import SingularHelmet from './SingularHelmet'
it('renders without crashing', () => {
  const div = document.createElement('div')
  const props = {
    siteConfig: {
      lang: 'zh',
      url: 'https://okmarvin.com',
      title: 'okmarvin',
      theme: '@okmarvin/january'
    },
    title: 'okmarvin',
    description: 'static site generator with better theme developer experience',
    author: 'Sam Chen',
    datePublished: new Date().getTime(),
    dateModified: new Date().getTime(),
    permalink: '/hello-okmarvin',
    content: 'well'
  }
  ReactDOM.render(
    <HelmetProvider>
      <SingularHelmet {...props}>okmarvin</SingularHelmet>
    </HelmetProvider>,
    div
  )
})
