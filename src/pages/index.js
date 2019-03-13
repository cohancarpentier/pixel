import React, { Component, Fragment } from 'react'
import { graphql } from 'gatsby'
import get from 'lodash/get'
import Helmet from 'react-helmet'
import Layout from '../components/layout'
import p from './../images/p.svg'
import squares from './../images/squares.svg'
import Slider from 'react-slick'
import indexStyles from './index.module.scss'
import Img from 'gatsby-image'
import Fade from 'react-reveal/Fade'
import Slide from 'react-reveal/Slide'
import { FormattedMessage } from 'react-intl'
import LocalizedLink from './../components/LocalizedLink'
import Translater from './../components/Translater'

class RootIndex extends Component {
  state = {
    selectedProjectSlug: '',
    selectedProjectTitle: '',
    projects: null,
    loaded: false,
    progress: 0,
  }

  componentDidMount() {
    let projects = get(this, 'props.data.allContentfulProject.edges')
    projects = projects.filter(
      (thing, index, self) =>
        index === self.findIndex(t => t.node.slug === thing.node.slug)
    )
    this.setState({
      selectedProjectSlug: projects[0].node.slug,
      selectedProjectTitle: projects[0].node.title,
      loaded: true,
    })
  }

  handleProgressChange = newIndex => {
    let projects = get(this, 'props.data.allContentfulProject.edges')
    projects = projects.filter(
      (thing, index, self) =>
        index === self.findIndex(t => t.node.slug === thing.node.slug)
    )
    this.setState({
      progress: (newIndex * 100) / (projects.length - 1),
    })
  }

  handleSlideChange = newIndex => {
    let projects = get(this, 'props.data.allContentfulProject.edges')
    projects = projects.filter(
      (thing, index, self) =>
        index === self.findIndex(t => t.node.slug === thing.node.slug)
    )
    this.setState({
      selectedProjectSlug: projects[newIndex].node.slug,
      selectedProjectTitle: projects[newIndex].node.title,
    })
  }

  handleChange = (oldIndex, newIndex) => {
    this.handleSlideChange(newIndex)
    this.handleProgressChange(newIndex)
  }

