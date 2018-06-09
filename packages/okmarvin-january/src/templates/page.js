import React from 'react'
import { Block } from 'jsxstyle'
import PageContentHeader from '../components/PageContentHeader'
import SingularHelmet from '../components/SingularHelmet'
import Main from '../styled/Main'
class Page extends React.Component {
  render () {
    return (
      <React.Fragment>
        <Main>
          <Block component='article'>
            <PageContentHeader {...this.props} />
            <section
              dangerouslySetInnerHTML={{
                __html: this.props.content
              }}
              className='okmarvin-content'
            />
          </Block>
        </Main>
      </React.Fragment>
    )
  }
}
export default props => (
  <SingularHelmet {...props}>
    <Page {...props} />
  </SingularHelmet>
)
