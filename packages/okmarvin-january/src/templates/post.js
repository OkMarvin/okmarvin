import React from 'react'
import Helmet from 'react-helmet-async'
import PropTypes from 'prop-types'
import Html from '../components/Html'
class Post extends React.Component {
  static propTypes = {
    title: PropTypes.string.isRequired,
    content: PropTypes.string.isRequired,
    siteConfig: PropTypes.shape({
      lang: PropTypes.string.isRequired
    })
  }
  render () {
    return (
      <React.StrictMode>
        <section
          dangerouslySetInnerHTML={{
            __html: this.props.content
          }}
          className='markdown'
        />
      </React.StrictMode>
    )
  }
}
export default props => (
  <Html {...props}>
    <Post {...props} />
  </Html>
)
