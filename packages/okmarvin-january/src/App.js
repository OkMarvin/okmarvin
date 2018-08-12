import React from 'react'
import { Router } from '@reach/router'
import REACT_DATA from '../_data.json'
const Components = {}
function importAll (r) {
  r.keys().forEach(key => (Components[key] = r(key)))
}
importAll(require.context('./templates', true, /\.js$/))
class App extends React.Component {
  render () {
    const { files, siteConfig } = REACT_DATA
    const NotFound = Components['./404.js'].default
    return (
      <Router id='___OkMarvin___'>
        {files.map(file => {
          const Component = Components['./' + file.template].default
          return (
            <Component
              key={file.permalink}
              path={file.permalink}
              {...file}
              siteConfig={siteConfig}
            />
          )
        })}
        {
          NotFound && <NotFound siteConfig={siteConfig} default />
        }
      </Router>
    )
  }
}
export default App
