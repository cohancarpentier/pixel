import React, { Component } from 'react'
import { Link, graphql } from 'gatsby'
import get from 'lodash/get'
import Helmet from 'react-helmet'
import Layout from '../components/layout'
import Fade from 'react-reveal/Fade'
import p from './../images/p.svg'
import serviceStyles from './service.module.scss'

class ServiceTemplate extends Component {
  render() {
    const siteMetadata = get(this, 'props.data.site.siteMetadata')
    const service = get(this.props, 'data.contentfulService')

    return (
      <Layout location={this.props.location} siteMetadata={siteMetadata}>
        <Helmet title={service.title} />
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
                <Link to="/services">
                  <h1 className="has-text-weight-semibold has-text-white">
                    Services
                  </h1>
                </Link>
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
              <source src={service.heroVideo.file.src} type="video/mp4" />
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
                        serviceStyles.mobileTitle
                      } title is-2 has-text-weight-bold has-text-gradient`}
                      style={{
                        lineHeight: 1.25,
                      }}
                      dangerouslySetInnerHTML={{
                        __html: service.title,
                      }}
                    />
                  </div>
                  <div className="column is-9">
                    <p className={`has-text-white`}>
                      {service.heroDescription}
                    </p>
                  </div>
                </div>
              </div>
            </Fade>
          </div>
        </section>

        <section className="has-background-white">
          <div
            className="container"
            style={{ marginTop: '2rem', marginBottom: '2rem' }}
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
      heroDescription
      content {
        childMarkdownRemark {
          html
        }
      }
      heroVideo {
        file {
          url
        }
      }
    }
  }
`
