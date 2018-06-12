import React from 'react'
import { bps } from '../constants'
import PropTypes from 'prop-types'
import { Link } from '@reach/router'
import { Block, InlineBlock } from 'jsxstyle'
const MenuItem = props => (
  <Block margin='0 0.702em' fontSize='1em' flexShrink={0}>
    {!props.current ? (
      <InlineBlock
        props={{ current: props.current + '', to: props.permalink }}
        component={Link}
        textDecoration='none'
        fontWeight={props.current === 'true' ? 'bold' : 'normal'}
        color='#000'
        paddingTop='1em'
        paddingBottom='1em'
        transition='color 0.1s'
        linkColor='#000'
        hoverColor='#000'
        hoverTextDecoration='underline'
        mediaQueries={bps}
        smLinkColor='#03c'
        smHoverColor='#03c'
        smFontSize='1.125em'
        smColor='rgb(0, 0, 238)'
      >
        {props.text}
      </InlineBlock>
    ) : (
      <InlineBlock
        component='span'
        paddingTop='1em'
        paddingBottom='1em'
        color='#000'
        fontWeight='bold'
        cursor='text'
        mediaQueries={bps}
        smColor='#000'
        smFontWeight='bold'
        smFontSize='1.125em'
      >
        {props.text}
      </InlineBlock>
    )}
  </Block>
)
export default MenuItem
MenuItem.propTypes = {
  permalink: PropTypes.string.isRequired,
  text: PropTypes.string.isRequired,
  current: PropTypes.bool
}

MenuItem.defaultProps = {
  permalink: '',
  text: '',
  current: false
}
