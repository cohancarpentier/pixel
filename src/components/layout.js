import React, { Component, Fragment } from 'react'
import { Link } from 'gatsby'
import './../styles/styles.scss'
import { Navigation } from './navigation'
import { Footer } from './footer'

class Template extends Component {
  render() {
    const { location, children, siteMetadata } = this.props
    let header

    let rootPath = `/`
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

export default Template
