import React, { Component, Fragment } from 'react'
import { Link } from 'gatsby'
import navStyles from './navigation.module.scss'
import menu from './../images/menu.svg'

export class Navigation extends Component {
  state = {
    showMenu: false,
  }

  render() {
    const { showMenu } = this.state
    const { phoneNumber, phoneNumberPretty } = this.props
    return (
      <Fragment>
        <nav role="navigation" className={navStyles.navigation}>
          <div className="container is-fluid">
            <div className="level">
              <div className="level-left">logo</div>
              <div className="level-right">
                <Link to={`/`}>
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
        {showMenu ? (
          <div className={`${navStyles.menu} has-background-white`}>
            <div className="container">
              <div className="columns">
                <div className="column is-half">
                  <ul>
                    <li>
                      <Link to={`/`}>
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
                      <Link to={`/`}>
                        <span
                          className={`${
                            navStyles.menuItem
                          } title is-6 has-text-weight-semibold has-text-black`}
                        >
                          Location de studio
                        </span>
                      </Link>
                    </li>
                    <li>
                      <Link to={`/`}>
                        <span
                          className={`${
                            navStyles.menuItem
                          } title is-6 has-text-weight-semibold has-text-black`}
                        >
                          Prix et mentions
                        </span>
                      </Link>
                    </li>
                  </ul>
                </div>
                <div className="column is-half">
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
                </div>
              </div>
            </div>
          </div>
        ) : null}
      </Fragment>
    )
  }
}
