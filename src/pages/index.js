import React from 'react'
import { Link, graphql } from 'gatsby'
import get from 'lodash/get'
import Helmet from 'react-helmet'
import Layout from '../components/layout'
import Footer from '../components/footer'
import { Navigation } from '../components/navigation'

class RootIndex extends React.Component {
  render() {
    const siteTitle = get(this, 'props.data.site.siteMetadata.title')
    const siteMetadata = get(this, 'props.data.site.siteMetadata')
    const projects = get(this, 'props.data.allContentfulProject.edges')
    const homepage = get(this, 'props.data.allContentfulHomePage.edges')[0].node

    console.log(homepage)

    return (
      <Layout location={this.props.location} siteMetadata={siteMetadata}>
        <Helmet title={siteTitle} />
        <section className="hero is-fullheight">
          <div
            className="hero-video"
            style={{
              height: '100%',
              width: '100%',
              background: 'url(../img/index-image.jpg) no-repeat center center',
              backgroundSize: 'cover',
            }}
          >
            <video
              poster="img/bgimg.jpg"
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
                background:
                  'url(../img/index-image.jpg) no-repeat center center',
                backgroundSize: 'cover',
                overflow: 'hidden',
              }}
            >
              <source src={homepage.heroVideo.file.url} type="video/webm" />
            </video>
          </div>
          <div className="hero-body">
            <div className="container is-fluid">
              <h1
                className="title is-1 has-text-weight-bold has-text-white"
                style={{ whiteSpace: 'pre' }}
                dangerouslySetInnerHTML={{
                  __html: homepage.hero.childMarkdownRemark.html,
                }}
              />
            </div>
          </div>
        </section>

        <section className="hero has-background-white is-medium">
          <div className="hero-body">
            <div className="container">
              <div className="columns">
                <div className="column is-two-thirds">
                  <h1
                    className="title has-text-primary is-1 has-text-weight-bold"
                    dangerouslySetInnerHTML={{
                      __html: homepage.slogan.childMarkdownRemark.html,
                    }}
                  />
                </div>
              </div>
            </div>
          </div>
        </section>

        <section className="hero has-background-white is-medium">
          <div className="hero-body">
            <div className="container">
              <div className="columns is-variable is-8 is-multiline">
                {homepage.services.map((node, index) => {
                  return (
                    <div key={index} className="column is-one-third">
                      <h1 className="title has-text-black is-4 has-text-weight-bold">
                        {node.title}
                      </h1>
                      <hr />
                      <div
                        style={{ whiteSpace: 'pre', marginBottom: '4rem' }}
                        dangerouslySetInnerHTML={{
                          __html: node.description.childMarkdownRemark.html,
                        }}
                      />
                    </div>
                  )
                })}
              </div>
            </div>
          </div>
        </section>

        <section
          className="hero is-medium has-background-primary "
          style={{
            marginBottom: '4rem',
            marginLeft: '4rem',
            marginRight: '4rem',
          }}
        >
          <div className="hero-body">
            <div className="container">
              <div className="columns" style={{ marginBottom: '4rem' }}>
                <div className="column is-two-thirds">
                  <h2 className="title has-text-white is-1 has-text-weight-bold">
                    {homepage.promo.title}
                  </h2>
                </div>
              </div>
              <div className="level">
                <div className="level-left">
                  <h3
                    className="title has-text-black is-4 has-text-weight-bold"
                    dangerouslySetInnerHTML={{
                      __html: homepage.promo.subtitle.childMarkdownRemark.html,
                    }}
                  />
                </div>
                <div className="level-right">
                  <Link to={`/`}>
                    <span>Mandatez-nous</span>
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </section>
      </Layout>
    )
  }
}

export default RootIndex

export const pageQuery = graphql`
  query HomeQuery {
    site {
      siteMetadata {
        title
        phoneNumber
        phoneNumberPretty
        address
      }
    }
    allContentfulHomePage {
      edges {
        node {
          hero {
            childMarkdownRemark {
              html
            }
          }
          heroVideo {
            file {
              url
            }
          }
          slogan {
            childMarkdownRemark {
              html
            }
          }
          promo {
            title
            subtitle {
              childMarkdownRemark {
                html
              }
            }
          }
          services {
            title
            description {
              childMarkdownRemark {
                html
              }
            }
          }
        }
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
