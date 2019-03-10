import React, { Component } from 'react'
import { graphql } from 'gatsby'
import get from 'lodash/get'
import Helmet from 'react-helmet'
import Fade from 'react-reveal/Fade'
import Layout from '../components/layout'
import prizesAndMentionsStyles from './prizes-and-mentions.module.scss'
import { VideoHeader } from '../components/video-header'

class PrizesAndMentionsIndex extends Component {
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
        <VideoHeader
          title={prizesAndMentionsPage.title}
          heroImage={prizesAndMentionsPage.heroImage.fluid.src}
          heroVideo={prizesAndMentionsPage.heroVideo.file.url}
          heroTitle={prizesAndMentionsPage.heroTitle}
          heroDescription={
            prizesAndMentionsPage.heroDescription.childMarkdownRemark.html
          }
        />

        <section className="has-background-white">
          <div className="container">
            <div
              className="columns is-multiline is-variable is-8"
              style={{ marginTop: '2.5rem', marginBottom: '6rem' }}
            >
              {prizes.map((prize, index) => {
                return (
                  <Fade bottom>
                    <div
                      key={index}
                      className={`column is-half`}
                      style={{ marginBottom: '4rem', position: 'relative' }}
                    >
                      <div
                        className="to-reveal delay-0-8"
                        style={{ position: 'relative', zIndex: 1 }}
                      >
                        <div className={`${prizesAndMentionsStyles.fakeJob}`}>
                          <div
                            className="has-background-black"
                            style={{
                              position: 'relative',
                              visibility: 'hidden',
                            }}
                          >
                            <div
                              className="level"
                              style={{
                                position: 'relative',
                                padding: '3rem 4rem',
                              }}
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
                      <div
                        style={{
                          backgroundColor: '#222222',
                          position: 'absolute',
                          left: '4rem',
                          top: '3rem',
                          right: '0rem',
                          zIndex: 2,
                        }}
                      >
                        <div
                          className="level"
                          style={{
                            padding: '3rem 4rem',
                          }}
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
