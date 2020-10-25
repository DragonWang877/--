import axios from "axios";
import { time } from "./utils.js";
//post 设置请求头
axios.defaults.headers.post["Content-Type"] = "application/json";
const server = axios.create({
  //根地址
  baseURL: 'https://www.fastmock.site/mock/bae66ff4624dffbdd4b7a8b921397935/api',
  timeout: 15000,
});

//请求前拦截
server.interceptors.request.use(
  function (config) {
    config.url = time(config.url);
    return config;
  },
  function (err) {
    return Promise.reject(err)
  }
)
//响应数据之前拦截
server.interceptors.response.use(
  function (res) {
    let { data } = res;
    if (Number(data.code) === 0) {
      alert('数据响应失败');
    }
    return res;
  },
  function (err) {
    return Promise.reject(err);
  }
)
//封装 get请求方式
function get(url, params) {
  return new Promise((resolve, reject) => {
    server
      .get(url, {
        params: params,
      })
      .then((res) => {
        resolve(res.data.data);
      })
      .catch((err) => {
        reject(err.data);
      });
  });
}
//封装 post请求方式
function post(url, data = {}) {
  return new Promise((resolve, reject) => {
    server.post(url, data)
      .then(
        (response) => {
          resolve(response.data);
        },
        (err) => {
          reject(err);
        }
      );
  });
}


export { get, post };