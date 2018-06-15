import React from 'react'
import { Router } from '@reach/router'
import REACT_DATA from '../_data.json'
class App extends React.Component {
  render () {
    const { files, siteConfig } = REACT_DATA
    return (
      <Router id='___OkMarvin___'>
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
export default App
