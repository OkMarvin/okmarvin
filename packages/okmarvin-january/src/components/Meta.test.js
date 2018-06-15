import React from 'react'
import ReactDOM from 'react-dom'
import Meta from './Meta'
it('renders without crashing', () => {
  const div = document.createElement('div')
  ReactDOM.render(<Meta author='sam chen' theme='@okmarvin/january' />, div)
})
