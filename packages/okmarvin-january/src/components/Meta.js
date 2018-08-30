import React, { Fragment } from 'react'
import { Row, InlineBlock, Block } from 'jsxstyle'
import PropTypes from 'prop-types'
const Meta = ({ author, theme }) => (
  <Fragment>
    <Row alignItems='center' fontSize='0.79rem' color='#333'>
      Copyright © {author}
    </Row>
    <Block marginLeft='auto' marginRight='auto' fontSize='0.79rem' color='#333'>
      Made with
      {` `}
      <InlineBlock
        component='a'
        props={{
          href: 'https://github.com/OkMarvin/okmarvin'
        }}
      >
        okmarvin
      </InlineBlock>{' '}
      & {` `}
      <InlineBlock component='span'>{theme}</InlineBlock>
    </Block>
  </Fragment>
)
export default Meta
Meta.propTypes = {
  author: PropTypes.string.isRequired,
  theme: PropTypes.string.isRequired
}
