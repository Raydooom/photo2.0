import Promise from "../utils/external/es6-promise.min";

// const HOST = "http://localhost:8360";
const HOST = "http://192.168.1.110:8360";

const api = {
  getBanner: "/api/index/getBanner", // 获取banner
  getKindList: "/api/index/getKindList", // 获取分类列表
  getKindArticle: "/api/index/getKindArticle", // 获取分类下文章列表
  getArticle: "/api/index/getArticle", // 根据文章ID获取文章详情
  articleComments: "/api/author/getArticleComment", // 获取文章评论
  addArticleComment: "/api/author/addArticleComment", // 发布评论
}

function severRequest(apiKey, params = {}, method = "POST") {
  return new Promise((resolve, reject) => {
    wx.request({
      url: HOST + api[apiKey],
      method: method,
      data: params,
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