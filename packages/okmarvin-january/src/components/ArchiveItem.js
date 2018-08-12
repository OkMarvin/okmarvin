import React from 'react'
import PropTypes from 'prop-types'
import { Link } from '@reach/router'
import { bps } from '../constants'
import { Col, Inline } from 'jsxstyle'
const ArchiveItem = ({ title, datePublished, permalink }) => (
  <Col
    marginBottom='0.5rem'
    mediaQueries={bps}
    smFlexDirection='row'
    smAlignItems='flex-end'
  >
    <Inline
      props={{
        to: permalink
      }}
      component={Link}
      textDecoration='none'
      fontSize='1rem'
      color='#333'
      linkColor='#333'
      borderBottom='1px solid #ddd'
      hoverTextDecoration='none'
      hoverColor='#af0000'
    >
      {title}
    </Inline>
  </Col>
)
ArchiveItem.propTypes = {
  title: PropTypes.string.isRequired,
  datePublished: PropTypes.number.isRequired,
  permalink: PropTypes.string.isRequired
}
export default ArchiveItem
