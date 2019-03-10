import React from 'react'
import { IntlProvider, addLocaleData } from 'react-intl'

// Locale data
import enData from 'react-intl/locale-data/en'
import frData from 'react-intl/locale-data/fr'

// Messages
import en from '../i18n/en.json'
import fr from '../i18n/fr.json'

const messages = { en, fr }

addLocaleData([...enData, ...frData])

const Translater = ({ locale, children }) => (
  <IntlProvider locale={locale} messages={messages[locale]}>
    {children}
  </IntlProvider>
)

export default Translater
