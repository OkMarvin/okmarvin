import React from 'react'
import Helmet from 'react-helmet-async'
import PropTypes from 'prop-types'
export default class Post extends React.Component {
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
        <Helmet htmlAttributes={{
          lang: this.props.siteConfig.lang
        }}>
          <meta charSet='utf-8' />
          <title>{this.props.title}</title>
        </Helmet>
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
