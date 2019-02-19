import React from 'react'
import { Link } from 'gatsby'
import styles from './navigation.module.scss'

export default () => (
  <nav role="navigation" className={styles.navigation}>
    <div className="container is-fluid">
      <div className="level">
        <div className="level-left">logo</div>
        <div className="level-right">
          <Link to={`/`}>
            <span className={`${styles.ripple} has-text-white`}>
              Mandatez-nous
            </span>
          </Link>
        </div>
      </div>
    </div>
  </nav>
)
