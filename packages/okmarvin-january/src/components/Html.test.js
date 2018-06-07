import React from 'react'
import ReactDOM from 'react-dom'
import Html from './Html'
import { HelmetProvider } from 'react-helmet-async'
it('renders without crashing', () => {
  const div = document.createElement('div')
  const props = {
    siteConfig: {
      lang: 'zh'
    },
    title: 'okmarvin',
    description: 'static site generator with better theme support'
  }
  ReactDOM.render(
    <HelmetProvider>
      <Html {...props}>okmarvin</Html>
    </HelmetProvider>,
    div
  )
})
