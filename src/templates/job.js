import React, { Component } from 'react'
import { Link, graphql } from 'gatsby'
import get from 'lodash/get'
import Helmet from 'react-helmet'
import Layout from '../components/layout'
import Fade from 'react-reveal/Fade'
import jobStyles from './job.module.scss'
import p from './../images/p.svg'

class JobTemplate extends Component {
  render() {
    const siteTitle = get(this, 'props.data.site.siteMetadata.title')
    const siteMetadata = get(this, 'props.data.site.siteMetadata')
    const job = get(this.props, 'data.contentfulJob')

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
                <h1 className="has-text-weight-semibold">Jobs</h1>
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
                        jobStyles.mobileTitle
                      } title is-2 has-text-weight-bold has-text-gradient`}
                      style={{
                        lineHeight: 1.25,
                      }}
                      dangerouslySetInnerHTML={{
                        __html: job.title,
                      }}
                    />
                  </div>
                  <div className="column is-9">
                    <p
                      className={`has-text-white`}
                      dangerouslySetInnerHTML={{
                        __html: job.description.childMarkdownRemark.html,
                      }}
                    />
                  </div>
                </div>
              </div>
            </Fade>
          </div>
        </section>

        <section>
          <div className="container">
            <div className="columns">
              <div
                className="column"
                style={{ marginTop: '4rem', marginBottom: '4rem' }}
                dangerouslySetInnerHTML={{
                  __html: job.content.childMarkdownRemark.html,
                }}
              />
            </div>
          </div>
        </section>

        <section
          className={`${jobStyles.mobileHero} hero gradient`}
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
                        jobStyles.mobileTitle
                      } title has-text-white is-1 has-text-weight-bold`}
                    >
                      Tu crois avoir ces compétences?
                    </h2>
                  </div>
                </div>
                <div className={`${jobStyles.levelBlock} level`}>
                  <div className="level-left">
                    <h3 className="title has-text-black is-4 has-text-weight-bold">
                      Envoies-nous ton cv!
                    </h3>
                  </div>
                  <div className="level-right">
                    <Link to={`/mandate-us`} className={jobStyles.button}>
                      <span className="has-text-black">
                        Appliquer dès maintenant
                      </span>
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

export default JobTemplate

export const pageQuery = graphql`
  query JobBySlug($slug: String!) {
    site {
      siteMetadata {
        title
        phoneNumber
        phoneNumberPretty
        address
      }
    }
    contentfulJob(slug: { eq: $slug }) {
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
    }
  }
`
