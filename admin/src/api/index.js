import http from '../utils/http'

// 获取加密key
export const getKey = (params) => {
  let config = {
    url: "/api/admin/login/getAesKey",
    method: "POST",
    data: params
  }
  return http(config).then(res => {
    return res.data;
  }).catch(err => {
    return err;
  })
}

// 登录
export const login = (params) => {
  let config = {
    url: "/api/admin/login",
    method: "POST",
    data: params
  }
  return http(config).then(res => {
    return res.data;
  }).catch(err => {
    return err;
  })
}
