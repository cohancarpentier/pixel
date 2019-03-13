import React, { Component } from 'react'
import { Link, graphql } from 'gatsby'
import get from 'lodash/get'
import Helmet from 'react-helmet'
import Layout from '../components/layout'
import { VideoHeader } from '../components/video-header'
import jobStyles from './job.module.scss'
import p from './../images/p.svg'
import LocalizedLink from '../components/LocalizedLink'
import Translater from '../components/Translater'

class JobTemplate extends Component {
  render() {
    const {
      pathContext: { locale },
    } = this.props
    const siteTitle = get(this, 'props.data.site.siteMetadata.title')
    const siteMetadata = get(this, 'props.data.site.siteMetadata')
    const job = get(this.props, 'data.contentfulJob')

    return (
      <Layout location={this.props.location} siteMetadata={siteMetadata}>
        <Translater locale={locale}>
          <>
            <Helmet title={siteTitle} />
            <VideoHeader
              title={job.title}
              heroImage={job.heroImage ? job.heroImage.fluid.src : null}
              heroVideo={job.heroVideo ? job.heroVideo.file.url : null}
              heroTitle={job.heroTitle}
              heroDescription={job.heroDescription.childMarkdownRemark.html}
            />

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
                        <LocalizedLink
                          to={`/contact`}
                          className={jobStyles.button}
                        >
                          <span className="has-text-black">
                            Appliquer dès maintenant
                          </span>
                        </LocalizedLink>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </section>
          </>
        </Translater>
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
