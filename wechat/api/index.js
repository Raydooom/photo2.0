import Promise from "../utils/external/es6-promise.min";

const HOST = "http://localhost:8360";

const api = {
  getBanner: "/api/index/getBanner",  // 获取banner
  articleList: "/api/index/getArticleList", // 获取文章列表
  articleComments: "/api/author/getArticleComment", // 获取文章评论
  addArticleComment: "/api/author/addArticleComment",  // 发布评论
}

function severRequest(apiKey, params = {}, method = "POST") {
  return new Promise((resolve, reject) => {
    wx.request({
      url: HOST + api[apiKey],
      method: method,
      data: params,
      success(res) {
        console.log(res.data);
        resolve(res.data);
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

