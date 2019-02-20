import React from 'react'
import { graphql, Link } from 'gatsby'
import Helmet from 'react-helmet'
import get from 'lodash/get'
import Img from 'gatsby-image'
import Layout from '../components/layout'
import squares from './../images/squares.svg'
import projectStyles from './project.module.scss'

class ProjectTemplate extends React.Component {
  render() {
    const post = get(this.props, 'data.contentfulProject')
    const siteTitle = get(this.props, 'data.site.siteMetadata.title')
    const siteMetadata = get(this, 'props.data.site.siteMetadata')

    return (
      <Layout location={this.props.location} siteMetadata={siteMetadata}>
        <Helmet title={`${post.title} | ${siteTitle}`} />

        <div className="has-background-black" style={{ paddingTop: '8rem' }}>
          <div className="container is-fluid">
            <hr
              style={{ backgroundColor: 'rgba(255,255,255,0.1', margin: 0 }}
            />
            <div
              className="level has-text-white has-text-weight-semibold"
              style={{ paddingTop: '2rem' }}
            >
              <div className="level-left">
                <h1 className="has-text-weight-semibold">Portfolio</h1>
              </div>
              <div className="level-right">
                <h2>description</h2>
              </div>
            </div>
          </div>
        </div>
        <div>
          <div
            className="container has-background-white is-fluid"
            style={{
              marginTop: '4rem',
              marginBottom: '4rem',
            }}
          >
            <Img alt={post.title} fluid={post.heroImage.fluid} />

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

            <div className="level">
              <div className="level-left">
                <Link
                  to={'/projects'}
                  style={{ marginRight: '0.5rem' }}
                  className={projectStyles.gradientButton}
                >
                  <span
                    style={{
                      width: 38,
                      height: 38,
                      display: 'flex',
                      justifyContent: 'center',
                      alignItems: 'center',
                    }}
                    className="has-background-white has-text-primary"
                  >
                    &lt;
                  </span>
                </Link>
                <Link to={'/projects'} className={projectStyles.gradientButton}>
                  <span
                    style={{
                      width: 38,
                      height: 38,
                      display: 'flex',
                      justifyContent: 'center',
                      alignItems: 'center',
                    }}
                    className="has-background-white has-text-primary"
                  >
                    &gt;
                  </span>
                </Link>
              </div>
              <div className="level-right">
                <Link
                  to={'/projects'}
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                  }}
                >
                  <img
                    style={{ marginRight: '1rem' }}
                    src={squares}
                    alt="Squares"
                    width={18}
                    height={18}
                  />
                  <span className="has-text-black">Voir nos réalisations</span>
                </Link>
              </div>
            </div>
          </div>
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
        address
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
