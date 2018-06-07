import React from 'react'
import { Col, Block, Inline } from 'jsxstyle'
import { lineHeight, mobileScale, scale } from '../constants'
import { Link } from '@reach/router'
const navTextStyle = {
  color: '#ccc',
  fontSize: '0.7rem'
}
const PreviousLink = ({ children }) => (
  <Col lineHeight={scale} flex={1} textAlign='left' marginBottom='1rem'>
    {children}
  </Col>
)
const NextLink = ({ children }) => (
  <Col lineHeight={scale} flex={1} textAlign='left'>
    {children}
  </Col>
)
export default class PostSiblings extends React.Component {
  render () {
    const {newerSibling, olderSibling} = this.props
    return (
      <Col
        alignItems='flex-start'
        justifyContent='space-between'
        marginTop={`${lineHeight * 2}rem`}
        paddingTop={`${lineHeight * 1}rem`}
        borderTop='5px dashed #eee'
      >
        {newerSibling && (
          <PreviousLink>
            <Block {...navTextStyle}>NEWER</Block>
            <div>
              <Inline
                component={Link}
                props={{
                  to: newerSibling.permalink
                }}
                fontSize={`${Math.pow(mobileScale, 1)}rem`}
              >
                {newerSibling.title}
              </Inline>
            </div>
          </PreviousLink>
        )}
        {olderSibling && (
          <NextLink to={olderSibling.permalink}>
            <Block {...navTextStyle}>OLDER</Block>
            <div>
              <Inline
                component={Link}
                props={{
                  to: olderSibling.permalink
                }}
                fontSize={`${Math.pow(mobileScale, 1)}rem`}
              >
                {olderSibling.title}
              </Inline>
            </div>
          </NextLink>
        )}
      </Col>
    )
  }
}
