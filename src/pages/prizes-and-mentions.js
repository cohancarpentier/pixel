import React from 'react'
import { Link, graphql } from 'gatsby'
import get from 'lodash/get'
import Helmet from 'react-helmet'
import Layout from '../components/layout'
import Fade from 'react-reveal/Fade'
import prizesAndMentionsStyles from './prizes-and-mentions.module.scss'

class PrizesAndMentionsIndex extends React.Component {
  render() {
    const siteTitle = get(this, 'props.data.site.siteMetadata.title')
    const siteMetadata = get(this, 'props.data.site.siteMetadata')
    const prizes = get(this, 'props.data.allContentfulPrize.edges')
    const prizesAndMentionsPage = get(
      this,
      'props.data.allContentfulPrizesAndMentionsPage.edges'
    )[0].node

    return (
      <Layout location={this.props.location} siteMetadata={siteMetadata}>
        <Helmet title={siteTitle} />
        <div style={{ paddingTop: '8rem' }}>
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
                <h1 className="has-text-weight-semibold">
                  {prizesAndMentionsPage.title}
                </h1>
              </div>
            </div>
          </div>
        </div>
        <section className="hero is-medium" style={{ marginTop: '-14.35rem' }}>
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
                zIndex: '-100',
                right: 0,
                bottom: 0,
                /*background:
                  'url(../img/index-image.jpg) no-repeat center center',*/
                backgroundSize: 'cover',
                overflow: 'hidden',
              }}
            >
              <source src={''} type="video/webm" />
            </video>
          </div>
          <div
            className="hero-body"
            style={{ backgroundColor: 'rgba(0,0,0,0.75)' }}
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
                        prizesAndMentionsStyles.mobileTitle
                      } title is-2 has-text-weight-bold has-text-gradient`}
                      style={{
                        lineHeight: 1.25,
                      }}
                      dangerouslySetInnerHTML={{
                        __html: prizesAndMentionsPage.heroTitle,
                      }}
                    />
                  </div>
                  <div className="column is-9">
                    <p
                      className={`has-text-white`}
                      dangerouslySetInnerHTML={{
                        __html:
                          prizesAndMentionsPage.heroDescription
                            .childMarkdownRemark.html,
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
              className="columns is-multiline is-variable is-8"
              style={{ marginTop: '2.5rem', marginBottom: '6rem' }}
            >
              {prizes.map((prize, index) => {
                return (
                  <div
                    key={index}
                    className={`column is-half`}
                    style={{ marginBottom: '6rem' }}
                  >
                    <div className={`${prizesAndMentionsStyles.fakeJob}`}>
                      <div
                        className="has-background-black"
                        style={{
                          position: 'relative',
                          left: '2rem',
                          top: '2rem',
                        }}
                      >
                        <div
                          className="level"
                          style={{ position: 'relative', padding: '3rem 4rem' }}
                        >
                          <div
                            style={{
                              display: 'flex',
                              flexDirection: 'column',
                              alignItems: 'flex-start',
                            }}
                          >
                            <p
                              className={`${
                                prizesAndMentionsStyles.year
                              } has-text-white is-italic`}
                            >
                              {prize.node.year}
                            </p>
                            <h2
                              style={{ marginTop: '1rem' }}
                              className="title is-4 has-text-white has-text-weight-bold"
                            >
                              {prize.node.title}
                            </h2>
                            <p className="has-text-white is-italic">
                              {prize.node.description}
                            </p>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                )
              })}
            </div>
          </div>
        </section>
      </Layout>
    )
  }
}

export default PrizesAndMentionsIndex

export const pageQuery = graphql`
  query PrizesAndMentionsQuery {
    site {
      siteMetadata {
        title
        phoneNumber
        phoneNumberPretty
        address
      }
    }
    allContentfulPrizesAndMentionsPage {
      edges {
        node {
          title
          heroTitle
          heroDescription {
            childMarkdownRemark {
              html
            }
          }
        }
      }
    }
    allContentfulPrize {
      edges {
        node {
          title
          year
          description
        }
      }
    }
  }
`
