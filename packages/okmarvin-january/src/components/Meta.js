import React, { Fragment } from 'react'
import { Row, InlineBlock, Block } from 'jsxstyle'
const Meta = props => (
  <Fragment>
    <Row
      alignItems='center'
      justifyContent='center'
      fontSize='0.79rem'
      color='#333'
    >
      Copyright © {props.author}
    </Row>
    <Block
      marginLeft='auto'
      marginRight='auto'
      fontSize='0.79rem'
      color='#333'
    >
      Made with{` `}
      <InlineBlock
        component='a'
        props={{
          href: 'https://github.com/OkMarvin/okmarvin'
        }}
      >
        okmarvin
      </InlineBlock> & {` `}
      <InlineBlock component='span'>{props.theme}</InlineBlock>
    </Block>
  </Fragment>
)
export default Meta
