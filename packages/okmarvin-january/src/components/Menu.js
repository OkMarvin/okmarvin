import React from 'react'
import PropTypes from 'prop-types'
import { bps } from '../constants'
import MenuItem from './MenuItem'
import { Row } from 'jsxstyle'
const Menu = props => (
  <Row
    listStyle='none'
    paddingLeft={0}
    margin={0}
    background='#00cc99'
    width='100%'
    alignItems='center'
    justifyContent='center'
    boxShadow='0 0 1px #ccc'
    mediaQueries={bps}
    smBoxShadow='none'
    smPosition='static'
    smWidth='auto'
    smBackground='none'
  >
    {props.menu.map(m => (
      <MenuItem
        key={m.permalink}
        {...m}
        current={m.permalink === props.currentUrl}
      />
    ))}
  </Row>
)
export default Menu
Menu.propTypes = {
  menu: PropTypes.arrayOf(
    PropTypes.shape({
      permalink: PropTypes.string.isRequired,
      text: PropTypes.string.isRequired
    })
  ),
  currentUrl: PropTypes.string.isRequired
}
Menu.defaultProps = {
  menu: [],
  currentUrl: ''
}
