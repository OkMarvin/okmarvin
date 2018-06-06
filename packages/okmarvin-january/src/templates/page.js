import React from 'react'
import Html from '../components/Html'
class Page extends React.Component {
  render () {
    return (
      <React.StrictMode>
        hello page
      </React.StrictMode>
    )
  }
}
export default props => (
  <Html {...props}>
    <Page {...props} />
  </Html>
)
