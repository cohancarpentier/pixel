import React from 'react'
import { graphql } from 'gatsby'
import get from 'lodash/get'
import Helmet from 'react-helmet'
import Layout from '../components/layout'

class JobsIndex extends React.Component {
  render() {
    const siteTitle = get(this, 'props.data.site.siteMetadata.title')
    const siteMetadata = get(this, 'props.data.site.siteMetadata')

    return (
      <Layout location={this.props.location} siteMetadata={siteMetadata}>
        <Helmet title={siteTitle} />
        Jobs
      </Layout>
    )
  }
}

export default JobsIndex

export const pageQuery = graphql`
  query JobsQuery {
    site {
      siteMetadata {
        title
        phoneNumber
        phoneNumberPretty
        address
      }
    }
  }
`
