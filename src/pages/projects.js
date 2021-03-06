import React, { Component } from 'react'
import { graphql } from 'gatsby'
import get from 'lodash/get'
import Helmet from 'react-helmet'
import Layout from '../components/layout'
import ProjectPreview from '../components/project-preview'
import projectsStyles from './projects.module.scss'
import Fade from 'react-reveal/Fade'
import Translater from './../components/Translater'

class ProjectsIndex extends Component {
  state = {
    tag: 'all',
  }

  renderProjects = projects =>
    projects.map(({ node }, i) => {
      if (
        (node.tags && node.tags.includes(this.state.tag)) ||
        this.state.tag === 'all'
      ) {
        if (node.heroImage.fluid.aspectRatio) {
          const classes = []
          if ((i / 2 + 1) % 6 === 0) {
            classes.push(projectsStyles.spanCol2)
          } else if ((i / 2 + 1) % 5 === 0) {
          } else if ((i / 2 + 1) % 4 === 0) {
            classes.push(projectsStyles.spanRow2)
          } else if ((i / 2 + 1) % 3 === 0) {
          } else if ((i / 2 + 1) % 2 === 0) {
            classes.push(
              [projectsStyles.spanCol2, projectsStyles.spanRow2].join(' ')
            )
          } else {
            classes.push(projectsStyles.spanCol2)
          }

          return (
            <div
              key={i / 2}
              className={[classes, projectsStyles.gridItem].join(' ')}
            >
              <ProjectPreview project={node} />
            </div>
          )
        }
      }
    })

  render() {
    const siteTitle = get(this, 'props.data.site.siteMetadata.title')
    const projects = get(this, 'props.data.allContentfulProject.edges')
    const siteMetadata = get(this, 'props.data.site.siteMetadata')
    const { tag } = this.state
    const {
      pathContext: { locale },
    } = this.props

    const tags = [
      {
        label: 'Tous',
        slug: 'all',
      },
      {
        label: 'Design graphique',
        slug: 'graphic_design',
      },
      {
        label: 'Image de marque',
        slug: 'branding',
      },
      {
        label: 'Photographie',
        slug: 'photograph',
      },
    ]

    return (
      <Layout location={this.props.location} siteMetadata={siteMetadata}>
        <Translater locale={locale}>
          <>
            <Helmet title={siteTitle} />
            <div
              className="has-background-black"
              style={{ paddingTop: '8rem' }}
            >
              <div
                className="container is-fluid"
                style={{ marginLeft: '5.5rem', marginRight: '5.5rem' }}
              >
                <hr
                  style={{ backgroundColor: 'rgba(255,255,255,0.2', margin: 0 }}
                />
                <div
                  className="level has-text-white has-text-weight-semibold"
                  style={{ height: '100px', margin: 0 }}
                >
                  <div className="level-left">
                    <h1 className="has-text-weight-semibold">Portfolio</h1>
                  </div>
                  <div className="level-right">
                    {tags.map((tagObject, index) => (
                      <a
                        onClick={() => this.setState({ tag: tagObject.slug })}
                        key={index}
                        className={`${
                          this.state.tag === tagObject.slug
                            ? projectsStyles.selectedTag
                            : null
                        } has-text-white`}
                        style={{ marginLeft: '3rem' }}
                      >
                        {tagObject.label}
                      </a>
                    ))}
                  </div>
                </div>
                <Fade cascade bottom where={tag}>
                  <div className={projectsStyles.grid}>
                    {this.renderProjects(projects)}
                  </div>
                </Fade>
              </div>
            </div>
          </>
        </Translater>
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
          client
          services
          otherInfo
          tags
          publishDate(formatString: "MMMM Do, YYYY")
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
