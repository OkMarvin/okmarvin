import React from 'react'
import Html from '../components/Html'
import {Helmet} from 'react-helmet'
import PropTypes from 'prop-types'
import Main from '../styled/Main'
import { Block } from 'jsxstyle'
import groupBy from 'lodash/groupBy'
import { getYear } from 'date-fns'
import { bps, lineHeight, mobileScale, scale } from '../constants'
import ArchiveItem from '../components/ArchiveItem'
import Pagination from '../components/Pagination'
class Index extends React.Component {
  render () {
    const { title, description, list, siteConfig } = this.props
    const { paginate } = siteConfig
    const archives = groupBy(list, file =>
      getYear(new Date(file.datePublished))
    )
    Object.keys(archives).map(year => {
      archives[year] = archives[year].sort(
        (a, b) => new Date(b.datePublished, new Date(a.datePublished))
      )
    })
    return (
      <React.Fragment>
        <Helmet>
          <meta property='og:type' content='website' />
          <script type='application/ld+json'>
            {`
                {
                  "@context": "http://schema.org",
                  "@type": "Blog",
                  "name": "${title}",
                  "description": "${description}"
                }
              `}
          </script>
        </Helmet>
        <Main>
          {Object.keys(archives)
            .sort((a, b) => b - a)
            .map(year => {
              return (
                <React.Fragment key={year}>
                  <Block
                    component='h2'
                    fontFamily='Courier, monospace'
                    fontSize={`${Math.pow(mobileScale, 4)}rem`}
                    marginTop={`${lineHeight * 2}rem`}
                    marginBottom={`${lineHeight / 2}rem`}
                    fontWeight='bold'
                    lineHeight={lineHeight - 0.3}
                    mediaQueries={bps}
                    lgFontSize={`${Math.pow(scale, 5)}rem`}
                    lgMarginTop={`${lineHeight * 2}rem`}
                    lgMarginBottom={0}
                  >
                    {year}
                  </Block>
                  {archives[year].map(d => (
                    <ArchiveItem key={d.permalink} {...d} />
                  ))}
                </React.Fragment>
              )
            })}
          {paginate && this.props.paginator && <Pagination {...this.props.paginator} paginate={paginate} />}
        </Main>
      </React.Fragment>
    )
  }
}
Index.propTypes = {
  title: PropTypes.string.isRequired,
  description: PropTypes.string.isRequired,
  siteConfig: PropTypes.shape({
    menu: PropTypes.array
  }),
  list: PropTypes.array,
  paginator: PropTypes.object
}
export default props => (
  <Html {...props}>
    <Index {...props} />
  </Html>
)
