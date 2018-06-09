import React from 'react'
import { Router } from '@reach/router'
import data from '../_data.json'
import { hot } from 'react-hot-loader'
import { HelmetProvider } from 'react-helmet-async'
class App extends React.Component {
  render () {
    const { files, siteConfig } = data
    return (
      <HelmetProvider>
        <Router>
          {files.map(file => {
            const Component = require(`./templates/${file.template}`).default
            return (
              <Component
                key={file.permalink}
                path={file.permalink + '/'}
                {...file}
                siteConfig={siteConfig}
              />
            )
          })}
        </Router>
      </HelmetProvider>
    )
  }
}
export default hot(module)(App)
