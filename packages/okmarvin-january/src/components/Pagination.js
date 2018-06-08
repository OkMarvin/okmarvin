import React from 'react'
import PropTypes from 'prop-types'
import { Block, InlineBlock } from 'jsxstyle'
import { Link } from '@reach/router'
const styles = {
  marginLeft: 5,
  marginRight: 5,
  padding: 3,
  fontSize: '1rem',
  lineHeight: 1.2
}
export default class Pagination extends React.Component {
  static propTypes = {
    current: PropTypes.number.isRequired,
    total: PropTypes.number.isRequired,
    urlFormat: PropTypes.string.isRequired
  }
  render () {
    const { current, total, urlFormat } = this.props
    return (
      <Block marginTop={'3rem'}>
        {[...Array(total).keys()].map(idx => {
          if (idx + 1 === current) {
            // current has no link
            return <InlineBlock {...styles} fontWeight='bold'>{current}</InlineBlock>
          }
          if (idx === 0) {
            // first page has special url
            return (
              <InlineBlock
                {...styles}
                component={Link}
                props={{ to: urlFormat.replace('page:num', '') }}
              >
                1
              </InlineBlock>
            )
          } else {
            return (
              <InlineBlock
                {...styles}
                component={Link}
                props={{ to: urlFormat.replace(':num', idx + 1) }}
              >
                {idx + 1}
              </InlineBlock>
            )
          }
        })}
      </Block>
    )
  }
}
