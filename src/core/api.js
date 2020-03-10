import axios from 'axios'
import { Message } from 'element-ui'

axios.defaults.baseURL = 'http://127.0.0.1:8088'
axios.interceptors.request.use(config => {
    let token = window.sessionStorage.getItem('token')
    if (!token) return config
    config.headers.Application = token
    return config
})

const api = {
    async request(method, url, data) {
        try {
            let res = await method(url, data)
            res = res.data
            return new Promise((resolve, reject) => {
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
    }

}
export { api }