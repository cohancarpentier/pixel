import React from 'react'
import { graphql } from 'gatsby'
import Helmet from 'react-helmet'
import get from 'lodash/get'
import Img from 'gatsby-image'
import Layout from '../components/layout'

class ProjectTemplate extends React.Component {
  render() {
    const post = get(this.props, 'data.contentfulProject')
    const siteTitle = get(this.props, 'data.site.siteMetadata.title')
    const phoneNumber = get(this, 'props.data.site.siteMetadata.phoneNumber')
    const phoneNumberPretty = get(
      this,
      'props.data.site.siteMetadata.phoneNumberPretty'
    )

    return (
      <Layout
        location={this.props.location}
        phoneNumber={phoneNumber}
        phoneNumberPretty={phoneNumberPretty}
      >
        <Helmet title={`${post.title} | ${siteTitle}`} />

        <Img alt={post.title} fluid={post.heroImage.fluid} />

        <div className="wrapper">
          <h1 className="section-headline">{post.title}</h1>
          <p
            style={{
              display: 'block',
            }}
          >
            {post.publishDate}
          </p>
          <div
            dangerouslySetInnerHTML={{
              __html: post.body.childMarkdownRemark.html,
            }}
          />
        </div>
      </Layout>
    )
  }
}

export default ProjectTemplate

export const pageQuery = graphql`
  query ProjectBySlug($slug: String!) {
    site {
      siteMetadata {
        title
        phoneNumber
        phoneNumberPretty
      }
    }
    contentfulProject(slug: { eq: $slug }) {
      title
      publishDate(formatString: "MMMM Do, YYYY")
      heroImage {
        fluid(maxWidth: 1180, background: "rgb:000000") {
          ...GatsbyContentfulFluid_tracedSVG
        }
      }
      body {
        childMarkdownRemark {
          html
        }
      }
    }
  }
`
