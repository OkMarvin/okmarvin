import React from 'react'
import { mobileScale, lineHeight, scale, bps } from '../constants'
import { Block } from 'jsxstyle'
const ArticleHeading = ({ children }) => (
  <Block
    component='h1'
    fontSize={`${Math.pow(mobileScale, 4)}em`}
    lineHeight={lineHeight / scale}
    marginBottom={`${lineHeight / 2}rem`}
    marginTop={`${lineHeight * 2}rem`}
    mediaQueries={bps}
    smFontSize={`${Math.pow(scale, 3)}em`}
  >
    {children}
  </Block>
)
export default ArticleHeading
