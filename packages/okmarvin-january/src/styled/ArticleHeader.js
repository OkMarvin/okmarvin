import { bps } from '../constants'
import { Block } from 'jsxstyle'
import React from 'react'
import PropTypes from 'prop-types'
const ArticleHeader = ({ children }) => (
  <Block
    marginBottom='1em'
    component='header'
    mediaQueries={bps}
    smMarginBottom='3em'
  >
    {children}
  </Block>
)
export default ArticleHeader
ArticleHeader.propTypes = {
  children: PropTypes.node.isRequired
}
