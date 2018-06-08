import React from 'react'
import ReactDOM from 'react-dom'
import RelatedPost from './RelatedPost'
it('renders without crashing', () => {
  const div = document.createElement('div')
  ReactDOM.render(
    <RelatedPost />,
    div
  )
})
