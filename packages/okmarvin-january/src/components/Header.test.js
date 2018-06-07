import React from 'react'
import Header from './Header'
import renderer from 'react-test-renderer'
it('renders correctly', () => {
  const tree = renderer.create(<Header siteTitle={'okmarvin'} />).toJSON()
  expect(tree).toMatchSnapshot()
})
