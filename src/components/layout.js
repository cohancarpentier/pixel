import React, { Component, Fragment } from 'react'
import './../styles/styles.scss'
if (window.location.pathname.replace(/^\/([^\/]*).*$/, '$1') === 'en') {
  require('./../styles/_glitchy-en.scss')
} else {
  require('./../styles/_glitchy-fr.scss')
}
import { Navigation } from './navigation'
import { Footer } from './footer'

class Layout extends Component {
  render() {
    const { children, siteMetadata } = this.props

    if (typeof __PREFIX_PATHS__ !== `undefined` && __PREFIX_PATHS__) {
      rootPath = __PATH_PREFIX__ + `/`
    }

    return (
      <Fragment>
        <Navigation
          address={siteMetadata.address}
          phoneNumber={siteMetadata.phoneNumber}
          phoneNumberPretty={siteMetadata.phoneNumberPretty}
        />
        {children}
        <Footer
          address={siteMetadata.address}
          phoneNumber={siteMetadata.phoneNumber}
          phoneNumberPretty={siteMetadata.phoneNumberPretty}
        />
      </Fragment>
    )
  }
}

export default Layout
