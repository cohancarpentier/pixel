import React, { Component } from 'react'
import { Link, graphql } from 'gatsby'
import get from 'lodash/get'
import Helmet from 'react-helmet'
import Layout from '../components/layout'
import { VideoHeader } from '../components/video-header'
import p from './../images/p.svg'
import serviceStyles from './service.module.scss'

class ServiceTemplate extends Component {
  render() {
    const siteMetadata = get(this, 'props.data.site.siteMetadata')
    const service = get(this.props, 'data.contentfulService')

    return (
      <Layout location={this.props.location} siteMetadata={siteMetadata}>
        <Helmet title={service.title} />

        <VideoHeader
          title={service.title}
          heroImage={service.heroImage ? service.heroImage.fluid.src : null}
          heroVideo={service.heroVideo ? service.heroVideo.file.url : null}
          heroTitle={service.heroTitle}
          heroDescription={service.heroDescription.childMarkdownRemark.html}
        />

        <section className="has-background-white">
          <div
            className="container"
            style={{ marginTop: '4rem', marginBottom: '4rem' }}
          >
            <div
              className="content"
              dangerouslySetInnerHTML={{
                __html: service.content.childMarkdownRemark.html,
              }}
            />
          </div>
        </section>

        <section
          className="has-background-black"
          style={{ marginLeft: '5.5rem', marginRight: '5.5rem' }}
        >
          <div
            className="container has-text-white"
            style={{ marginTop: '2rem', marginBottom: '2rem' }}
          >
            <div className="columns">
              <div className="column is-half">
                <div
                  className="content"
                  dangerouslySetInnerHTML={{
                    __html: service.content.childMarkdownRemark.html,
                  }}
                />
              </div>
              <div className="column is-half">
                <div
                  className="content"
                  dangerouslySetInnerHTML={{
                    __html: service.content.childMarkdownRemark.html,
                  }}
                />
              </div>
            </div>
          </div>
        </section>

        <section className="has-background-white">
          <div
            className="container"
            style={{ marginTop: '4rem', marginBottom: '3rem' }}
          >
            <div
              className="content"
              dangerouslySetInnerHTML={{
                __html: service.content.childMarkdownRemark.html,
              }}
            />
          </div>
        </section>

        <section
          className={`${serviceStyles.mobileHero} hero gradient`}
          style={{
            marginBottom: '5.5rem',
            marginLeft: '5.5rem',
            marginRight: '5.5rem',
            paddingTop: '2rem',
            paddingBottom: '2rem',
          }}
        >
          <div
            style={{
              backgroundImage: `url(${p})`,
              backgroundSize: '300px',
              backgroundPosition: 'bottom right',
              backgroundRepeat: 'no-repeat',
              margin: '-1px',
            }}
          >
            <div className="hero-body">
              <div className="container">
                <div className="columns" style={{ marginBottom: '2rem' }}>
                  <div className="column is-two-thirds">
                    <h2
                      className={`${
                        serviceStyles.mobileTitle
                      } title has-text-white is-1 has-text-weight-bold`}
                    >
                      Tagline dsflkas dfkaslf k
                    </h2>
                  </div>
                </div>
                <div className={`${serviceStyles.levelBlock} level`}>
                  <div className="level-left">
                    <h3 className="title has-text-black is-4 has-text-weight-bold">
                      sdfhas dfkjhsafk jahsjdkfh
                    </h3>
                  </div>
                  <div className="level-right">
                    <Link to={`/contact`} className={serviceStyles.button}>
                      <span className="has-text-black">Contactez-nous</span>
                    </Link>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
      </Layout>
    )
  }
}

export default ServiceTemplate

export const pageQuery = graphql`
  query ServiceBySlug($slug: String!) {
    site {
      siteMetadata {
        title
        phoneNumber
        phoneNumberPretty
        address
      }
    }
    contentfulService(slug: { eq: $slug }) {
      title
      slug
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
`
