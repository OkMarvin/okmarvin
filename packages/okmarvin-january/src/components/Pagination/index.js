import React from 'react'
import PropTypes from 'prop-types'
import { Block, InlineBlock } from 'jsxstyle'
import { Link } from '@reach/router'
import getPaginationList from './getPaginationList'
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
    const pagination = getPaginationList(total, current)
    return <Block marginTop={'3rem'}>
      {
        pagination.map((p) => {
          if (p === current) {
            return <InlineBlock
              key={p}
              {...styles}
              fontWeight='bold'
              background='rgb(255, 213, 79)'
              cursor='text'
              marginRight={2}
              marginBottom={2}
            >
              {current}
            </InlineBlock>
          }
          if (p === '...') {
            return <InlineBlock
              background='#f2f2f2'
              color='#000'
              key={p}
              {...styles}
              marginRight={2}
              marginBottom={2}
              cursor='not-allowed'
            >
              {p}
            </InlineBlock>
          }
          if (p === 1) {
            // first page
            return (
              <InlineBlock
                key={p}
                {...styles}
                background='#f2f2f2'
                color='#000'
                component={Link}
                marginRight={2}
                marginBottom={2}
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
                key={p}
                {...styles}
                component={Link}
                marginRight={2}
                marginBottom={2}
                props={{ to: permalinkFormat.replace(':num', p) }}
              >
                {p}
              </InlineBlock>
            )
          }
        })
      }
    </Block>
  }
}
