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
    paddingTop='3rem'
    paddingBottom='3rem'
    paddingLeft='1em'
    paddingRight='1em'
    background='#fafafa'
    color='#444'
    marginTop='4.11em'
    borderTop='1px solid #f0f0f0'
    borderBottom='1em solid #ffd54f'
    smBorderBottom='0.5em solid #ffd54f'
    mediaQueries={bps}
    lgPaddingLeft={0}
    lgPaddingRight={0}
  >
    <Block
      maxWidth={maxWidth}
      marginLeft='auto'
      marginRight='auto'
      padding='1em 0'
    >
      <Row alignItems='center' marginBottom='1em' fontSize='0.889em'>
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
