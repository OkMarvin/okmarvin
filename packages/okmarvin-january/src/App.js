import React from 'react'
import { Router } from '@reach/router'
import data from '../_data.json'
import { hot } from 'react-hot-loader'
class App extends React.Component {
  render () {
    const { files, siteConfig } = data
    return (
      <Router id='___OkMarvin___'>
        {/* FIXME Router renders a div https://github.com/reach/router/issues/63 */}
        {files.map(file => {
          const Component = require(`./templates/${file.template}`).default
          return (
            <Component
              key={file.permalink}
              path={file.permalink}
              {...file}
              siteConfig={siteConfig}
            />
          )
        })}
      </Router>
    )
  }
}
export default hot(module)(App)
