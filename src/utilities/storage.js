import { compact } from 'utilities/array'
import { each } from 'utilities/object'
import { setGlobal } from 'utilities/global'

const s = type => global[`${type}Storage`]

const salt = 'repro:'
const salted = key => `${salt}${key}`

const extractValueAndExpiry = item => {
    const [value, expiry] = !!item ?
        JSON.parse(item) :
        [null, null]

    return {
        value,
        expiry,
        expired: !!expiry && Date.now() > expiry
    }
}

// Expiry in minutes
const set = type => (key, value, options = {}) => {
    if(!key) {
        return
    }

    let {
        expiry = Infinity,
        expiryAsDate = false
    } = options

    if(value) {
        if(expiry === Infinity) {
            expiry = null
        } else if(expiry) {
            if(!expiryAsDate) {
                expiry = Date.now() + (expiry * 1000 * 60)
            }
        }

        const valueWithExpiry = JSON.stringify(compact([value, expiry]))
        return s(type).setItem(key, valueWithExpiry)
    }

    return null
}

const get = type => key => {
    if(!key) {
        return
    }

    const item = s(type).getItem(key) ?? null
    const { value, expired } = extractValueAndExpiry(item)

    if(value && expired) {
        s(type).removeItem(key)
        return null
    }

    return value
}

const remove = type => key => {
    if(!key) {
        return
    }

    const item = s(type).getItem(key) ?? null
    const { value } = extractValueAndExpiry(item)
    s(type).removeItem(key)
    return value
}

const prune = type => each(s(type), (v, key) => {
    key.startsWith(salt) && get(type)(key)
})

const flush = type => s(type).clear()

export const local = {
    set: (key, value, options) => set('local')(salted(key), value, options),
    get: key => get('local')(salted(key)),
    remove: key => remove('local')(salted(key)),
    prune: () => prune('local'),
    flush: () => flush('local')
}

export const session = {
    set: (key, value, options) => set('session')(salted(key), value, options),
    get: key => get('session')(salted(key)),
    remove: key => remove('session')(salted(key)),
    prune: () => prune('session'),
    flush: () => flush('session')
}

setGlobal('storage', {
    local,
    session
})