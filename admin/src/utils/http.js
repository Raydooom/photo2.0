import Axios from 'axios';

const http = Axios.create();

http.interceptors.request.use(
  config => {
    // 登录拦截
    let token = localStorage.getItem("token");
    token && (config.headers.token = token);
    return config;
  },
  error => {
    return Promise.reject(error);
  })

export default http;
