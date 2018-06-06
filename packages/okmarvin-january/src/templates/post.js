import React from 'react'
import Single from '../components/Single'
import Main from '../styled/Main'
class Post extends React.Component {
  render () {
    return (
      <React.StrictMode>
        <Main>
          <section
            dangerouslySetInnerHTML={{
              __html: this.props.content
            }}
            className='markdown'
          />
        </Main>
      </React.StrictMode>
    )
  }
}
export default props => (
  <Single {...props}>
    <Post {...props} />
  </Single>
)
