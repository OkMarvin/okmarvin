import React from 'react'
import { render } from 'react-dom'
import { Router } from '@reach/router'
import { files, siteConfig } from '../_data.json'
import Components from './templates/*.js'
const root = document.getElementById('app')

class ErrorBoundary extends React.Component {
  constructor (props) {
    super(props)
    this.state = { hasError: false }
  }
  componentDidCatch (error, info) {
    if (error) console.error(error)
    this.setState({ hasError: true })
  }

  render () {
    if (this.state.hasError) {
      return <h1>Something went wrong. Please refresh the page.</h1>
    }
    return this.props.children
  }
}

render(
  <ErrorBoundary>
    <Router id='___OkMarvin___'>
      {files
        .filter(file => file.template) // exclude xml files
        .map(file => {
          try {
            const Component =
              Components[file.template.replace('.js', '')].default
            return (
              <Component
                key={file.permalink}
                path={file.permalink}
                {...file}
                siteConfig={siteConfig}
                default={file.template === '404.js'}
              />
            )
          } catch (err) {
            return undefined
          }
        })}
    </Router>
  </ErrorBoundary>,
  root
)
