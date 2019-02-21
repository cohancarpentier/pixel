import React from 'react'
import { graphql, Link } from 'gatsby'
import Helmet from 'react-helmet'
import get from 'lodash/get'
import Img from 'gatsby-image'
import Layout from '../components/layout'
import squares from './../images/squares.svg'
import projectStyles from './project.module.scss'

class ProjectTemplate extends React.Component {
  state = {
    descriptionOpened: false,
  }

  render() {
    const project = get(this.props, 'data.contentfulProject')
    const siteTitle = get(this.props, 'data.site.siteMetadata.title')
    const siteMetadata = get(this, 'props.data.site.siteMetadata')
    const { descriptionOpened } = this.state

    console.log(project)

    return (
      <Layout location={this.props.location} siteMetadata={siteMetadata}>
        <Helmet title={`${project.title} | ${siteTitle}`} />

        <div className="has-background-black" style={{ paddingTop: '8rem' }}>
          <div className="container is-fluid">
            <hr
              style={{ backgroundColor: 'rgba(255,255,255,0.1', margin: 0 }}
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
                    style={{ fontWeight: 100, marginRight: '1rem' }}
                  >
                    +
                  </span>
                  Description du projet
                </a>
              </div>
            </div>
          </div>
        </div>

        {descriptionOpened ? (
          <div className="has-background-black">
            <div className="container is-fluid">
              <hr
                style={{ backgroundColor: 'rgba(255,255,255,0.1', margin: 0 }}
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
                      __html: project.body.childMarkdownRemark.html,
                    }}
                  />
                </div>
                <div className="column is-3 is-offset-2">
                  <h2 className="has-text-weight-bold">Client</h2>
                  <p>{project.client}</p>
                  <hr style={{ backgroundColor: 'rgba(255,255,255,0.1)' }} />
                  <h2 className="has-text-weight-bold">Services</h2>
                  <p>{project.client}</p>
                  <hr style={{ backgroundColor: 'rgba(255,255,255,0.1)' }} />
                  <h2 className="has-text-weight-bold">Autres informations</h2>
                  <p>{project.client}</p>
                </div>
              </div>
            </div>
          </div>
        ) : null}

        <div>
          <div
            className="container has-background-white is-fluid"
            style={{
              marginTop: '4rem',
              marginBottom: '4rem',
            }}
          >
            <Img alt={project.title} fluid={project.heroImage.fluid} />

            <div className="columns" style={{ marginTop: '1rem' }}>
              <div className="column is-half">
                <Img alt={project.title} fluid={project.heroImage.fluid} />
              </div>
              <div className="column is-half">
                <Img alt={project.title} fluid={project.heroImage.fluid} />
              </div>
            </div>

            <div className="level" style={{ marginTop: '4rem' }}>
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
          ...GatsbyContentfulFluid_withWebp
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
