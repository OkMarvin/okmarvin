import React from 'react'
import { Link } from '@reach/router'
import { Block } from 'jsxstyle'
const Related = props => (
  <React.Fragment>
    {props.data.length ? (
      <aside>
        <Block component='h2' fontSize='1rem'>Learn More </Block>
        <ul>
          {props.data.map(link => (
            <li key={link.permalink}>
              <Link to={link.permalink}>{link.title}</Link>
            </li>
          ))}
        </ul>
      </aside>
    ) : null}
  </React.Fragment>
)
export default Related
Related.defaultProps = {
  data: []
}
