import { Component, createContext } from 'react'
import { IntlProvider } from 'react-intl'
import { local } from 'utilities/storage'
import { setGlobal } from 'utilities/global'

const defaultLocale = 'en'

export const I18nContext = createContext()

export default class I18nProvider extends Component {
    constructor(props) {
        super(props)

        this.state = { locales }

        setGlobal('locale', { set: this.set })
    }

    componentDidMount() {
        this.load()
    }

    load = async locale => {
        const intl = await this.getIntlFromLocale(locale)
        this.setState(intl)
    }

    getIntlFromLocale = async (locale = defaultLocale) => {
        const { default: messages } = await import(`i18n/${locale}.json`)

        return {
            defaultLocale,
            locale,
            messages
        }
    }

    set = async locale => {
        if(!(locale in locales)) {
            return
        }

        this.load(locale)

        const thirtyDaysAsMinutes = 60 * 24 * 30
        local.set('locale', locale, { expiry: thirtyDaysAsMinutes })
    }

    render() {
        const { defaultLocale, locale, messages } = this.state

        if(!locale) {
            return null
        }

        return (
            <I18nContext.Provider value={this.state}>
                <IntlProvider
                    onError={() => {}}
                    {...{ defaultLocale, locale, messages }}>
                    {locale}
                </IntlProvider>
            </I18nContext.Provider>
        )
    }
}

const locales = {
    en: {
        name: 'English',
        flag: '🇺🇸'
    },
    nb: {
        name: 'Norsk',
        flag: '🇳🇴'
    }
}