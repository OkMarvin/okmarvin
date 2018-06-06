import { maxWidth, bps } from '../constants'
import { Block } from 'jsxstyle'
import React from 'react'
const Main = ({ children }) => (
  <Block
    component='main'
    width={'100%'}
    maxWidth={maxWidth}
    marginLeft='auto'
    marginRight='auto'
    paddingLeft='1em'
    paddingRight='1em'
    flex='1 0 auto'
    mediaQueries={bps}
    lgPaddingLeft={0}
    lgPaddingRight={0}
  >
    {children}
  </Block>
)
export default Main
