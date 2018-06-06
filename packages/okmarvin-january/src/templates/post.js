import React from 'react'
import Helmet from 'react-helmet-async'
import PropTypes from 'prop-types'
import Html from '../components/Html'
import { format } from 'date-fns'
class Post extends React.Component {
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
      <React.StrictMode>
        <Helmet>
          <script type='application/ld+json'>
            {`
              {
                "@context": "http://schema.org",
                "@type": "BlogPosting",
                "mainEntityOfPage": "${url + permalink + '/'}",
                "url": "${url + permalink + '/'}",
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
