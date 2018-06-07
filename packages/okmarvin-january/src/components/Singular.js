import React from 'react'
import { Block } from 'jsxstyle'
import SingularHelmet from '../components/SingularHelmet'
import Main from '../styled/Main'
import Header from '../components/Header'
import Footer from '../components/Footer'
class Singular extends React.Component {
  render () {
    const {
      permalink,
      siteConfig,
      header: ArticleHeader
    } = this.props
    const { title: siteTitle, menu } = siteConfig
    return (
      <React.StrictMode>
        <Header siteTitle={siteTitle} menu={menu} currentUrl={permalink} />
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
        <Footer {...siteConfig} />
      </React.StrictMode>
    )
  }
}
export default props => (
  <SingularHelmet {...props}>
    <Singular {...props} />
  </SingularHelmet>
)
