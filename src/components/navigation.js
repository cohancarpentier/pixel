import React, { Component, Fragment } from 'react'
import { Link } from 'gatsby'
import navStyles from './navigation.module.scss'
import menu from './../images/menu.svg'
import x from './../images/x.svg'
import logoWhite from './../images/logo.svg'
import logoBlack from './../images/logo-black.svg'
import Slide from 'react-reveal/Slide'

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
    window.addEventListener('scroll', event => {
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
                <Link to={`/`}>
                  <img src={logoWhite} alt="Logo" width={130} />
                </Link>
              </div>
              <div className="level-right">
                <Link to={`/`} className={navStyles.mobileButton}>
                  <span className={`${navStyles.ripple} has-text-white`}>
                    Mandatez-nous
                  </span>
                </Link>
                <a>
                  <img
                    onClick={() =>
                      this.setState({
                        showMenu: !showMenu,
                      })
                    }
                    src={menu}
                    alt="Menu"
                    width={32}
                    height={32}
                    style={{ marginLeft: '3rem' }}
                  />
                </a>
              </div>
            </div>
          </div>
        </nav>
        <Slide bottom opposite when={showMenu}>
          <div
            className={`${navStyles.menu} has-background-white`}
            style={{
              zIndex: 99999999,
              pointerEvents: showMenu ? 'all' : 'none',
            }}
          >
            <nav role="navigation" className={navStyles.navigation}>
              <div className="container is-fluid">
                <div className="level">
                  <div className="level-left">
                    <Link to={`/`}>
                      <img src={logoBlack} alt="Logo" width={130} />
                    </Link>
                  </div>
                  <div className="level-right">
                    <a>
                      <img
                        onClick={() =>
                          this.setState({
                            showMenu: !showMenu,
                          })
                        }
                        src={x}
                        alt="Close"
                        width={32}
                        height={32}
                        style={{ marginLeft: '3rem' }}
                      />
                    </a>
                  </div>
                </div>
              </div>
            </nav>
            <div className="container">
              <div className="columns">
                <div className="column is-half">
                  <ul>
                    <li>
                      <Link to={`/team`}>
                        <span
                          className={`${
                            navStyles.menuItem
                          } title is-1 has-text-weight-bold has-text-black`}
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
                          } title is-1 has-text-weight-bold has-text-black`}
                        >
                          Projets
                        </span>
                      </Link>
                    </li>
                    <li>
                      <Link to={`/`}>
                        <span
                          className={`${
                            navStyles.menuItem
                          } title is-1 has-text-weight-bold has-text-black`}
                        >
                          Services
                        </span>
                      </Link>
                    </li>
                    <li style={{ paddingBottom: '5rem' }}>
                      <Link to={`/`}>
                        <span
                          className={`${
                            navStyles.menuItem
                          } title is-1 has-text-weight-bold has-text-black`}
                        >
                          Jobs
                        </span>
                      </Link>
                    </li>
                    <li>
                      <Link to={`/studio-rental`}>
                        <span
                          className={`title is-6 has-text-weight-semibold has-text-black`}
                        >
                          Location de studio
                        </span>
                      </Link>
                    </li>
                    <li>
                      <Link to={`/prizes-and-mentions`}>
                        <span
                          className={`title is-6 has-text-weight-semibold has-text-black`}
                        >
                          Prix et mentions
                        </span>
                      </Link>
                    </li>
                  </ul>
                </div>
                <div
                  className="column is-half"
                  style={{
                    display: 'flex',
                    flexDirection: 'column',
                    justifyContent: 'center',
                  }}
                >
                  <h3 className="has-text-black has-text-weight-semibold">
                    Mandatez-nous
                  </h3>
                  <h3 className="title is-3 has-text-black has-text-weight-bold">
                    On travaille ensemble?
                  </h3>
                  <hr style={{ backgroundColor: 'black' }} />
                  <a
                    href={`tel:${phoneNumber}`}
                    className="title is-1 has-text-black has-text-weight-bold"
                  >
                    {phoneNumberPretty}
                  </a>
                  <div
                    style={{ marginTop: '2rem' }}
                    dangerouslySetInnerHTML={{ __html: address }}
                  />
                </div>
              </div>
            </div>
          </div>
        </Slide>
      </Fragment>
    )
  }
}
