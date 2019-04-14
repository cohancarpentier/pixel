import React, { Component, Fragment } from 'react'
import { Link } from 'gatsby'
import navStyles from './navigation.module.scss'
import logoWhite from './../images/logo.svg'
import logoBlack from './../images/logo-black.svg'
import Slide from 'react-reveal/Slide'
import Fade from 'react-reveal/Fade'

const windowGlobal = typeof window !== 'undefined' && window

export class Navigation extends Component {
  state = {
    showMenu: false,
    scrolled: false,
  }

  handleScroll() {
    if (pageYOffset > 0) {
      this.setState({
        scrolled: true,
      })
    } else {
      this.setState({
        scrolled: false,
      })
    }
  }

  componentDidMount = () => {
    windowGlobal.addEventListener('scroll', () => {
      this.handleScroll()
    })
  }

  render() {
    const { showMenu, scrolled } = this.state
    const { phoneNumber, phoneNumberPretty, address } = this.props

    return (
      <Fragment>
        <nav
          role="navigation"
          className={[
            scrolled ? navStyles.hasBackgroundBlack : null,
            navStyles.navigation,
          ].join(' ')}
        >
          <div className="container is-fluid">
            <div className="level">
              <div className="level-left">
                <Link to={`/`} style={{ position: 'absolute', top: 8 }}>
                  <img
                    style={{
                      opacity: showMenu ? 0 : 1,
                      transition: 'all 1s ease-in-out',
                    }}
                    src={logoWhite}
                    alt="Logo"
                    width={130}
                  />
                  <img
                    style={{
                      position: 'absolute',
                      left: 0,
                      opacity: showMenu ? 1 : 0,
                      transition: 'all 1s ease-in-out',
                    }}
                    src={logoBlack}
                    alt="Logo"
                    width={130}
                  />
                </Link>
              </div>
              <div className="level-right" style={{ display: 'flex' }}>
                <Link
                  to={'/contact'}
                  style={{
                    marginRight: '0.5rem',
                    position: 'relative',
                    color: !showMenu ? 'white' : 'black',
                    right: !showMenu ? '-5.5rem' : '0rem',
                    opacity: !showMenu ? 1 : 0,
                    transition:
                      'right 1s ease-in-out, color 1s ease-in-out, opacity 0.5s ease-in-out',
                  }}
                  className="btn-gradient"
                >
                  <span>Mandatez-nous</span>
                </Link>

                <Fade when={showMenu}>
                  <a
                    href={'/en'}
                    className="has-text-white"
                    style={{
                      marginRight: '0rem',
                      marginLeft: '1.5rem',
                      fontSize: '1rem',
                    }}
                  >
                    <span className="has-text-black">English</span>
                  </a>
                </Fade>

                <div
                  onClick={() =>
                    this.setState({
                      showMenu: !showMenu,
                    })
                  }
                  className={`${showMenu ? 'open' : null} menuToggle`}
                  style={{
                    marginRight: '-2rem',
                  }}
                >
                  <div className="hamburger">
                    <span className="menuLine" />
                    <span className="menuLine" />
                    <span className="menuLine" />
                  </div>
                  <div className="cross">
                    <span className="menuLine" />
                    <span className="menuLine" />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </nav>
        <Fade when={showMenu}>
          <div
            className={`${navStyles.menu} has-background-white`}
            style={{
              zIndex: 999999,
              pointerEvents: showMenu ? 'all' : 'none',
            }}
          >
            <div
              className="container"
              style={{
                maxWidth: '920px',
              }}
            >
              <div className="columns">
                <div className="column is-half">
                  <Fade right cascade opposite when={showMenu}>
                    <ul>
                      <li>
                        <Link to={`/team`}>
                          <span
                            className={`${
                              navStyles.menuItem
                            } hoverGradient title is-1 has-text-weight-bold has-text-black`}
                          >
                            L'agence
                          </span>
                        </Link>
                      </li>
                      <li>
                        <Link to={`/projects`}>
                          <span
                            className={`${
                              navStyles.menuItem
                            } hoverGradient title is-1 has-text-weight-bold has-text-black`}
                          >
                            Projets
                          </span>
                        </Link>
                      </li>
                      <li>
                        <Link to={`/services`}>
                          <span
                            className={`${
                              navStyles.menuItem
                            } hoverGradient title is-1 has-text-weight-bold has-text-black`}
                          >
                            Services
                          </span>
                        </Link>
                      </li>
                      <li style={{ paddingBottom: '3rem' }}>
                        <Link to={`/jobs`}>
                          <span
                            className={`${
                              navStyles.menuItem
                            } hoverGradient title is-1 has-text-weight-bold has-text-black`}
                          >
                            Jobs
                          </span>
                        </Link>
                      </li>
                      <li>
                        <Link to={`/contact`}>
                          <span
                            className={`${
                              navStyles.underline
                            } title is-6 has-text-weight-semibold has-text-black`}
                          >
                            Nous joindre
                          </span>
                        </Link>
                      </li>
                      <li>
                        <Link to={`/studio-rental`}>
                          <span
                            className={`${
                              navStyles.underline
                            } title is-6 has-text-weight-semibold has-text-black`}
                          >
                            Location de studio
                          </span>
                        </Link>
                      </li>
                      <li>
                        <Link to={`/prizes-and-mentions`}>
                          <span
                            className={`${
                              navStyles.underline
                            } title is-6 has-text-weight-semibold has-text-black`}
                          >
                            Prix et mentions
                          </span>
                        </Link>
                      </li>
                    </ul>
                  </Fade>
                </div>
                <div
                  className="column is-half"
                  style={{
                    display: 'flex',
                    flexDirection: 'column',
                    justifyContent: 'center',
                  }}
                >
                  <h3
                    className="has-text-black has-text-weight-semibold"
                    style={{ fontSize: '0.85rem' }}
                  >
                    Mandatez-nous
                  </h3>
                  <Link to={'/contact'} className="hoverGradient">
                    <h3
                      className="title is-3 has-text-black has-text-weight-bold"
                      style={{ marginBottom: '1rem' }}
                    >
                      On travaille ensemble?
                    </h3>
                  </Link>
                  <hr style={{ backgroundColor: 'black' }} />
                  <a
                    href={`tel:${phoneNumber}`}
                    style={{ marginTop: '1rem' }}
                    className="hoverGradient title is-1 has-text-black has-text-weight-bold"
                  >
                    {phoneNumberPretty}
                  </a>
                  <div
                    style={{
                      marginTop: '1rem',
                      fontWeight: 600,
                      fontSize: '0.85rem',
                    }}
                    dangerouslySetInnerHTML={{ __html: address }}
                  />
                </div>
              </div>
            </div>
          </div>
        </Fade>
      </Fragment>
    )
  }
}
