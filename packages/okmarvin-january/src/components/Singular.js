import React from 'react'
import { Block } from 'jsxstyle'
import SingularHelmet from '../components/SingularHelmet'
import Main from '../styled/Main'
class Singular extends React.Component {
  render () {
    const {
      header: ArticleHeader
    } = this.props
    return (
      <React.StrictMode>
        <Main>
          <Block component='article'>
            {ArticleHeader && <ArticleHeader {...this.props} />}
            <section
              dangerouslySetInnerHTML={{
                __html: this.props.content
              }}
              className='okmarvin-content'
            />
          </Block>
        </Main>
      </React.StrictMode>
    )
  }
}
export default props => (
  <SingularHelmet {...props}>
    <Singular {...props} />
  </SingularHelmet>
)
