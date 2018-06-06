import React from 'react'
import Helmet from 'react-helmet-async'
import PropTypes from 'prop-types'
export default class Html extends React.Component {
  static propTypes = {
    children: PropTypes.node,
    title: PropTypes.string.isRequired,
    description: PropTypes.string.isRequired
  }
  render () {
    const { siteConfig, title, description, permalink } = this.props
    const { lang, url } = siteConfig
    return (
      <React.StrictMode>
        <Helmet
          htmlAttributes={{
            lang: lang
          }}
        >
          <title>{title}</title>
          <meta charSet='utf-8' />
          <meta httpEquiv='x-ua-compatible' content='ie=edge' />
          <meta name='viewport' content='width=device-width, initial-scale=1' />
          <meta name='description' content={description} />
          <link rel='canonical' href={url + permalink + '/'} />

          <meta name='twitter:card' content='summary' />
          <meta property='og:title' content={title} />
          <meta property='og:description' content={description} />
          <meta property='og:type' content='article' />
          <meta property='og:url' content={url + permalink + '/'} />
        </Helmet>
        {this.props.children}
      </React.StrictMode>
    )
  }
}
