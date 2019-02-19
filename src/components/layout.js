import React, { Fragment } from 'react'
import { Link } from 'gatsby'
import Navigation from './navigation'
import './../styles/styles.scss'

class Template extends React.Component {
  render() {
    const { location, children } = this.props
    let header

    let rootPath = `/`
    if (typeof __PREFIX_PATHS__ !== `undefined` && __PREFIX_PATHS__) {
      rootPath = __PATH_PREFIX__ + `/`
    }

    return (
      <Fragment>
        {/*<Navigation />*/}
        {children}
      </Fragment>
    )
  }
}

export default Template
