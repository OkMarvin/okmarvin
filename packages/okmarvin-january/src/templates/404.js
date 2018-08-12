import React from 'react'
import { Link } from '@reach/router'
import Main from '../styled/Main'
import { Block, Inline, InlineBlock } from 'jsxstyle'
export default ({ siteConfig }) => (
  <Main>
    <Block component='h1' borderBottom='1px solid #ddd'>
      Page Not Found
    </Block>
    <p>
      Go{' '}
      <Inline textDecoration='underline !important' component={Link} props={{ to: '/' }}>
        home page
      </Inline>
      .
    </p>
    {siteConfig.logo && (
      <Block
        component={Link}
        props={{ to: '/' }}
        textAlign='center'
        marginTop={200}
      >
        <InlineBlock
          component='img'
          maxWidth={50}
          borderRadius={3}
          border='none'
          marginRight={5}
          props={{ src: siteConfig.logo }}
        />
        {siteConfig.title}
      </Block>
    )}
  </Main>
)
