const getRequest = (url) => fetch(url).then((response) => {
    if (response.ok) {
        return response.json()

    } else {
        throw new Error('Server Error')
    }
})
const changeRequest = (url, options) => fetch(url, options).then((response) => {
    if (response.ok) {
        return response
    } else {
        throw new Error('Server Error')
    }
})
export { getRequest, changeRequest };