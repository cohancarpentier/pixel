import React, { Component } from 'react'
import { Link } from 'gatsby'
import footerStyles from './footer.module.scss'
import instagram from './../images/instagram.svg'
import facebook from './../images/facebook.svg'
import linkedin from './../images/linkedin.svg'
import logo from './../images/logo.svg'

export class Footer extends Component {
  render() {
    console.log(this.props)
    const { phoneNumber, phoneNumberPretty, address } = this.props

    return (
      <footer
        className="has-background-black has-text-white"
        style={{ paddingLeft: '1.5rem', paddingRight: '1.5rem' }}
      >
        <div className="container is-fluid">
          <div
            className={`${footerStyles.levelBlock} level`}
            style={{ margin: 0, paddingTop: '4rem', paddingBottom: '4rem' }}
          >
            <div className="level-left">
              <Link
                className={footerStyles.mobileMargin}
                style={{ marginRight: '3rem' }}
                to={`/`}
              >
                <img src={logo} alt="Logo" width={130} />
              </Link>
              <div
                className={footerStyles.mobileMargin}
                dangerouslySetInnerHTML={{ __html: address }}
              />
            </div>
            <div className="level-right">
              <a
                href={`tel:${phoneNumber}`}
                className={`${
                  footerStyles.mobileTitle
                } title is-1 has-text-weight-bold has-text-white`}
              >
                {phoneNumberPretty}
              </a>
            </div>
          </div>
          <hr style={{ margin: 0, backgroundColor: 'rgba(255,255,255,0.2' }} />
          <div className={`${footerStyles.levelBlock} level`}>
            <div className="level-left">
              <Link to={`/team`}>
                <span
                  className={`${
                    footerStyles.link
                  } has-text-white has-text-weight-semibold`}
                >
                  {/*<FormattedMessage id="team" />*/}
                </span>
              </Link>
              <Link to={`/projects`}>
                <span
                  className={`${
                    footerStyles.link
                  } has-text-white has-text-weight-semibold`}
                >
                  Projets
                </span>
              </Link>
              <Link to={`/services`}>
                <span
                  className={`${
                    footerStyles.link
                  } has-text-white has-text-weight-semibold`}
                >
                  Services
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
              <Link to={`/contact`}>
                <span
                  className={`${
                    footerStyles.link
                  } has-text-white has-text-weight-semibold`}
                >
                  Nous joindre
                </span>
              </Link>
            </div>
            <div className="level-right">
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
                <img width={32} height={32} src={instagram} alt="Instagram" />
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
      </footer>
    )
  }
}
