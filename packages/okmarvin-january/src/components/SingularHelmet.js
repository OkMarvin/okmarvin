import React from 'react'
import {Helmet} from 'react-helmet'
import { format } from 'date-fns'
import PropTypes from 'prop-types'
import Html from './Html'
class Single extends React.Component {
  static propTypes = {
    title: PropTypes.string.isRequired,
    author: PropTypes.string.isRequired,
    description: PropTypes.string.isRequired,
    datePublished: PropTypes.number.isRequired,
    dateModified: PropTypes.number.isRequired,
    permalink: PropTypes.string.isRequired,
    content: PropTypes.string.isRequired,
    siteConfig: PropTypes.shape({
      lang: PropTypes.string.isRequired,
      url: PropTypes.string.isRequired
    })
  }
  render () {
    const {
      siteConfig,
      title,
      author,
      description,
      datePublished,
      dateModified,
      permalink
    } = this.props
    const { url } = siteConfig
    return (
      <React.Fragment>
        <Helmet>
          <meta property='og:type' content='article' />
          <script type='application/ld+json'>
            {`
              {
                "@context": "http://schema.org",
                "@type": "BlogPosting",
                "mainEntityOfPage": "${url + permalink}",
                "url": "${url + permalink}",
                "headline": "${title}",
                "description": "${description}",
                "datePublished": "${format(datePublished, 'YYYY-MM-DD')}",
                "dateModified": "${format(dateModified, 'YYYY-MM-DD')}",
                "author": {
                  "@type": "Person",
                  "name": "${author}"
                }
              }
              `}
          </script>
        </Helmet>
        {this.props.children}
      </React.Fragment>
    )
  }
}
export default props => (
  <Html {...props}>
    <Single {...props} />
  </Html>
)
