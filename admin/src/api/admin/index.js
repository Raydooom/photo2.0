import http from '../http'

// 获取加密key
export const getKey = params => {
  let config = {
    url: "/admin/login/getAesKey",
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
export const login = params => {
  let config = {
    url: "/admin/login",
    method: "POST",
    data: params
  }
  return http(config).then(res => {
    return res.data;
  }).catch(err => {
    return err;
  })
}

export const logout = params => {
  let config = {
    url: "/admin/login/logout",
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
export const getArticleList = params => {
  let config = {
    url: "/admin/index/getArticleList",
    method: "POST",
    data: params
  }
  return http(config).then(res => {
    return res.data;
  }).catch(err => {
    return err;
  })
}

// 获取文章详情
export const getArticle = params => {
  let config = {
    url: "/admin/index/getArticle",
    method: "POST",
    data: params
  }
  return http(config).then(res => {
    return res.data;
  }).catch(err => {
    return err;
  })
}

// 更新文章
export const updateArticle = params => {
  let config = {
    url: "/admin/index/updateArticle",
    method: "POST",
    data: params
  }
  return http(config).then(res => {
    return res.data;
  }).catch(err => {
    return err;
  })
}


// 删除文章
export const delArticle = params => {
  let config = {
    url: "/admin/index/delArticle",
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
export const getKindList = params => {
  let config = {
    url: "/admin/index/getKindList",
    method: "POST",
    data: params
  }
  return http(config).then(res => {
    return res.data;
  }).catch(err => {
    return err;
  })
}

export const uploadImgUrl = "/admin/uploadImg/index";

// 添加文章
export const addArticle = params => {
  let config = {
    url: "/admin/index/addArticle",
    method: "POST",
    data: params
  }
  return http(config).then(res => {
    return res.data;
  }).catch(err => {
    return err;
  })
}

// 获取关于开发者
export const editAboutDeveloper = params => {
  let config = {
    url: "/admin/index/editAboutDeveloper",
    method: "POST",
    data: params
  }
  return http(config).then(res => {
    return res.data;
  }).catch(err => {
    return err;
  })
}


// 编辑关于开发者
export const getAboutDeveloper = params => {
  let config = {
    url: "/admin/index/getAboutDeveloper",
    method: "POST",
    data: params
  }
  return http(config).then(res => {
    return res.data;
  }).catch(err => {
    return err;
  })
}

// 精选接口
export const getDailyList = params => {
  let config = {
    url: "/admin/index/getDailyList",
    method: "POST",
    data: params
  }
  return http(config).then(res => {
    return res.data;
  }).catch(err => {
    return err;
  })
}

// 添加精选
export const addDaily = params => {
  let config = {
    url: "/admin/index/addDaily",
    method: "POST",
    data: params
  }
  return http(config).then(res => {
    return res.data;
  }).catch(err => {
    return err;
  })
}

// 删除精选
export const delDaily = params => {
  let config = {
    url: "/admin/index/delDaily",
    method: "POST",
    data: params
  }
  return http(config).then(res => {
    return res.data;
  }).catch(err => {
    return err;
  })
}
