const {
  severRequest
} = require("../../api/index");
Page({

  /**
   * 页面的初始数据
   */
  data: {
    articleList: "",
    loading: true
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onShow: function(options) {
    severRequest("getCollectArticle").then(res => {
      this.setData({
        articleList: res.data,
        loading: false
      })
    })
  }
})