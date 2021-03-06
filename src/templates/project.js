import React, { Component } from 'react'
import { graphql, Link } from 'gatsby'
import Helmet from 'react-helmet'
import get from 'lodash/get'
import Img from 'gatsby-image'
import Layout from '../components/layout'
import squares from './../images/squares.svg'
import projectStyles from './project.module.scss'
import Slide from 'react-reveal/Slide'
import Fade from 'react-reveal/Fade'
import Translater from './../components/Translater'
import { FormattedMessage } from 'react-intl'
import LocalizedLink from '../components/LocalizedLink'

const windowGlobal = typeof window !== 'undefined' && window

class ProjectTemplate extends Component {
  state = {
    descriptionOpened: false,
    currentProjectIndex: 0,
  }

  componentDidMount() {
    this.updateCurrentIndex()
  }

  updateCurrentIndex() {
    let projects = get(this, 'props.data.allContentfulProject.edges')
    projects = projects.filter(
      (thing, index, self) =>
        index === self.findIndex(t => t.node.slug === thing.node.slug)
    )
    let currentProjectIndex = []

    let projectSlug

    if (windowGlobal.location) {
      const url = windowGlobal.location.href
      projectSlug = url.substr(url.lastIndexOf('/') + 1)
    }

    projects.filter((project, index) => {
      if (project.node.slug === projectSlug) {
        currentProjectIndex.push(index)
      }
    })

    this.setState({
      currentProjectIndex: currentProjectIndex[0],
    })
  }

  render() {
    const project = get(this.props, 'data.contentfulProject')
    let projects = get(this, 'props.data.allContentfulProject.edges')
    projects = projects.filter(
      (thing, index, self) =>
        index === self.findIndex(t => t.node.slug === thing.node.slug)
    )
    const siteTitle = get(this.props, 'data.site.siteMetadata.title')
    const siteMetadata = get(this, 'props.data.site.siteMetadata')
    const { descriptionOpened, currentProjectIndex } = this.state
    const {
      pathContext: { locale },
    } = this.props

    console.log(this.props)

    return (
      <Layout location={this.props.location} siteMetadata={siteMetadata}>
        <Translater locale={locale}>
          <>
            <Helmet title={`${project.title} | ${siteTitle}`} />
            <div
              className="has-background-black"
              style={{ paddingTop: '8rem', position: 'relative', zIndex: 2 }}
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
                  style={{ paddingTop: '2rem', paddingBottom: '2rem' }}
                >
                  <div className="level-left">
                    <h1 className="has-text-weight-semibold">Portfolio</h1>
                  </div>
                  <div className="level-right">
                    <a
                      onClick={() =>
                        this.setState({
                          descriptionOpened: !descriptionOpened,
                        })
                      }
                      className="has-text-white"
                      style={{ display: 'flex', alignItems: 'center' }}
                    >
                      <span
                        className="title is-3 has-text-white"
                        style={{
                          fontWeight: 100,
                          marginRight: '1rem',
                          marginBottom: 0,
                        }}
                      >
                        {descriptionOpened ? '-' : '+'}
                      </span>
                      <FormattedMessage id="projectDescription" />
                    </a>
                  </div>
                </div>
              </div>
            </div>
            <Slide top collapse when={descriptionOpened} style={{ zIndex: 1 }}>
              <div className="has-background-black">
                <div
                  className="container is-fluid"
                  style={{ marginLeft: '5.5rem', marginRight: '5.5rem' }}
                >
                  <hr
                    style={{
                      backgroundColor: 'rgba(255,255,255,0.2',
                      margin: 0,
                    }}
                  />
                  <div
                    className="columns has-text-white has-text-weight-semibold"
                    style={{ paddingTop: '4rem', paddingBottom: '6rem' }}
                  >
                    <div className="column is-7">
                      <h1 className="title is-5 has-text-white has-text-weight-bold">
                        {project.title}
                      </h1>
                      <div
                        dangerouslySetInnerHTML={{
                          __html: project.description.childMarkdownRemark.html,
                        }}
                      />
                    </div>
                    <div className="column is-3 is-offset-2">
                      {project.client ? (
                        <>
                          <h2 className="has-text-weight-bold">
                            <FormattedMessage id="client" />
                          </h2>
                          <p>{project.client}</p>
                          <hr
                            style={{ backgroundColor: 'rgba(255,255,255,0.2)' }}
                          />
                        </>
                      ) : null}

                      {project.services ? (
                        <>
                          <h2 className="has-text-weight-bold">
                            <FormattedMessage id="services" />
                          </h2>
                          <p>{project.services}</p>
                          <hr
                            style={{ backgroundColor: 'rgba(255,255,255,0.2)' }}
                          />
                        </>
                      ) : null}

                      {project.otherInfo ? (
                        <>
                          <h2 className="has-text-weight-bold">
                            Autres informations
                          </h2>
                          <p>{project.otherInfo}</p>
                        </>
                      ) : null}
                    </div>
                  </div>
                </div>
              </div>
            </Slide>
            <div>
              <div
                className="container has-background-white is-fluid"
                style={{
                  marginTop: '4rem',
                  marginBottom: '4rem',
                  marginLeft: '5.5rem',
                  marginRight: '5.5rem',
                }}
              >
                <Fade>
                  <Img alt={project.title} fluid={project.heroImage.fluid} />
                </Fade>

                <div className="columns" style={{ marginTop: '1rem' }}>
                  <div className="column is-half">
                    <Fade>
                      <Img
                        alt={project.title}
                        fluid={project.heroImage.fluid}
                      />
                    </Fade>
                  </div>
                  <div className="column is-half">
                    <Fade>
                      <Img
                        alt={project.title}
                        fluid={project.heroImage.fluid}
                      />
                    </Fade>
                  </div>
                </div>

                <div className="level" style={{ marginTop: '4rem' }}>
                  <div className="level-left">
                    {projects[currentProjectIndex - 1] ? (
                      <LocalizedLink
                        to={`/projects/${
                          projects[currentProjectIndex - 1].node.slug
                        }`}
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
                      </LocalizedLink>
                    ) : null}
                    {projects[currentProjectIndex + 1] ? (
                      <LocalizedLink
                        to={`/projects/${
                          projects[currentProjectIndex + 1].node.slug
                        }`}
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
                          &gt;
                        </span>
                      </LocalizedLink>
                    ) : null}
                  </div>
                  <div className="level-right">
                    <LocalizedLink
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
                      <span className="has-text-black">
                        <FormattedMessage id="seeOurWork" />
                      </span>
                    </LocalizedLink>
                  </div>
                </div>
              </div>
            </div>
          </>
        </Translater>
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
    allContentfulProject(sort: { fields: [publishDate], order: DESC }) {
      edges {
        node {
          title
          slug
          publishDate(formatString: "MMMM Do, YYYY")
        }
      }
    }
    contentfulProject(slug: { eq: $slug }) {
      title
      client
      services
      otherInfo
      description {
        childMarkdownRemark {
          html
        }
      }
      publishDate(formatString: "MMMM Do, YYYY")
      heroImage {
        fluid(maxWidth: 1180, background: "rgb:000000", quality: 100) {
          ...GatsbyContentfulFluid_withWebp
        }
      }
    }
  }
`
