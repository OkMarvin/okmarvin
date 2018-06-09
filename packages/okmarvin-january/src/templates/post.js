import React from 'react'
import { Block } from 'jsxstyle'
import PostContentHeader from '../components/PostContentHeader'
import SingularHelmet from '../components/SingularHelmet'
import Main from '../styled/Main'
import PostSiblings from '../components/PostSiblings'
import RelatedPost from '../components/RelatedPost'
class Post extends React.Component {
  render () {
    return (
      <React.Fragment>
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
          {this.props.related && (
            <RelatedPost data={this.props.related.slice(0, 5)} />
          )}
          <PostSiblings {...this.props} />
        </Main>
      </React.Fragment>
    )
  }
}
export default props => (
  <SingularHelmet {...props}>
    <Post {...props} />
  </SingularHelmet>
)
