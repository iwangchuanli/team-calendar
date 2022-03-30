import axios from 'axios'

const service = axios.create({
    baseURL: "/",
    timeout: 5000
})

service.interceptors.request.use(
    config => {
        return config
    },
    error => {
        console.log(error) // for debug
        return Promise.reject(error)
    }
)

service.interceptors.response.use(
    response => {
        // console.log(response)
        return response
    },
    error => {
        console.log('err' + error) // for debug
        return Promise.reject(error)
    }
)

export function post(url, data) {
    const dataJson = JSON.stringify(data)
    return service.post(url, dataJson)
}

export function get(url, data) {
    return service({url: url, method: 'get', params: data})
}

export default service
