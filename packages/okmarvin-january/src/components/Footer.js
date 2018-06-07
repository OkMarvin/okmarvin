import React, { Fragment } from 'react'
import PropTypes from 'prop-types'
import Meta from './Meta'
import { bps } from '../constants'
import BackToTop from './BackToTop'
import { Block, Row, Inline } from 'jsxstyle'
const Link = ({ children, ...rest }) => (
  <Inline
    component='a'
    margin='0 5px'
    color='rgb(0, 51, 204)'
    props={{ ...rest }}
  >
    {children}
  </Inline>
)
const Seperator = ({ children }) => (
  <Inline component='span' color='#c03'>
    {children}
  </Inline>
)
const Footer = ({ feed, url, author, github, twitter }) => (
  <Block
    component='footer'
    textAlign='center'
    color='#444'
    fontSize='0.889em'
    padding='1em 0'
    marginTop='4.11em'
    borderBottom='1em solid #00cc99'
    mediaQueries={bps}
    smBorderBottom='none'
  >
    <Row alignItems='center' justifyContent='center' marginBottom='1em'>
      {github ? (
        <Fragment>
          <Link href={`https://github.com/${github}`}>Github</Link>
          <Seperator>·</Seperator>
        </Fragment>
      ) : null}
      {twitter ? (
        <Fragment>
          <Link href={`https://twitter.com/${twitter}`}>Twitter</Link>
          <Seperator>·</Seperator>
        </Fragment>
      ) : null}
      <Link href={feed || url + '/feed.xml'}>RSS</Link>
    </Row>
    <Meta author={author} />
    {/* show BackToTop according to the page height */}
    <BackToTop />
  </Block>
)
Footer.propTypes = {
  author: PropTypes.string.isRequired,
  github: PropTypes.string,
  twitter: PropTypes.string
}
Footer.defaultProps = {
  author: '',
  github: '',
  twitter: ''
}
export default Footer
