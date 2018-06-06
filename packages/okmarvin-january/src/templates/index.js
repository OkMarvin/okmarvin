import React from 'react'
import Html from '../components/Html'
class Index extends React.Component {
  render () {
    return <React.StrictMode>hello index</React.StrictMode>
  }
}
export default props => (
  <Html {...props}>
    <Index {...props} />
  </Html>
)
