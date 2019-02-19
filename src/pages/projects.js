import React from 'react'
import { Link, graphql } from 'gatsby'
import get from 'lodash/get'
import Helmet from 'react-helmet'
import Layout from '../components/layout'
import ArticlePreview from '../components/article-preview'
import projectsStyles from './projects.module.scss'

class ProjectsIndex extends React.Component {
  render() {
    const siteTitle = get(this, 'props.data.site.siteMetadata.title')
    const projects = get(this, 'props.data.allContentfulProject.edges')
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
        <Helmet title={siteTitle} />
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
                <h1>Portfolio</h1>
              </div>
              <div className="level-right">
                <ul>
                  <li>Tous</li>
                </ul>
              </div>
            </div>

            <div className={projectsStyles.grid}>
              <div className={projectsStyles.spanCol2}>Item 1</div>
              <div
                className={[
                  projectsStyles.spanCol2,
                  projectsStyles.spanRow2,
                ].join(' ')}
              >
                Item 2
              </div>
              <div>Item 3</div>
              <div className={projectsStyles.spanRow2}>Item 4</div>
              <div>Item 5</div>
              <div className={projectsStyles.spanCol2}>Item 6</div>
            </div>
            <ul className="article-list">
              {projects.map(({ node }) => {
                return (
                  <li key={node.slug}>
                    <ArticlePreview article={node} />
                  </li>
                )
              })}
            </ul>
          </div>
        </div>
      </Layout>
    )
  }
}

export default ProjectsIndex

export const pageQuery = graphql`
  query ProjectsIndexQuery {
    site {
      siteMetadata {
        title
        phoneNumber
        phoneNumberPretty
      }
    }
    allContentfulProject(sort: { fields: [publishDate], order: DESC }) {
      edges {
        node {
          title
          slug
          publishDate(formatString: "MMMM Do, YYYY")
          tags
          heroImage {
            fluid(maxWidth: 350, maxHeight: 196, resizingBehavior: SCALE) {
              ...GatsbyContentfulFluid_tracedSVG
            }
          }
          description {
            childMarkdownRemark {
              html
            }
          }
        }
      }
    }
  }
`
