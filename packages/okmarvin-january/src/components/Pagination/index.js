import React from 'react'
import PropTypes from 'prop-types'
import { Block, InlineBlock } from 'jsxstyle'
import { Link } from '@reach/router'
import findBegin from './findBegin'
const styles = {
  padding: '6px 16px',
  fontSize: '1rem',
  lineHeight: 1.2,
  transition: 'all 0.2s'
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
    // show max 5 page button
    const paginate = 5
    const begin = findBegin(total, current, paginate)
    return (
      <Block marginTop={'3rem'}>
        {[...Array(total + 1).keys()]
          .slice(begin, begin + paginate)
          .map(idx => {
            if (idx === current) {
              // current has no link
              return (
                <InlineBlock
                  key={idx}
                  {...styles}
                  fontWeight='bold'
                  background='rgb(255, 213, 79)'
                  cursor='text'
                  marginRight={2}
                >
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
                  background='#f2f2f2'
                  color='#000'
                  component={Link}
                  marginRight={2}
                  props={{ to: permalinkFormat.replace('/page:num', '') }}
                >
                  1
                </InlineBlock>
              )
            } else {
              return (
                <InlineBlock
                  background='#f2f2f2'
                  color='#000'
                  key={idx}
                  {...styles}
                  component={Link}
                  marginRight={2}
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
