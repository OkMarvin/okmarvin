import React from 'react'
import PropTypes from 'prop-types'
import ArticleHeader from '../styled/ArticleHeader'
import ArticleHeading from '../styled/ArticleHeading'
const PageContentHeader = ({ title }) => (
  <ArticleHeader>
    <ArticleHeading>{title}</ArticleHeading>
  </ArticleHeader>
)
PageContentHeader.propTypes = {
  title: PropTypes.string.isRequired
}
export default PageContentHeader
