import Axios from 'axios';
import router from '@/router';

const http = Axios.create();

http.interceptors.request.use(
  config => {
    return config;
  },
  error => {
    return Promise.reject(error);
  })

// 请求结果拦截，设置登录状态
http.interceptors.response.use(
  res => {
    console.log(res.data)
    if (res.data.errno == "1000" && res.data.errmsg.indexOf("登录") != -1) {
      // 当接口返回未登录状态时，跳转登录页面
      router.push("/login?url=" + location.href)
      return res
    } else {
      return res;
    }
  }
)

export default http;
