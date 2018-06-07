import React from 'react'
import Single from '../components/Single'
import Main from '../styled/Main'
import Header from '../components/Header'
class Post extends React.Component {
  render () {
    const {permalink, siteConfig} = this.props
    const {title, menu} = siteConfig
    return (
      <React.StrictMode>
        <Header title={title} menu={menu} currentUrl={permalink} />
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
