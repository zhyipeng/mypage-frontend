import axios from 'axios'
import {Message} from 'element-ui'

export const ToolsBoxBaseURL = 'http://121.37.142.178'
// export const ToolsBoxBaseURL = 'http://127.0.0.1:9999'
export const BlogBaseURL = 'http://106.13.226.30'
export const TestBlogBaseURL = 'http://127.0.0.1:8088'

axios.defaults.baseURL = BlogBaseURL
axios.interceptors.request.use(config => {
    let token = window.localStorage.getItem('token')
    if (!token) return config
    config.headers.Authorization = token;
    return config
})

const api = {
    async request(method, url, data) {
        try {
            let rsp = await method(url, data)
            let res = rsp.data
            return new Promise((resolve, reject) => {
                if (rsp.status != 200 && rsp.status != 204) {
                    reject(rsp.status)
                }
                if (!res.error_code || res.error_code === 0) {
                    resolve(res)
                } else {
                    reject(res)
                }
            }).then(
                function(data) { return data },
                function(data, reason) {
                    console.log(data)
                    Message.warning(data.error_message)
                    return null
                }
            )
        } catch (err) {
            console.log(err)
            Message.error('服务器出错')
        }
    },

    post(url, data) {
        return api.request(axios.post, url, data)
    },

    get(url, data = {}) {
        return api.request(axios.get, url, data)
    },
    put(url, data) {
        return api.request(axios.put, url, data)
    },
    delete(url) {
        return api.request(axios.delete, url)
    }
}
export { api }