import React, { Component } from 'react'
import Fade from 'react-reveal/Fade'
import videoHeaderStyles from './video-header.module.scss'

export class VideoHeader extends Component {
  render() {
    const {
      title,
      heroImage,
      heroVideo,
      heroTitle,
      heroDescription,
    } = this.props

    return (
      <>
        <div style={{ paddingTop: '8rem', zIndex: 3, position: 'relative' }}>
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
                <h1 className="has-text-weight-semibold">{title}</h1>
              </div>
            </div>
          </div>
        </div>
        <section
          className="hero is-medium"
          style={{ marginTop: '-14.35rem', position: 'relative' }}
        >
          <div
            className="hero-video"
            style={{
              height: '100%',
              width: '100%',
              background: `url(${heroImage}) no-repeat center center`,
              backgroundSize: 'cover',
            }}
          >
            <video
              poster={heroImage}
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
                background: `url(${heroImage}) no-repeat center center`,
                backgroundSize: 'cover',
                overflow: 'hidden',
              }}
            >
              <source src={heroVideo} type="video/mp4" />
            </video>
          </div>
          <div
            className="hero-body"
            style={{ backgroundColor: 'rgba(0,0,0,0.75)', zIndex: 2 }}
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
                        videoHeaderStyles.mobileTitle
                      } title is-2 has-text-weight-bold has-text-gradient`}
                      style={{
                        lineHeight: 1.25,
                      }}
                      dangerouslySetInnerHTML={{
                        __html: heroTitle,
                      }}
                    />
                  </div>
                  <div className="column is-9">
                    <p
                      className={`has-text-white`}
                      dangerouslySetInnerHTML={{
                        __html: heroDescription,
                      }}
                    />
                  </div>
                </div>
              </div>
            </Fade>
          </div>
        </section>
      </>
    )
  }
}
