import React, { Component } from 'react'
import { Link, graphql } from 'gatsby'
import Img from 'gatsby-image'
import get from 'lodash/get'
import Helmet from 'react-helmet'
import Layout from '../components/layout'
import Fade from 'react-reveal/Fade'

class ServicesIndex extends Component {
  state = {
    loaded: false,
  }

  componentDidMount() {
    this.setState({
      loaded: true,
    })
  }

  render() {
    const siteTitle = get(this, 'props.data.site.siteMetadata.title')
    let services = get(this, 'props.data.allContentfulService.edges')
    services = services.filter(
      (thing, index, self) =>
        index === self.findIndex(t => t.node.slug === thing.node.slug)
    )
    const siteMetadata = get(this, 'props.data.site.siteMetadata')
    const servicesPage = get(
      this,
      'props.data.allContentfulServicesPage.edges'
    )[0].node
    const { loaded } = this.state

    return (
      <Layout location={this.props.location} siteMetadata={siteMetadata}>
        <Helmet title={siteTitle} />
        <div className="has-background-black" style={{ paddingTop: '8rem' }}>
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
                  {servicesPage.title}
                </h1>
              </div>
            </div>

            <section style={{ position: 'relative' }}>
              <div
                className="gradient"
                style={{
                  position: 'absolute',
                  top: 0,
                  left: 0,
                  right: 0,
                  bottom: 0,
                  zIndex: 2,
                  opacity: 0.8,
                }}
              />
              <Img
                alt=""
                fluid={servicesPage.heroImage.fluid}
                style={{
                  position: 'absolute',
                  top: 0,
                  width: '100%',
                  right: 0,
                  bottom: 0,
                  zIndex: 1,
                }}
              />
              <div
                className="hero"
                style={{
                  paddingBottom: '2rem',
                  paddingTop: '2rem',
                  position: 'relative',
                  zIndex: 3,
                }}
              >
                <div className="hero-body">
                  <div className="container">
                    <Fade right cascade when={loaded}>
                      <div>
                        {services.map((service, index) => {
                          return (
                            <Link
                              to={`/services/${service.node.slug}`}
                              style={{
                                paddingTop: '1rem',
                                paddingBottom: '1rem',
                                display: 'block',
                              }}
                            >
                              <h2
                                key={index}
                                className="has-text-white title is-1 has-text-weight-bold"
                              >
                                {service.node.title}
                              </h2>
                            </Link>
                          )
                        })}
                      </div>
                    </Fade>
                  </div>
                </div>
              </div>
            </section>
          </div>
        </div>
      </Layout>
    )
  }
}

export default ServicesIndex

export const pageQuery = graphql`
  query ServicesIndexQuery {
    site {
      siteMetadata {
        title
        phoneNumber
        phoneNumberPretty
        address
      }
    }
    allContentfulServicesPage(sort: { fields: [title], order: DESC }) {
      edges {
        node {
          title
          heroImage {
            fluid {
              ...GatsbyContentfulFluid_withWebp
            }
          }
        }
      }
    }
    allContentfulService {
      edges {
        node {
          title
          slug
        }
      }
    }
  }
`
