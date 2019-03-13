import React, { Component } from 'react'
import { graphql, Link } from 'gatsby'
import get from 'lodash/get'
import Helmet from 'react-helmet'
import Layout from '../components/layout'
import teamStyles from './team.module.scss'
import p from './../images/p-colored.svg'
import Img from 'gatsby-image'
import Fade from 'react-reveal/Fade'

class TeamIndex extends Component {
  render() {
    const siteTitle = get(this, 'props.data.site.siteMetadata.title')
    const siteMetadata = get(this, 'props.data.site.siteMetadata')
    const agency = get(this, 'props.data.allContentfulAgencyPage.edges')[0].node

    console.log(agency)

    return (
      <Layout location={this.props.location} siteMetadata={siteMetadata}>
        <Helmet title={siteTitle} />
        <section className="hero is-fullheight has-background-black">
          <div
            className="hero-video"
            style={{
              height: '100%',
              width: '100%',
              //background: 'url(../img/index-image.jpg) no-repeat center center',
              backgroundSize: 'cover',
            }}
          >
            <video
              //poster="img/bgimg.jpg"
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
                /*background:
                  'url(../img/index-image.jpg) no-repeat center center',*/
                backgroundSize: 'cover',
                overflow: 'hidden',
              }}
            >
              <source src={agency.heroVideo.file.url} type="video/mp4" />
            </video>
          </div>
          <div style={{ backgroundColor: 'rgba(0,0,0,0.75)', zIndex: 2 }}>
            <div
              className="container is-fluid"
              style={{
                paddingTop: '8rem',
              }}
            >
              <hr
                style={{ backgroundColor: 'rgba(255,255,255,0.2', margin: 0 }}
              />
              <div
                className="level has-text-white has-text-weight-semibold"
                style={{ paddingTop: '2rem' }}
              >
                <div className="level-left">
                  <h1 className="has-text-weight-semibold">{agency.title}</h1>
                </div>
                <div className="level-right" />
              </div>
            </div>

            <div
              className="hero-body"
              style={{
                paddingTop: '7rem',
                paddingBottom: '12rem',
              }}
            >
              <div className="container">
                <div className="columns">
                  <div className="column is-half">
                    <h1 className="title is-1 has-text-weight-bold has-text-gradient">
                      {agency.heroTitle}
                    </h1>
                  </div>
                </div>
                <div
                  className="has-text-white"
                  dangerouslySetInnerHTML={{
                    __html: agency.heroDescription.childMarkdownRemark.html,
                  }}
                />
                <div
                  className="columns is-multiline"
                  style={{ position: 'relative' }}
                >
                  <div className="column is-10">
                    <div
                      className={`${teamStyles.fakeVideo} to-reveal delay-0-8`}
                      style={{ position: 'relative', zIndex: 1 }}
                    />
                  </div>
                  <div
                    className="column is-10 is-offset-2"
                    style={{
                      position: 'absolute',
                      top: '6.5rem',
                      zIndex: 2,
                    }}
                  >
                    <div
                      style={{
                        height: '100%',
                        width: '100%',
                        //background: 'url(../img/index-image.jpg) no-repeat center center',
                        backgroundSize: 'cover',
                      }}
                    >
                      <video
                        //poster="img/bgimg.jpg"
                        playsInline
                        //autoPlay
                        muted
                        controls
                        //loop
                        style={{
                          height: '100%',
                          width: '100%',
                          objectFit: 'cover',
                          zIndex: '-100',
                          right: 0,
                          bottom: 0,
                          backgroundSize: 'cover',
                          overflow: 'hidden',
                        }}
                      >
                        <source
                          src={agency.agencyVideo.file.url}
                          type="video/webm"
                        />
                      </video>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        <section className="hero has-background-white is-medium">
          <div
            className="hero-body"
            style={{ paddingTop: '14rem', paddingBottom: '14rem' }}
          >
            <div className="container">
              <div className="columns">
                <div className="column is-half">
                  <h1 className="title is-5 has-text-weight-bold has-text-black">
                    {agency.contentTitle}
                  </h1>
                  <div
                    dangerouslySetInnerHTML={{
                      __html:
                        agency.contentDescription.childMarkdownRemark.html,
                    }}
                  />
                </div>
                <div className="column is-half">
                  <img
                    src={p}
                    alt="P"
                    width={260}
                    style={{
                      position: 'absolute',
                      top: '-7rem',
                      right: '-9rem',
                      zIndex: 1,
                    }}
                  />
                </div>
              </div>
            </div>
          </div>
        </section>

        <section
          className="hero has-background-black"
          style={{
            marginLeft: '4rem',
            marginRight: '4rem',
            marginBottom: '4rem',
          }}
        >
          <div className="hero-body">
            <div className="container">
              <div
                className="columns is-multiline is-variable is-2"
                style={{
                  position: 'relative',
                  top: '-6rem',
                  marginBottom: '-4rem',
                }}
              >
                {agency.employees.map((employee, index) => {
                  return (
                    <div
                      key={index}
                      className="column is-half"
                      style={{ marginBottom: '4rem' }}
                    >
                      <Fade>
                        <Img alt="" fluid={employee.photo.fluid} />
                      </Fade>
                      <h2
                        className="has-text-gradient title is-5"
                        style={{
                          display: 'inline-block',
                          margin: 0,
                          marginTop: '1rem',
                        }}
                      >
                        {employee.name}
                      </h2>
                      <p className="has-text-white is-italic">
                        {employee.role}
                      </p>
                    </div>
                  )
                })}
              </div>
            </div>
          </div>
        </section>
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
    allContentfulAgencyPage {
      edges {
        node {
          title
          heroTitle
          heroDescription {
            childMarkdownRemark {
              html
            }
          }
          heroVideo {
            file {
              url
            }
          }
          agencyVideo {
            file {
              url
            }
          }
          contentTitle
          contentDescription {
            childMarkdownRemark {
              html
            }
          }
          employees {
            name
            role
            photo {
              fluid(maxHeight: 460, quality: 100) {
                ...GatsbyContentfulFluid_withWebp
              }
            }
          }
        }
      }
    }
  }
`
