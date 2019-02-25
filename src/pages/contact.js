import React from 'react'
import { graphql } from 'gatsby'
import get from 'lodash/get'
import Helmet from 'react-helmet'
import Layout from '../components/layout'
import contactStyles from './contact.module.scss'
import Slide from 'react-reveal/Slide'

class ContactIndex extends React.Component {
  state = {
    moreInfoOpened: false,
  }

  render() {
    const siteTitle = get(this, 'props.data.site.siteMetadata.title')
    const siteMetadata = get(this, 'props.data.site.siteMetadata')
    const contactPage = get(
      this,
      'props.data.allContentfulContactPage.edges'
    )[0].node
    const { moreInfoOpened } = this.state

    return (
      <Layout location={this.props.location} siteMetadata={siteMetadata}>
        <Helmet title={siteTitle} />
        <div
          className="has-background-black"
          style={{ paddingTop: '8rem', position: 'relative', zIndex: 2 }}
        >
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
                <h1 className="has-text-weight-semibold">Contact</h1>
              </div>
              <div className="level-right">
                {' '}
                <a
                  onClick={() =>
                    this.setState({
                      moreInfoOpened: !moreInfoOpened,
                    })
                  }
                  className="has-text-white"
                  style={{ display: 'flex', alignItems: 'center' }}
                >
                  <span
                    className="title is-3 has-text-white"
                    style={{ fontWeight: 100, marginRight: '1rem' }}
                  >
                    +
                  </span>
                  Plus d'informations
                </a>
              </div>
            </div>
          </div>
        </div>
        <Slide top collapse when={moreInfoOpened} style={{ zIndex: 1 }}>
          <div className="has-background-black">
            <div
              className="container is-fluid"
              style={{ marginLeft: '5.5rem', marginRight: '5.5rem' }}
            >
              <hr
                style={{ backgroundColor: 'rgba(255,255,255,0.2', margin: 0 }}
              />
              <div
                className="columns has-text-white has-text-weight-semibold"
                style={{ paddingTop: '4rem', paddingBottom: '6rem' }}
              >
                <div className="column is-7">dsfgsdfg</div>
                <div className="column is-3 is-offset-2">
                  <h2 className="has-text-weight-bold">Client</h2>
                  <p>sdfgsdfg</p>
                  <hr style={{ backgroundColor: 'rgba(255,255,255,0.2)' }} />
                </div>
              </div>
            </div>
          </div>
        </Slide>
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
              <source src={contactPage.heroVideo.file.url} type="video/webm" />
            </video>
          </div>
          <div
            className="hero-body"
            style={{ backgroundColor: 'rgba(0,0,0,0.75)' }}
          >
            <div className="container">
              <div
                style={{ marginTop: '6rem' }}
                className="columns is-multiline"
              >
                <div className="column is-9">asdfasdf</div>
              </div>
            </div>
          </div>
        </section>
      </Layout>
    )
  }
}

export default ContactIndex

export const pageQuery = graphql`
  query ContactIndexQuery {
    site {
      siteMetadata {
        title
        phoneNumber
        phoneNumberPretty
        address
      }
    }
    allContentfulContactPage {
      edges {
        node {
          title
          heroVideo {
            file {
              url
            }
          }
        }
      }
    }
  }
`
