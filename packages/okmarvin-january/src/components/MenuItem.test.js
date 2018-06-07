import React from 'react'
import ReactDOM from 'react-dom'
import MenuItem from './MenuItem'
it('renders without crashing', () => {
  const div = document.createElement('div')
  ReactDOM.render(
    <MenuItem />,
    div
  )
})
