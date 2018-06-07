import React from 'react'
import ReactDOM from 'react-dom'
import BackToTop from './BackToTop'
it('renders without crashing', () => {
  const div = document.createElement('div')
  ReactDOM.render(<BackToTop />, div)
})
