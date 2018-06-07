import React from 'react'
import { bps } from '../constants'
import { Col, Block } from 'jsxstyle'
export default () => (
  <Col
    props={{
      id: 'backToTop'
    }}
    transform='translateZ(0)'
    cursor='pointer'
    position='fixed'
    zIndex={2}
    bottom='1em'
    right='1em'
    width='3.5em'
    height='3.5em'
    background='#c00'
    borderRadius='50%'
    color='#fff'
    lineHeight={1}
    display='none'
    alignItems='center'
    justifyContent='center'
    mediaQueries={bps}
    lgDisplay='none'
  >
    <Block
      width={0}
      height={0}
      borderStyle='solid'
      borderWidth='0 7.5px 10px 7.5px'
      borderColor='transparent transparent #ffffff transparent'
      marginBottom={5}
    />
    TOP
  </Col>
)
