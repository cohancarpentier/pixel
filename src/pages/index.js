import React from 'react'
import { Link, graphql } from 'gatsby'
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

class RootIndex extends React.Component {
  state = {
    selectedProjectSlug: '',
    selectedProjectTitle: '',
    projects: null,
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
    })
  }

  handleSlideChange = (oldIndex, newIndex) => {
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

  render() {
    const siteTitle = get(this, 'props.data.site.siteMetadata.title')
    const siteMetadata = get(this, 'props.data.site.siteMetadata')
    let projects = get(this, 'props.data.allContentfulProject.edges')
    projects = projects.filter(
      (thing, index, self) =>
        index === self.findIndex(t => t.node.slug === thing.node.slug)
    )
    const homepage = get(this, 'props.data.allContentfulHomePage.edges')[0].node
    const { selectedProjectSlug, selectedProjectTitle } = this.state

    const carouselSettings = {
      dots: false,
      infinite: true,
      speed: 500,
      slidesToShow: 1,
      slidesToScroll: 1,
      beforeChange: this.handleSlideChange,
    }

    return (
      <Layout location={this.props.location} siteMetadata={siteMetadata}>
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
                zIndex: '-100',
                right: 0,
                bottom: 0,
                /*background:
                  'url(../img/index-image.jpg) no-repeat center center',*/
                backgroundSize: 'cover',
                overflow: 'hidden',
              }}
            >
              <source src={homepage.heroVideo.file.url} type="video/webm" />
            </video>
          </div>
          <div className="hero-body">
            <Fade right cascade>
              <div className="container is-fluid">
                {homepage.hero.childMarkdownRemark.html
                  .replace(/(<p[^>]+?>|<p>|<\/p>)/gim, '')
                  .split('\n')
                  .map((el, index) => {
                    return (
                      <h2
                        key={index}
                        className={`${
                          indexStyles.mobileTitle
                        } title is-1 has-text-weight-bold has-text-white`}
                        style={{
                          fontSize: '4.5rem',
                          lineHeight: 1.45,
                        }}
                        dangerouslySetInnerHTML={{
                          __html: el,
                        }}
                      />
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
            marginLeft: '4rem',
            marginRight: '4rem',
          }}
        >
          <div className="hero-body">
            <div className="container">
              <div className="columns" style={{ marginBottom: '4rem' }}>
                <div className="column is-two-fifths">
                  <h2
                    className="title has-text-white is-3 has-text-weight-bold"
                    style={{ marginBottom: '5rem' }}
                  >
                    {selectedProjectTitle}
                  </h2>
                  <Link
                    to={`/projects/${selectedProjectSlug}`}
                    style={{ marginRight: '0.5rem' }}
                    className={indexStyles.gradientButton}
                  >
                    <span
                      style={{
                        display: 'flex',
                        justifyContent: 'center',
                        alignItems: 'center',
                        padding: '0.55rem 3rem',
                      }}
                      className="has-background-black has-text-white"
                    >
                      Découvrir le projet
                    </span>
                  </Link>
                </div>
                <div
                  className="column is-three-fifths"
                  style={{ marginBottom: '-5rem' }}
                >
                  <Slider {...carouselSettings} style={{ height: '600px' }}>
                    {projects.map(project => {
                      if (project.node.heroImage.fluid.aspectRatio) {
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
              <div className={`${indexStyles.levelBlock} level`}>
                <div className="level-left has-text-white">
                  <span>01</span>
                  <span>{projects.length.toString().padStart(2, 0)}</span>
                </div>
                <div className="level-right">
                  <Link
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
                      Voir nos réalisations
                    </span>
                  </Link>
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
                  {homepage.services.map((node, index) => {
                    return (
                      <div
                        key={index}
                        className="column is-12-mobile is-one-third"
                      >
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
              </Slide>
            </div>
          </div>
        </section>

        <section
          className={`${indexStyles.mobileHero} hero is-medium gradient`}
          style={{
            marginBottom: '4rem',
            marginLeft: '4rem',
            marginRight: '4rem',
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
                    <Link to={`/`} className={indexStyles.button}>
                      <span className="has-text-black">Mandatez-nous</span>
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
          heroImage {
            fluid(maxWidth: 350, maxHeight: 196, resizingBehavior: SCALE) {
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
