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
    permalinkFormat: PropTypes.string.isRequired,
    paginate: PropTypes.number.isRequired
  }
  render () {
    const { current, total, permalinkFormat } = this.props
    const paginate = 10
    const begin = findBegin(total, current, paginate)
    return (
      <Block marginTop={'3rem'}>
        {[...Array(total + 1).keys()]
          .slice(begin, begin + paginate)
          .map(idx => {
            if (idx === current) {
              // current has no link
              return (
                <InlineBlock key={idx} {...styles} fontWeight='bold'>
                  {current}
                </InlineBlock>
              )
            }
            if (idx === 1) {
              // first page has special url
              return (
                <InlineBlock
                  key={idx}
                  {...styles}
                  component={Link}
                  props={{ to: permalinkFormat.replace('/page:num', '') }}
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
                  props={{ to: permalinkFormat.replace(':num', idx) }}
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
