/**
 * You don't need to care this boilerplate
 * Just focus on `src/templates` directory and client js index `src/client` directory
 */
import React from 'react'
import ReactDOM from 'react-dom'
import { Router } from '@reach/router'
import { files, siteConfig } from '../_data.json'
import Components from './templates/*.js'
ReactDOM.render(
  <Router id='___OkMarvin___'>
    {files
      .filter(file => file.template) // exclude xml files
      .map(file => {
        try {
          const Component = Components[file.template.replace('.js', '')].default
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
  </Router>,
  document.getElementById('app')
)
