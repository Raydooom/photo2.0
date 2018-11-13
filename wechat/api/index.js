import Promise from "../utils/external/es6-promise.min";

const HOST = "http://localhost:8360";
// const HOST = "http://192.168.1.110:8360";
// const HOST = "https://server.raydom.wang";
// 接口列表
const api = {
  getBanner: "/api/index/getBanner", // 获取banner
  getKindList: "/api/index/getKindList", // 获取分类列表
  getKindArticle: "/api/index/getKindArticle", // 获取分类下文章列表
  getArticle: "/api/index/getArticle", // 根据文章ID获取文章详情
  getArticleComment: "/api/index/getArticleComment", // 获取文章评论
  viewCount: "/api/index/viewCount", // 浏览量
  shareCount: "/api/index/shareCount", // 分享统计
  getAboutDeveloper: "/api/index/getAboutDeveloper", // 获取关于开发者
  getDailyList: "/api/index/getDailyList", // 获取精选列表
  // 需要登录的接口
  login: "/api/login/index", // 登录接口，code换取openid
  getUserInfo: "/api/user/getUserInfo", // 获取用户信息
  getCollectArticle: "/api/user/getCollectArticle", // 获取用户收藏问文章
  getCommentArticle: "/api/user/getCommentArticle", // 获取用户收藏问文章
  // 文章相关
  addPraise: "/api/user/addPraise", // 点赞
  addArticleComment: "/api/user/addArticleComment" // 添加评论

  
}

// 微信request请求promise封装
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
        } else if (res.data.errno == 1000) {
          reject(res.data);
        } else {
          console.log("错误信息", res.data);
          reject(res.data);
        }
      },
      fail(err) {
        console.log(err)
        reject(err);
      }
    })
  })

}

module.exports = {
  severRequest: severRequest
}