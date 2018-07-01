import React from 'react'
import { Link } from '@reach/router'
import { Block } from 'jsxstyle'
import LocaleContext from '../LocaleContext'
import i18n from '../i18n'
const Related = props => (
  <React.Fragment>
    {props.data.length ? (
      <aside>
        <Block component='h2' fontSize='1rem'>
          <LocaleContext.Consumer>
            {
              locale => <span>{i18n('Learn More', locale)}</span>
            }
          </LocaleContext.Consumer>
        </Block>
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
