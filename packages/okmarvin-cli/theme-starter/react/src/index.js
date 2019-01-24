/**
 * You don't need to care this boilerplate
 * Just focus on `src/templates` directory and client js index `src/client` directory
 */
import React from 'react'
import { render } from 'react-dom'
import { Router } from '@reach/router'
import conn from '../_data'
import md from '@okmarvin/markdown'
import Components from './templates/*.js'
const dispose = require('@okmarvin/okmarvin/lib/dispose')
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
const { files, siteConfig, okmarvinConfig } = dispose(conn)
const Md = md(okmarvinConfig)
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
                content={file.content ? Md.render(file.content) : ''}
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
