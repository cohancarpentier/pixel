import React from 'react'
import { graphql } from 'gatsby'
import get from 'lodash/get'
import Helmet from 'react-helmet'
import Layout from '../components/layout'
import contactStyles from './contact.module.scss'
import Slide from 'react-reveal/Slide'
import instagram from './../images/instagram.svg'
import facebook from './../images/facebook.svg'
import linkedin from './../images/linkedin.svg'
import { Map, InfoWindow, Marker, GoogleApiWrapper } from 'google-maps-react'

class ContactIndex extends React.Component {
  state = {
    moreInfoOpened: false,
    currentStep: null,
  }

  componentDidMount() {
    this.setState({
      currentStep: 0,
    })
    document.body.style.backgroundColor = 'black'
  }

  componentWillUnmount() {
    document.body.style.backgroundColor = 'white'
  }

  handleProgressChange() {
    this.setState({
      currentStep: this.state.currentStep + 1,
      progress: ((this.state.currentStep + 1) * 100) / 5,
    })
  }

  render() {
    const siteTitle = get(this, 'props.data.site.siteMetadata.title')
    const siteMetadata = get(this, 'props.data.site.siteMetadata')
    const contactPage = get(
      this,
      'props.data.allContentfulContactPage.edges'
    )[0].node
    const { moreInfoOpened, currentStep, progress } = this.state

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
                    {moreInfoOpened ? '-' : '+'}
                  </span>
                  {moreInfoOpened ? 'Moins' : 'Plus'} d'informations
                </a>
              </div>
            </div>
          </div>
        </div>
        <Slide
          top
          collapse
          when={moreInfoOpened}
          className="has-background-black"
          style={{ zIndex: 1 }}
        >
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
                <div className="column is-7" style={{ position: 'relative' }}>
                  <Map google={this.props.google} zoom={14}>
                    <Marker name={'Current location'} />

                    <InfoWindow>
                      <div>
                        <h1>aaaa</h1>
                      </div>
                    </InfoWindow>
                  </Map>
                </div>
                <div className="column is-3 is-offset-2">
                  <p
                    dangerouslySetInnerHTML={{ __html: siteMetadata.address }}
                  />
                  <hr style={{ backgroundColor: 'rgba(255,255,255,0.2)' }} />
                  <a
                    className="has-text-white"
                    href={`mailto:${siteMetadata.email}`}
                    dangerouslySetInnerHTML={{ __html: siteMetadata.email }}
                  />
                  <hr style={{ backgroundColor: 'rgba(255,255,255,0.2)' }} />
                  <a
                    href={`tel:${siteMetadata.phoneNumber}`}
                    className={`${
                      contactStyles.mobileTitle
                    } title is-1 has-text-weight-bold has-text-white`}
                  >
                    {siteMetadata.phoneNumberPretty}
                  </a>
                  <hr style={{ backgroundColor: 'rgba(255,255,255,0.2)' }} />
                  <a
                    href="https://www.facebook.com/pixelfirme/"
                    target="_blank"
                    rel="noopener"
                    style={{ marginRight: '1.5rem' }}
                  >
                    <img width={32} height={32} src={facebook} alt="Facebook" />
                  </a>
                  <a
                    href="https://www.instagram.com/pixel_firme_creative"
                    target="_blank"
                    rel="noopener"
                    style={{ marginRight: '1.5rem' }}
                  >
                    <img
                      width={32}
                      height={32}
                      src={instagram}
                      alt="Instagram"
                    />
                  </a>
                  <a
                    href="https://www.linkedin.com/company/pixelfirmecreative"
                    target="_blank"
                    rel="noopener"
                  >
                    <img width={32} height={32} src={linkedin} alt="LinkedIn" />
                  </a>
                </div>
              </div>
            </div>
          </div>
        </Slide>
        <section className="hero is-large" style={{ position: 'relative' }}>
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
          <div className="hero-body">
            <div className="container">
              <div
                className="has-background-white"
                style={{
                  padding: '4rem',
                  paddingBottom: '6rem',
                  overflow: 'hidden',
                  position: 'relative',
                  minHeight: '320px',
                  display: 'flex',
                  alignItems: 'center',
                }}
              >
                <Slide right opposite when={currentStep === 0}>
                  <div
                    style={{
                      position: 'absolute',
                      right: 0,
                      left: 0,
                    }}
                  >
                    <h2
                      className="title is-4 has-text-black has-text-centered has-text-weight-bold"
                      style={{ marginBottom: '3rem' }}
                    >
                      Bonjour, quel est votre nom?
                    </h2>
                    <div
                      className="has-text-centered"
                      style={{ position: 'relative' }}
                    >
                      <input
                        type="text"
                        className="input is-large"
                        placeholder="Votre nom"
                        style={{
                          maxWidth: '800px',
                          position: 'relative',
                          zIndex: 2,
                          border: 0,
                          borderRadius: 0,
                        }}
                      />
                      <div
                        className="gradient"
                        style={{
                          position: 'absolute',
                          top: '-5px',
                          left: '-5px',
                          right: '-5px',
                          bottom: '-5px',
                          maxWidth: '810px',
                          margin: 'auto',
                          zIndex: 1,
                        }}
                      />
                    </div>
                  </div>
                </Slide>
                <Slide right opposite when={currentStep === 1}>
                  <div
                    style={{
                      position: 'absolute',
                      right: 0,
                      left: 0,
                    }}
                  >
                    <h2
                      className="title is-4 has-text-black has-text-centered has-text-weight-bold"
                      style={{ marginBottom: '3rem' }}
                    >
                      Quel est le type de service qui vous intéresse?
                    </h2>
                    <div
                      className="has-text-centered"
                      style={{
                        position: 'relative',
                        display: 'flex',
                        flexWrap: 'wrap',
                        justifyContent: 'center',
                        paddingLeft: '4rem',
                        paddingRight: '4rem',
                      }}
                    >
                      <a
                        style={{
                          marginRight: '1rem',
                          marginBottom: '1rem',
                          width: 'auto',
                        }}
                        className="btn-gradient has-text-black"
                      >
                        <span>Design graphique</span>
                      </a>
                      <a
                        style={{
                          marginRight: '1rem',
                          marginBottom: '1rem',
                          width: 'auto',
                        }}
                        className="btn-gradient has-text-black"
                      >
                        <span>Stratégie &amp; média</span>
                      </a>
                      <a
                        style={{
                          marginRight: '1rem',
                          marginBottom: '1rem',
                          width: 'auto',
                        }}
                        className="btn-gradient has-text-black"
                      >
                        <span>Production audio &amp; vidéo</span>
                      </a>
                      <a
                        style={{
                          marginRight: '1rem',
                          marginBottom: '1rem',
                          width: 'auto',
                        }}
                        className="btn-gradient has-text-black"
                      >
                        <span>Web</span>
                      </a>
                      <a
                        style={{
                          marginRight: '1rem',
                          marginBottom: '1rem',
                          width: 'auto',
                        }}
                        className="btn-gradient has-text-black"
                      >
                        <span>Image de marque</span>
                      </a>
                      <a
                        style={{
                          marginRight: '1rem',
                          marginBottom: '1rem',
                          width: 'auto',
                        }}
                        className="btn-gradient has-text-black"
                      >
                        <span>Photographie</span>
                      </a>
                      <a
                        style={{
                          marginBottom: '1rem',
                          width: 'auto',
                        }}
                        className="btn-gradient has-text-black"
                      >
                        <span>Aucune idée</span>
                      </a>
                    </div>
                  </div>
                </Slide>
                <Slide right opposite when={currentStep === 2}>
                  <div
                    style={{
                      position: 'absolute',
                      right: 0,
                      left: 0,
                    }}
                  >
                    <h2
                      className="title is-4 has-text-black has-text-centered has-text-weight-bold"
                      style={{ marginBottom: '3rem' }}
                    >
                      Quels sont les délais de livraison de votre projet?
                    </h2>
                    <div
                      className="has-text-centered"
                      style={{
                        position: 'relative',
                        display: 'flex',
                        flexWrap: 'wrap',
                        justifyContent: 'center',
                        paddingLeft: '4rem',
                        paddingRight: '4rem',
                      }}
                    >
                      <a
                        style={{
                          marginRight: '1rem',
                          marginBottom: '1rem',
                        }}
                        className="btn-gradient has-text-black"
                      >
                        <span>Hier</span>
                      </a>
                      <a
                        style={{
                          marginRight: '1rem',
                          marginBottom: '1rem',
                        }}
                        className="btn-gradient has-text-black"
                      >
                        <span>Ben normal</span>
                      </a>
                      <a
                        style={{
                          marginBottom: '1rem',
                        }}
                        className="btn-gradient has-text-black"
                      >
                        <span>Pas de stress</span>
                      </a>
                    </div>
                  </div>
                </Slide>
                <Slide right opposite when={currentStep === 3}>
                  <div
                    style={{
                      position: 'absolute',
                      right: 0,
                      left: 0,
                    }}
                  >
                    <h2
                      className="title is-4 has-text-black has-text-centered has-text-weight-bold"
                      style={{ marginBottom: '3rem' }}
                    >
                      Avez-vous un budget en tête?
                    </h2>
                    <div
                      className="has-text-centered"
                      style={{
                        position: 'relative',
                        display: 'flex',
                        flexWrap: 'wrap',
                        justifyContent: 'center',
                        paddingLeft: '4rem',
                        paddingRight: '4rem',
                      }}
                    >
                      <a
                        style={{
                          marginRight: '1rem',
                          marginBottom: '1rem',
                          width: 'auto',
                        }}
                        className="btn-gradient has-text-black"
                      >
                        <span>Moins de 5&nbsp;000$</span>
                      </a>
                      <a
                        style={{
                          marginRight: '1rem',
                          marginBottom: '1rem',
                          width: 'auto',
                        }}
                        className="btn-gradient has-text-black"
                      >
                        <span>5&nbsp;000$ à 10&nbsp;000$</span>
                      </a>
                      <a
                        style={{
                          marginRight: '1rem',
                          marginBottom: '1rem',
                          width: 'auto',
                        }}
                        className="btn-gradient has-text-black"
                      >
                        <span>10&nbsp;000$ à 20&nbsp;000$</span>
                      </a>
                      <a
                        style={{
                          marginRight: '1rem',
                          marginBottom: '1rem',
                          width: 'auto',
                        }}
                        className="btn-gradient has-text-black"
                      >
                        <span>Aucune idée</span>
                      </a>
                    </div>
                  </div>
                </Slide>
                <Slide right opposite when={currentStep === 4}>
                  <div
                    style={{
                      position: 'absolute',
                      right: 0,
                      left: 0,
                    }}
                  >
                    <h2
                      className="title is-4 has-text-black has-text-centered has-text-weight-bold"
                      style={{ marginBottom: '3rem' }}
                    >
                      Comment pouvons-nous vous joindre?
                    </h2>
                    <div
                      className="has-text-centered columns is-variable is-4"
                      style={{
                        position: 'relative',
                        marginLeft: '4rem',
                        marginRight: '4rem',
                      }}
                    >
                      <div className="column is-half">
                        <div style={{ position: 'relative' }}>
                          <input
                            type="email"
                            required
                            className="input is-large"
                            placeholder="Courriel"
                            style={{
                              position: 'relative',
                              zIndex: 2,
                              border: 0,
                              borderRadius: 0,
                            }}
                          />
                          <div
                            className="gradient"
                            style={{
                              position: 'absolute',
                              top: '-5px',
                              left: '-5px',
                              right: '-5px',
                              bottom: '-5px',
                              zIndex: 1,
                            }}
                          />
                        </div>
                      </div>
                      <div className="column is-half">
                        <div style={{ position: 'relative' }}>
                          <input
                            type="tel"
                            required
                            className="input is-large"
                            placeholder="Téléphone"
                            style={{
                              position: 'relative',
                              zIndex: 2,
                              border: 0,
                              borderRadius: 0,
                            }}
                          />
                          <div
                            className="gradient"
                            style={{
                              position: 'absolute',
                              top: '-5px',
                              left: '-5px',
                              right: '-5px',
                              bottom: '-5px',
                              zIndex: 1,
                            }}
                          />
                        </div>
                      </div>
                    </div>
                  </div>
                </Slide>
                <Slide right opposite when={currentStep === 5}>
                  <div
                    style={{
                      position: 'absolute',
                      right: 0,
                      left: 0,
                    }}
                  >
                    <h2
                      className="title is-4 has-text-black has-text-centered has-text-weight-bold"
                      style={{ marginBottom: '3rem' }}
                    >
                      Merci beaucoup!
                    </h2>
                    <h2 className="title is-4 has-text-black has-text-centered has-text-weight-bold">
                      Nous communiquerons avec vous d'ici 24 heures.
                    </h2>
                  </div>
                </Slide>
              </div>
              <div className="columns" style={{ position: 'relative' }}>
                <div
                  className="column is-8 is-offset-2 has-background-black has-text-white"
                  style={{ padding: '1.5rem 2rem', marginTop: '-1.5rem' }}
                >
                  <div className="level">
                    <div className="level-left">
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
                            minWidth: '320px',
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
                        <span>06</span>
                      </div>
                    </div>

                    <div className="level-right">
                      {currentStep !== 5 ? (
                        <a
                          onClick={() => this.handleProgressChange()}
                          className="has-text-white"
                          style={{ position: 'absolute', zIndex: 2 }}
                        >
                          Suivant
                        </a>
                      ) : null}
                    </div>
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

export default GoogleApiWrapper({
  apiKey: 'bacon',
})(ContactIndex)

export const pageQuery = graphql`
  query ContactIndexQuery {
    site {
      siteMetadata {
        title
        phoneNumber
        phoneNumberPretty
        address
        email
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
