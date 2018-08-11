import React from 'react'
import PropTypes from 'prop-types'
import Menu from './Menu'
import { maxWidth, bps } from '../constants'
import { Link } from '@reach/router'
import { Col, Row, Inline } from 'jsxstyle'
import Helmet from 'react-helmet-async'
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
    smBackground='#ffd54f'
  >
    <Row
      display='inline-flex'
      props={{ to: '/' }}
      component={Link}
      alignItems='center'
      color='#4a4a4a'
      fontSize='1.618em'
      lineHeight='2.625em'
      textDecoration='none'
      linkColor='#4a4a4a'
    >
      {props.logo && (
        <React.Fragment>
          <Inline
            component='img'
            maxHeight={42}
            fontSize={14}
            border='none'
            marginRight={10}
            props={{ src: props.logo, alt: props.siteTitle }}
          />
          <Helmet>
            <link rel='preload' href={props.logo} as='image' />
          </Helmet>
        </React.Fragment>
      )}
      {props.siteTitle}
    </Row>
    <Menu menu={props.menu} currentUrl={props.currentUrl} />
  </Col>
)
export default Header
Header.propTypes = {
  siteTitle: PropTypes.string.isRequired,
  logo: PropTypes.string,
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
