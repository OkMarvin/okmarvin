import React from 'react'
import ReactDOM from 'react-dom'
import ArchiveItem from './ArchiveItem'
it('renders without crashing', () => {
  const div = document.createElement('div')
  const props = {
    title: 'ok marvin',
    datePublished: 1536537600000,
    permalink: '/ok-marvin'
  }
  ReactDOM.render(
    <ArchiveItem {...props} />,
    div
  )
})
