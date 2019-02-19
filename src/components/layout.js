import React, { Fragment } from 'react'
import { Link } from 'gatsby'
import './../styles/styles.scss'
import { Navigation } from './navigation'
import { Footer } from './footer'

class Template extends React.Component {
  render() {
    const { location, children, phoneNumber, phoneNumberPretty } = this.props
    let header

    let rootPath = `/`
    if (typeof __PREFIX_PATHS__ !== `undefined` && __PREFIX_PATHS__) {
      rootPath = __PATH_PREFIX__ + `/`
    }

    return (
      <Fragment>
        <Navigation
          phoneNumber={phoneNumber}
          phoneNumberPretty={phoneNumberPretty}
        />
        {children}
        <Footer
          phoneNumber={phoneNumber}
          phoneNumberPretty={phoneNumberPretty}
        />
      </Fragment>
    )
  }
}

export default Template
