import React from 'react'
import PropTypes from 'prop-types'
import { Block, InlineBlock } from 'jsxstyle'
import { Link } from '@reach/router'
import findBegin from './findBegin'
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
    // show 10 items at most
    const max = 10
    const begin = findBegin(total, current, max)

    return (
      <Block marginTop={'3rem'}>
        {[...Array(total).keys()].slice(begin, begin + max).map(idx => {
          if (idx === current) {
            // current has no link
            return <InlineBlock key={idx} {...styles} fontWeight='bold'>{current}</InlineBlock>
          }
          if (idx === 1) {
            // first page has special url
            return (
              <InlineBlock
                key={idx}
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
                key={idx}
                {...styles}
                component={Link}
                props={{ to: urlFormat.replace(':num', idx) }}
              >
                {idx}
              </InlineBlock>
            )
          }
        })}
      </Block>
    )
  }
}