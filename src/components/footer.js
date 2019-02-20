import React, { Component } from 'react'
import { Link } from 'gatsby'
import footerStyles from './footer.module.scss'
import instagram from './../images/instagram.svg'
import facebook from './../images/facebook.svg'
import logo from './../images/logo.svg'

export class Footer extends Component {
  render() {
    const { phoneNumber, phoneNumberPretty, address } = this.props
    return (
      <footer className="has-background-black has-text-white">
        <div className="container is-fluid">
          <div
            className="level"
            style={{ margin: 0, paddingTop: '4rem', paddingBottom: '4rem' }}
          >
            <div className="level-left">
              <Link style={{ marginRight: '3rem' }} to={`/`}>
                <img src={logo} alt="Logo" width={130} />
              </Link>
              <div dangerouslySetInnerHTML={{ __html: address }} />
            </div>
            <div className="level-right">
              <a
                href={`tel:${phoneNumber}`}
                className="title is-1 has-text-weight-bold has-text-white"
              >
                {phoneNumberPretty}
              </a>
            </div>
          </div>
          <hr style={{ margin: 0, backgroundColor: 'rgba(255,255,255,0.1' }} />
          <div className="level" style={{ height: '100px' }}>
            <div className="level-left">
              <Link to={`/`}>
                <span
                  className={`${
                    footerStyles.link
                  } has-text-white has-text-weight-semibold`}
                >
                  Location de studio
                </span>
              </Link>
              <Link to={`/`}>
                <span
                  className={`${
                    footerStyles.link
                  } has-text-white has-text-weight-semibold`}
                >
                  Prix et mentions
                </span>
              </Link>
              <Link to={`/jobs`}>
                <span
                  className={`${
                    footerStyles.link
                  } has-text-white has-text-weight-semibold`}
                >
                  Jobs
                </span>
              </Link>
              <Link to={`/`}>
                <span
                  className={`${
                    footerStyles.link
                  } has-text-white has-text-weight-semibold`}
                >
                  Contact
                </span>
              </Link>
            </div>
            <div className="level-right">
              <a href="https://google.com" style={{ marginRight: '1.5rem' }}>
                <img width={32} height={32} src={facebook} alt="Facebook" />
              </a>
              <a href="https://google.com">
                <img width={32} height={32} src={instagram} alt="Instagram" />
              </a>
            </div>
          </div>
        </div>
      </footer>
    )
  }
}