  render() {
    const {
      pathContext: { locale },
    } = this.props

    const siteTitle = get(this, 'props.data.site.siteMetadata.title')
    const siteMetadata = get(this, 'props.data.site.siteMetadata')
    let projects = get(this, 'props.data.allContentfulProject.edges')
    projects = projects.filter(
      (thing, index, self) =>
        index === self.findIndex(t => t.node.slug === thing.node.slug)
    )
    let services = get(this, 'props.data.allContentfulService.edges')

    services = services.filter(service => service.node.node_locale === locale)

    const homepage = get(this, 'props.data.allContentfulHomePage.edges')[
      locale === 'fr' ? 0 : 1
    ].node

    const {
      selectedProjectSlug,
      selectedProjectTitle,
      loaded,
      progress,
    } = this.state

    const carouselSettings = {
      dots: false,
      infinite: true,
      speed: 500,
      slidesToShow: 1,
      slidesToScroll: 1,
      beforeChange: this.handleChange,
    }

    return (
      <Layout location={this.props.location} siteMetadata={siteMetadata}>
        <Translater locale={locale}>
          <>
            <Helmet title={siteTitle} />
            <section className="hero is-fullheight">
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
                  <source src={homepage.heroVideo.file.url} type="video/mp4" />
                </video>
              </div>
              <div
                className="hero-body"
                style={{ backgroundColor: 'rgba(0,0,0,0.75)', zIndex: 2 }}
              >
                <Fade right cascade when={loaded}>
                  <div className="container is-fluid">
                    {services.map((el, index) => {
                      return (
                        <LocalizedLink
                          key={index}
                          to={`/services/${el.node.slug}`}
                          className="glitchy"
                          style={{
                            display: 'inline-block',
                            float: 'left',
                            clear: 'both',
                            paddingTop: '0.5rem',
                            paddingBottom: '0.5rem',
                          }}
                        >
                          <h2
                            className={`${[
                              indexStyles.mobileTitle,
                              indexStyles.glitchTitle,
                            ].join(
                              ' '
                            )} title is-1 has-text-weight-bold has-text-white`}
                            style={{
                              fontSize: '4rem',
                              lineHeight: 1.45,
                            }}
                            dangerouslySetInnerHTML={{
                              __html: el.node.title,
                            }}
                          />
                        </LocalizedLink>
                      )
                    })}
                  </div>
                </Fade>
              </div>
            </section>

            <section className="hero has-background-white is-medium">
              <div className="hero-body">
                <div className="container">
                  <div className="columns">
                    <div className="column is-two-thirds">
                      <Fade>
                        <h1
                          className={`${
                            indexStyles.mobileTitle
                          } title is-1 has-text-weight-bold has-text-gradient`}
                          dangerouslySetInnerHTML={{
                            __html: homepage.slogan.childMarkdownRemark.html,
                          }}
                        />
                      </Fade>
                    </div>
                  </div>
                </div>
              </div>
            </section>

            <section
              className={`${indexStyles.mobileHero} hero has-background-black`}
              style={{
                marginLeft: '5.5rem',
                marginRight: '5.5rem',
              }}
            >
              <div className="hero-body">
                <div className="container">
                  <div style={{ display: 'flex', alignItems: 'center' }}>
                    <h2
                      className="has-text-white is-italic"
                      style={{ whiteSpace: 'nowrap' }}
                    >
                      <FormattedMessage id="ourLatestProjects" />
                    </h2>
                    <span
                      style={{
                        display: 'block',
                        backgroundColor: 'rgba(255,255,255,0.2)',
                        marginLeft: '1rem',
                        width: '100%',
                        height: '1px',
                      }}
                    />
                  </div>
                  <div
                    className="columns is-variable is-8"
                    style={{ marginBottom: '4rem' }}
                  >
                    <div
                      className="column is-4"
                      style={{
                        display: 'flex',
                        flexDirection: 'column',
                        justifyContent: 'center',
                      }}
                    >
                      <h2
                        className="title has-text-white is-3 has-text-weight-bold"
                        style={{ marginBottom: '5rem', marginTop: '2rem' }}
                      >
                        {selectedProjectTitle}
                      </h2>
                      <LocalizedLink
                        to={`/projects/${selectedProjectSlug}`}
                        className="btn-gradient"
                        style={{ width: '100%' }}
                      >
                        <span>
                          <FormattedMessage id="discoverProject" />
                        </span>
                      </LocalizedLink>
                    </div>
                    <div
                      className="column is-8"
                      style={{ marginBottom: '-7rem' }}
                    >
                      <Slider {...carouselSettings} style={{ height: '600px' }}>
                        {projects.map(project => {
                          if (
                            project.node.heroImage &&
                            project.node.heroImage.fluid.aspectRatio
                          ) {
                            return (
                              <Img
                                alt={project.node.title}
                                key={project.node.slug}
                                fluid={project.node.heroImage.fluid}
                              />
                            )
                          }
                        })}
                      </Slider>
                    </div>
                  </div>
                  <div className="columns is-variable is-8">
                    <div className="column is-4 has-text-white">
                      <div
                        style={{
                          display: 'flex',
                          justifyContent: 'space-between',
                          alignItems: 'center',
                        }}
                      >
                        <span>01</span>
                        <div
                          style={{
                            display: 'block',
                            width: '100%',
                            height: '6px',
                            backgroundColor: 'white',
                            borderRadius: '6px',
                            marginRight: '1rem',
                            marginLeft: '1rem',
                            position: 'relative',
                          }}
                        >
                          <div
                            style={{
                              display: 'block',
                              width: `${progress}%`,
                              transition: 'width 0.2s ease-in-out',
                              height: '6px',
                              background:
                                'linear-gradient(to left, #d1bbfd, #51c9f6)',
                              borderRadius: '6px',
                              position: 'absolute',
                              left: 0,
                            }}
                          />
                        </div>
                        <span>{projects.length.toString().padStart(2, 0)}</span>
                      </div>
                    </div>
                    <div
                      className="column is-8"
                      style={{ display: 'flex', justifyContent: 'flex-end' }}
                    >
                      <LocalizedLink
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
                        <span className="has-text-white">
                          <FormattedMessage id="seeOurWork" />
                        </span>
                      </LocalizedLink>
                    </div>
                  </div>
                </div>
              </div>
            </section>

            <section className="hero has-background-white is-medium">
              <div className="hero-body">
                <div className="container" style={{ overflow: 'hidden' }}>
                  <Slide bottom cascade>
                    <div className="columns is-variable is-8 is-multiline">
                      {services.map((el, index) => {
                        return (
                          <LocalizedLink
                            to={`/services/${el.node.slug}`}
                            key={index}
                            className={`column is-12-mobile is-one-third has-text-black`}
                          >
                            <div className={indexStyles.service}>
                              <h1 className="title has-text-black is-4 has-text-weight-bold">
                                {el.node.title}
                              </h1>
                              <hr />
                              <div
                                style={{
                                  whiteSpace: 'pre',
                                  marginBottom: index <= 2 ? '4rem' : 0,
                                }}
                                dangerouslySetInnerHTML={{
                                  __html:
                                    el.node.description.childMarkdownRemark
                                      .html,
                                }}
                              />
                            </div>
                          </LocalizedLink>
                        )
                      })}
                    </div>
                  </Slide>
                </div>
              </div>
            </section>

            <section
              className={`${indexStyles.mobileHero} hero is-medium gradient`}
              style={{
                position: 'relative',
                marginBottom: '5.5rem',
                marginLeft: '5.5rem',
                marginRight: '5.5rem',
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
                    <div className="columns" style={{ marginBottom: '4rem' }}>
                      <div className="column is-two-thirds">
                        <h2
                          className={`${
                            indexStyles.mobileTitle
                          } title has-text-white is-1 has-text-weight-bold`}
                        >
                          {homepage.promo.title}
                        </h2>
                      </div>
                    </div>
                    <div className={`${indexStyles.levelBlock} level`}>
                      <div className="level-left">
                        <h3
                          className="title has-text-black is-4 has-text-weight-bold"
                          dangerouslySetInnerHTML={{
                            __html:
                              homepage.promo.subtitle.childMarkdownRemark.html,
                          }}
                        />
                      </div>
                      <div className="level-right">
                        <LocalizedLink
                          to={`/contact`}
                          className={indexStyles.button}
                        >
                          <span className="has-text-black">
                            <FormattedMessage id="mandateUs" />
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
    allContentfulService(sort: { fields: [title], order: ASC }) {
      edges {
        node {
          node_locale
          title
          slug
          description {
            childMarkdownRemark {
              html
            }
          }
        }
      }
    }
    allContentfulHomePage {
      edges {
        node {
          node_locale
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
          heroImage {
            fluid(maxHeight: 460) {
              ...GatsbyContentfulFluid_withWebp
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
