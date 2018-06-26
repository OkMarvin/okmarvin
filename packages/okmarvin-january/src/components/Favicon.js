import React from 'react'
import Helmet from 'react-helmet-async'
import PropTypes from 'prop-types'
export default class Favicon extends React.Component {
  render () {
    const { favicon } = this.props
    let result
    if (!favicon) {
      result = null
    }
    if (favicon.endsWith('.ico')) {
      result = <link rel='shortcut icon' href={favicon} />
    }
    if (favicon.endsWith('.gif')) {
      result = <link rel='icon' type='image/gif' href={favicon} />
    }
    if (favicon.endsWith('.png')) {
      result = <link rel='icon' type='image/png' href={favicon} />
    }
    return <Helmet>{result}</Helmet>
  }
}
Favicon.propTypes = {
  favicon: PropTypes.string
}
