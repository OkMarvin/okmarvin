import React from 'react'
import { Link } from '@reach/router'
import { Block, InlineBlock } from 'jsxstyle'
import LocaleContext from '../LocaleContext'
import i18n from '../i18n'
const Related = props => (
  <React.Fragment>
    {props.data.length ? (
      <aside>
        <Block component='h2' fontSize='1rem'>
          <LocaleContext.Consumer>
            {
              locale => <InlineBlock background='#f0d892'>{i18n('Learn More', locale)}</InlineBlock>
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
