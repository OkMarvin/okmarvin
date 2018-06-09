import React from 'react'
import { render } from 'react-dom'
import App from './App'
import { HelmetProvider } from 'react-helmet-async'

const root = document.getElementById('___OkMarvin___')

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
      return <h1>Something went wrong.</h1>
    }
    return this.props.children
  }
}

render(
  <ErrorBoundary>
    <HelmetProvider>
      <App />
    </HelmetProvider>
  </ErrorBoundary>,
  root
)
