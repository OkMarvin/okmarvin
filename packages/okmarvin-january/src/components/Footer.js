import React from 'react'
import PropTypes from 'prop-types'
import Meta from './Meta'
import { bps, maxWidth } from '../constants'
import BackToTop from './BackToTop'
import { Block, Row, Inline } from 'jsxstyle'
const Link = ({ children, ...rest }) => (
  <Inline
    component='a'
    marginRight={10}
    color='rgb(0, 51, 204)'
    props={{ ...rest }}
  >
    {children}
  </Inline>
)
const Footer = ({ feed, url, author, github, twitter, rss, theme }) => (
  <Block
    component='footer'
    color='#444'
    width={846}
    maxWidth={maxWidth}
    marginLeft='auto'
    marginRight='auto'
    padding='1em 0'
    marginTop='4.11em'
    borderBottom='1em solid #ffd54f'
    mediaQueries={bps}
    smBorderBottom='none'
  >
    <Row
      alignItems='center'
      marginBottom='1em'
      fontSize='0.889em'
    >
      {github ? (
        <Link href={`https://github.com/${github}`}>Github</Link>
      ) : null}
      {twitter ? (
        <Link href={`https://twitter.com/${twitter}`}>Twitter</Link>
      ) : null}
      {rss && <Link href={url + '/feed.xml'}>RSS</Link>}
    </Row>
    <Meta author={author} theme={theme} />
    <BackToTop />
  </Block>
)
Footer.propTypes = {
  author: PropTypes.string.isRequired,
  github: PropTypes.string,
  twitter: PropTypes.string,
  rss: PropTypes.bool,
  theme: PropTypes.string.isRequired
}
Footer.defaultProps = {
  author: '',
  github: '',
  twitter: ''
}
export default Footer
