import Promise from "../utils/external/es6-promise.min";

// const HOST = "http://localhost:8360";
// const HOST = "http://192.168.1.110:8360";
const HOST = "http://172.16.156.152:8360";

// 接口列表
const api = {
  getBanner: "/api/index/getBanner", // 获取banner
  getKindList: "/api/index/getKindList", // 获取分类列表
  getKindArticle: "/api/index/getKindArticle", // 获取分类下文章列表
  getArticle: "/api/index/getArticle", // 根据文章ID获取文章详情
  getArticleComment: "/api/index/getArticleComment", // 获取文章评论
  addArticleComment: "/api/author/addArticleComment", // 发布评论
  // 需要登录的接口
  login: "/api/login/index", // 登录接口，code换取openid
  getUserInfo: "/api/user/getUserInfo", // 获取用户信息
  getUserCollect: "/api/user/getUserCollect", // 获取用户收藏问文章
}

// promise封装
function severRequest(apiKey, params = {}, method = "POST") {
  let token = wx.getStorageSync("token") || "";
  return new Promise((resolve, reject) => {
    wx.request({
      url: HOST + api[apiKey],
      method: method,
      data: params,
      header: {
        token
      },
      success(res) {
        if (res.data.errno == 0) {
          console.log(res.data);
          resolve(res.data);
        } else {
          reject(res.data);
        }
      },
      fail(err) {
        reject(err);
      }
    })
  })

}

module.exports = {
  severRequest: severRequest
}