import React, { Fragment } from 'react'
import { Row, Inline } from 'jsxstyle'
const Meta = props => (
  <Fragment>
    <Row
      alignItems='center'
      justifyContent='center'
      fontSize='0.79rem'
      color='#777'
    >
      Copyright © {props.author}
    </Row>
    <Row
      alignItems='center'
      justifyContent='center'
      fontSize='0.79rem'
      color='#777'
    >
      Made with OkMarvin &{' '}
      <Inline
        textDecoration='none'
        marginLeft={3}
        props={{
          href: 'https://github.com/OkMarvin/january'
        }}
      >
        January
      </Inline>
    </Row>
  </Fragment>
)
export default Meta
