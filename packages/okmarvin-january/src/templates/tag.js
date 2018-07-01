import React from 'react'
import Html from '../components/Html'
import Helmet from 'react-helmet-async'
import PropTypes from 'prop-types'
import Main from '../styled/Main'
import ArchiveItem from '../components/ArchiveItem'
import Pagination from '../components/Pagination'
import PageContentHeader from '../components/PageContentHeader'
import LocaleContext from '../LocaleContext'
import i18n from '../i18n'
class Tag extends React.Component {
  render () {
    const { title, list, siteConfig } = this.props
    const { paginate } = siteConfig
    return (
      <React.Fragment>
        <Helmet>
          <meta property='og:type' content='website' />
        </Helmet>
        <Main>
          {
            <React.Fragment>
              <LocaleContext.Consumer>
                {
                  locale => <PageContentHeader title={`${i18n('Topic:', locale)}: ${title}`} />
                }
              </LocaleContext.Consumer>
              {list.map(d => <ArchiveItem key={d.permalink} {...d} />)}
            </React.Fragment>
          }
          {paginate &&
            this.props.paginator && <Pagination {...this.props.paginator} paginate={paginate} />}
        </Main>
      </React.Fragment>
    )
  }
}
Tag.propTypes = {
  title: PropTypes.string.isRequired,
  description: PropTypes.string,
  siteConfig: PropTypes.shape({
    paginate: PropTypes.number
  }),
  list: PropTypes.array,
  paginator: PropTypes.object
}
export default props => (
  <Html {...props}>
    <Tag {...props} />
  </Html>
)
