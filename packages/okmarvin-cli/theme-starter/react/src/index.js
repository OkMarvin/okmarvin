import React from 'react'
import { render } from 'react-dom'
import { Router } from '@reach/router'
import data from '../_data'
import md from '@okmarvin/markdown'
import Components from './templates/*.js'
const { files, siteConfig, okmarvinConfig } = data
const Md = md(okmarvinConfig)
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
          file = Object.assign({}, file, {
            content: file.content ? Md.render(file.content) : ''
          })
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
