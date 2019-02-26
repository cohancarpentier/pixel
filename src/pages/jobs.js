import React from 'react'
import { Link, graphql } from 'gatsby'
import get from 'lodash/get'
import Helmet from 'react-helmet'
import Layout from '../components/layout'
import Fade from 'react-reveal/Fade'
import jobsStyles from './jobs.module.scss'

class JobsIndex extends React.Component {
  render() {
    const siteTitle = get(this, 'props.data.site.siteMetadata.title')
    const siteMetadata = get(this, 'props.data.site.siteMetadata')
    let jobs = get(this, 'props.data.allContentfulJob.edges')
    jobs = jobs.filter(
      (thing, index, self) =>
        index === self.findIndex(t => t.node.slug === thing.node.slug)
    )
    const jobsPage = get(this, 'props.data.allContentfulJobsPage.edges')[0].node
    console.log(jobsPage)

    return (
      <Layout location={this.props.location} siteMetadata={siteMetadata}>
        <Helmet title={siteTitle} />
        <div style={{ paddingTop: '8rem', zIndex: 3, position: 'relative' }}>
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
                <h1 className="has-text-weight-semibold">{jobsPage.title}</h1>
              </div>
            </div>
          </div>
        </div>
        <section
          className="hero is-medium"
          style={{ marginTop: '-14.35rem', position: 'relative' }}
        >
          <div
            className="hero-video"
            style={{
              height: '100%',
              width: '100%',
              background: `url(${
                jobsPage.heroImage.fluid.src
              }) no-repeat center center`,
              backgroundSize: 'cover',
            }}
          >
            <video
              poster={jobsPage.heroImage.fluid.src}
              playsInline
              autoPlay
              muted
              loop
              style={{
                height: '100%',
                width: '100%',
                objectFit: 'cover',
                zIndex: '1',
                right: 0,
                bottom: 0,
                background: `url(${
                  jobsPage.heroImage.fluid.src
                }) no-repeat center center`,
                backgroundSize: 'cover',
                overflow: 'hidden',
              }}
            >
              <source src={jobsPage.heroVideo.file.url} type="video/mp4" />
            </video>
          </div>
          <div
            className="hero-body"
            style={{ backgroundColor: 'rgba(0,0,0,0.75)', zIndex: 2 }}
          >
            <Fade right cascade>
              <div className="container">
                <div
                  style={{ marginTop: '6rem' }}
                  className="columns is-multiline"
                >
                  <div className="column is-9">
                    <h2
                      className={`${
                        jobsStyles.mobileTitle
                      } title is-2 has-text-weight-bold has-text-gradient`}
                      style={{
                        lineHeight: 1.25,
                      }}
                      dangerouslySetInnerHTML={{
                        __html: jobsPage.heroTitle,
                      }}
                    />
                  </div>
                  <div className="column is-9">
                    <p
                      className={`has-text-white`}
                      dangerouslySetInnerHTML={{
                        __html:
                          jobsPage.heroDescription.childMarkdownRemark.html,
                      }}
                    />
                  </div>
                </div>
              </div>
            </Fade>
          </div>
        </section>

        <section className="has-background-white">
          <div className="container">
            <div
              className="columns is-multiline"
              style={{ marginTop: '2.5rem', marginBottom: '6rem' }}
            >
              {jobs.map((job, index) => {
                return (
                  <Fade key={index} bottom>
                    <div
                      className={`column is-11`}
                      style={{
                        marginBottom: '6rem',
                        position: 'relative',
                      }}
                    >
                      <div
                        className="to-reveal delay-0-8"
                        style={{ position: 'relative', zIndex: 1 }}
                      >
                        <div className={` ${jobsStyles.fakeJob}`}>
                          <div
                            style={{
                              position: 'relative',
                              visibility: 'hidden',
                            }}
                          >
                            <div
                              className="level"
                              style={{ padding: '3rem 4rem' }}
                            >
                              <div
                                className="level-left"
                                style={{
                                  flexDirection: 'column',
                                  alignItems: 'flex-start',
                                }}
                              >
                                <h2 className="title is-4 has-text-white has-text-weight-bold">
                                  {job.node.title}
                                </h2>
                                <p className="has-text-white is-italic">
                                  {job.node.time}
                                </p>
                                <p className="has-text-white is-italic">
                                  Salaire: {job.node.salary}
                                </p>
                              </div>
                              <div className="level-right">
                                <Link
                                  to={`/jobs/${job.node.slug}`}
                                  className="btn-gradient"
                                >
                                  <span className="has-text-white">
                                    En savoir plus
                                  </span>
                                </Link>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>

                      <div
                        style={{
                          backgroundColor: '#222222',
                          position: 'absolute',
                          left: '3rem',
                          top: '3rem',
                          right: '-1.5rem',
                          zIndex: 2,
                        }}
                      >
                        <div className="level" style={{ padding: '3rem 4rem' }}>
                          <div
                            className="level-left"
                            style={{
                              flexDirection: 'column',
                              alignItems: 'flex-start',
                            }}
                          >
                            <h2 className="title is-4 has-text-white has-text-weight-bold">
                              <span
                                style={{
                                  width: '3rem',
                                  backgroundColor: 'rgba(255,255,255,0.2)',
                                  height: '1px',
                                  display: 'block',
                                  position: 'relative',
                                  left: '-4rem',
                                  top: '0.775rem',
                                }}
                              />
                              {job.node.title}
                            </h2>
                            <p className="has-text-white is-italic">
                              {job.node.time}
                            </p>
                            <p className="has-text-white is-italic">
                              Salaire: {job.node.salary}
                            </p>
                          </div>
                          <div className="level-right">
                            <Link
                              to={`/jobs/${job.node.slug}`}
                              className="btn-gradient"
                            >
                              <span className="has-text-white">
                                En savoir plus
                              </span>
                            </Link>
                          </div>
                        </div>
                      </div>
                    </div>
                  </Fade>
                )
              })}
            </div>
          </div>
        </section>
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
    allContentfulJobsPage {
      edges {
        node {
          title
          heroTitle
          heroVideo {
            file {
              url
            }
          }
          heroImage {
            fluid {
              ...GatsbyContentfulFluid_withWebp
            }
          }
          heroDescription {
            childMarkdownRemark {
              html
            }
          }
        }
      }
    }
    allContentfulJob(sort: { fields: [publishDate], order: DESC }) {
      edges {
        node {
          title
          slug
          salary
          time
          publishDate(formatString: "MMMM Do, YYYY")
          description {
            childMarkdownRemark {
              html
            }
          }
          content {
            childMarkdownRemark {
              html
            }
          }
        }
      }
    }
  }
`
