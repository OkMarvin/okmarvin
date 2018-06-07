import React from 'react'
import PropTypes from 'prop-types'
import Menu from './Menu'
import { maxWidth, bps } from '../constants'
import { Link } from '@reach/router'
import { Col, Inline } from 'jsxstyle'
const Header = props => (
  <Col
    flexShrink={0}
    alignItems='center'
    justifyContent='center'
    background='#fafafa'
    mediaQueries={bps}
    smFlexDirection='row'
    smBoxShadow='0 1px 0 0 #e8e8e8'
    smJustifyContent='space-between'
    smPaddingLeft={`calc((100% - ${maxWidth}) / 2)`}
    smPaddingRight={`calc((100% - ${maxWidth}) / 2)`}
  >
    <Inline
      props={{ to: '/' }}
      component={Link}
      color='#4a4a4a'
      fontSize='1.618em'
      lineHeight='2.625em'
      textDecoration='none'
      linkColor='#4a4a4a'
    >
      {props.siteTitle}
    </Inline>
    <Menu menu={props.menu} currentUrl={props.currentUrl} />
  </Col>
)
export default Header
Header.propTypes = {
  siteTitle: PropTypes.string.isRequired,
  menu: PropTypes.arrayOf(
    PropTypes.shape({
      text: PropTypes.string.isRequired,
      permalink: PropTypes.string.isRequired
    })
  ),
  currentUrl: PropTypes.string.isRequired
}
Header.defaultProps = {
  menu: [],
  currentUrl: ''
}
