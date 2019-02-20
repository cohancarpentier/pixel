import React from 'react'
import { Link, graphql } from 'gatsby'
import get from 'lodash/get'
import Helmet from 'react-helmet'
import Layout from '../components/layout'
import p from './../images/p.svg'

class RootIndex extends React.Component {
  render() {
    const siteTitle = get(this, 'props.data.site.siteMetadata.title')
    const siteMetadata = get(this, 'props.data.site.siteMetadata')
    const projects = get(this, 'props.data.allContentfulProject.edges')
    const homepage = get(this, 'props.data.allContentfulHomePage.edges')[0].node

    return (
      <Layout location={this.props.location} siteMetadata={siteMetadata}>
        <Helmet title={siteTitle} />
        team
      </Layout>
    )
  }
}

export default TeamIndex

export const pageQuery = graphql`
  query TeamQuery {
    site {
      siteMetadata {
        title
        phoneNumber
        phoneNumberPretty
        address
      }
    }
    allContentfulHomePage {
      edges {
        node {
          hero {
            childMarkdownRemark {
              html
            }
          }
          heroVideo {
            file {
              url
            }
          }
          slogan {
            childMarkdownRemark {
              html
            }
          }
          promo {
            title
            subtitle {
              childMarkdownRemark {
                html
              }
            }
          }
          services {
            title
            description {
              childMarkdownRemark {
                html
              }
            }
          }
        }
      }
    }
  }
`
