import React from 'react'
import Helmet from 'react-helmet-async'
import PropTypes from 'prop-types'
import Header from './Header'
import Footer from './Footer'
import '../../node_modules/sanitize.css'
import '../../node_modules/prismjs/themes/prism-tomorrow.css'
import '../common.css'
export default class Html extends React.Component {
  static propTypes = {
    children: PropTypes.node,
    title: PropTypes.string.isRequired,
    description: PropTypes.string,
    permalink: PropTypes.string,
    siteConfig: PropTypes.shape({
      lang: PropTypes.string.isRequired,
      url: PropTypes.string,
      title: PropTypes.string.isRequired
    })
  }
  static defaultProps = {
    description: ''
  }
  render () {
    const { siteConfig, title, description, permalink } = this.props
    const {
      lang,
      url,
      title: siteTitle,
      menu,
      google_analytics: googleAnalytics
    } = siteConfig
    return (
      <React.Fragment>
        <Helmet
          htmlAttributes={{
            lang: lang
          }}
        >
          <title>{title}</title>
          <meta charSet='utf-8' />
          <meta httpEquiv='x-ua-compatible' content='ie=edge' />
          <meta name='viewport' content='width=device-width, initial-scale=1' />
          {description && <meta name='description' content={description} />}
          <link rel='canonical' href={url + permalink} />

          <meta name='twitter:card' content='summary' />
          <meta property='og:title' content={title} />
          {description && (
            <meta property='og:description' content={description} />
          )}
          <meta property='og:url' content={url + permalink} />
          {googleAnalytics ? (
            <script
              async
              src={`https://www.googletagmanager.com/gtag/js?id=${googleAnalytics}`}
            />
          ) : null}
          {googleAnalytics ? (
            <script>
              {`window.dataLayer = window.dataLayer || [];
                function gtag(){dataLayer.push(arguments);}
                gtag('js', new Date());
              
                gtag('config', '${googleAnalytics}');
              `}
            </script>
          ) : null}
        </Helmet>
        <Header siteTitle={siteTitle} menu={menu} currentUrl={permalink} />
        {this.props.children}
        <Footer {...siteConfig} />
      </React.Fragment>
    )
  }
}
