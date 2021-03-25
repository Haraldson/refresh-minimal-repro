export const each = (object = {}, looper) => {
    let keys = Object.keys(object)
    keys.forEach(key => looper(object[key], key))
}