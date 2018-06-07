import React from 'react'
import Single from '../components/Single'
import Main from '../styled/Main'
import Header from '../components/Header'
class Post extends React.Component {
  render () {
    const { permalink, siteConfig } = this.props
    const { title: siteTitle, menu } = siteConfig
    return (
      <React.StrictMode>
        <Header siteTitle={siteTitle} menu={menu} currentUrl={permalink} />
        <Main>
          <section
            dangerouslySetInnerHTML={{
              __html: this.props.content
            }}
            className='okmarvin-content'
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
