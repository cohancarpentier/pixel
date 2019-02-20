import React, { Fragment } from 'react'
import { Link, graphql } from 'gatsby'
import get from 'lodash/get'
import Helmet from 'react-helmet'
import Layout from '../components/layout'
import ProjectPreview from '../components/project-preview'
import projectsStyles from './projects.module.scss'

class ProjectsIndex extends React.Component {
  state = {
    selectedTags: [],
  }

  renderProjects = projects =>
    projects.map(({ node }, i) => {
      const classes = []
      if ((i + 1) % 6 === 0) {
        classes.push(projectsStyles.spanCol2)
      } else if ((i + 1) % 4 === 0) {
        classes.push(projectsStyles.spanRow2)
      } else if ((i + 1) % 2 === 0) {
        classes.push(
          [projectsStyles.spanCol2, projectsStyles.spanRow2].join(' ')
        )
      } else {
        classes.push(projectsStyles.spanCol2)
      }

      return (
        <div key={i} className={[classes, projectsStyles.gridItem].join(' ')}>
          <ProjectPreview project={node} />
        </div>
      )
    })

  render() {
    const siteTitle = get(this, 'props.data.site.siteMetadata.title')
    const projects = get(this, 'props.data.allContentfulProject.edges')
    const siteMetadata = get(this, 'props.data.site.siteMetadata')

    const tags = [
      'Tous',
      'Design graphique',
      'Image de marque',
      'Vidéo',
      'Photographie',
    ]

    return (
      <Layout location={this.props.location} siteMetadata={siteMetadata}>
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
                <h1 className="has-text-weight-semibold">Portfolio</h1>
              </div>
              <div className="level-right">
                {tags.map(tag => (
                  <a className="has-text-white" style={{ marginLeft: '3rem' }}>
                    {tag}
                  </a>
                ))}
              </div>
            </div>
            <div className={projectsStyles.grid}>
              {this.renderProjects(projects)}
            </div>
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
        address
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
              ...GatsbyContentfulFluid_withWebp
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
