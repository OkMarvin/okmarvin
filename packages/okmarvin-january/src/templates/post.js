import React from 'react'
import { Block } from 'jsxstyle'
import PostContentHeader from '../components/PostContentHeader'
import SingularHelmet from '../components/SingularHelmet'
import Main from '../styled/Main'
class Post extends React.Component {
  render () {
    return (
      <React.StrictMode>
        <Main>
          <Block component='article'>
            <PostContentHeader {...this.props} />
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
    <Post {...props} />
  </SingularHelmet>
)
