
export const setGlobal = (name, value) => {
    if(process.env.NODE_ENV === 'development') {
        global.huma = {
            ...(global.huma ?? null),
            [name]: value
        }
    }
}