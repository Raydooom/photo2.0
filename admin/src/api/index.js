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


// 获取文章列表
export const getArticleList = (params) => {
  let config = {
    url: "/api/admin/index/getArticleList",
    method: "POST",
    data: params
  }
  return http(config).then(res => {
    return res.data;
  }).catch(err => {
    return err;
  })
}


// 获取文章分类列表
export const getKindList = (params) => {
  let config = {
    url: "/api/admin/index/getKindList",
    method: "POST",
    data: params
  }
  return http(config).then(res => {
    return res.data;
  }).catch(err => {
    return err;
  })
}

// 添加文章
export const addArticle = (params) => {
  let config = {
    url: "/api/admin/index/addArticle",
    method: "POST",
    data: params
  }
  return http(config).then(res => {
    return res.data;
  }).catch(err => {
    return err;
  })
}