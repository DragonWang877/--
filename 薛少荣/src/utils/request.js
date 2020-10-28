import axios from 'axios'
import {
    time
} from './utils'

const server = axios.create({
    baseURL: 'https://www.fastmock.site/mock/d314ece8e244162e2ba1c4ff77874c0a/login',
    timeout: 15000
})

// 发送请求前
server.interceptors.request.use(
    (config) => {
        // 添加时间戳
        let url = config.url.split("?");
        url.length > 1 ?
            (config.url = `${url[0]}?${time(url[1])}`) :
            (config.url = `${url[0]}${time(url[1])}`);
        return config;
    },
    (error) => {
        return Promise.reject(error);
    }
)

//数据返回途中
server.interceptors.response.use(
    (response) => {
        // console.log(response)
        return response.data
    },
    (err) => {
        return err
    }
)

// get请求封装
function get(url, paramas) {
    return new Promise((resolve, reject) => {
        server.get(url, {
            paramas: paramas
        }).then((res) => {
            resolve(res.data)
        }).catch((err) => {
            reject(err)
        })
    })
}

// post封装
function post(url, data) {
    return new Promise((resolve, reject) => {
        server.post(url, data).then((res) => {
            resolve(res.data)
        }).catch((err) => {
            reject(err)
        })
    })
}

export {
    get,
    post
}