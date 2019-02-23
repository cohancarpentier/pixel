import React, { Component } from 'react'
import { Link, graphql } from 'gatsby'
import get from 'lodash/get'
import Helmet from 'react-helmet'
import Layout from '../components/layout'
import Fade from 'react-reveal/Fade'
import jobStyles from './job.module.scss'

class JobTemplate extends Component {
  render() {
    const siteTitle = get(this, 'props.data.site.siteMetadata.title')
    const siteMetadata = get(this, 'props.data.site.siteMetadata')
    return (
      <Layout location={this.props.location} siteMetadata={siteMetadata}>
        <Helmet title={siteTitle} />
        <h1>job</h1>
      </Layout>
    )
  }
}

export default JobTemplate

export const pageQuery = graphql`
  query JobBySlug($slug: String!) {
    site {
      siteMetadata {
        title
        phoneNumber
        phoneNumberPretty
        address
      }
    }
    contentfulJob(slug: { eq: $slug }) {
      title
    }
  }
`
