import React from 'react'
import { mobileScale, lineHeight, scale, bps } from '../constants'
import { Block } from 'jsxstyle'
const ArticleHeading = ({ children }) => (
  <Block
    component='h1'
    fontSize={`${Math.pow(mobileScale, 2)}em`}
    lineHeight={lineHeight / scale}
    marginBottom={`${lineHeight / 2}rem`}
    marginTop={`${lineHeight * 1}rem`}
    mediaQueries={bps}
    smMarginTop={`${lineHeight * 2}rem`}
    smFontSize={`${Math.pow(scale, 3)}em`}
  >
    {children}
  </Block>
)
export default ArticleHeading
