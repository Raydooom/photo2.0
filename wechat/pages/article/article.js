const {
  severRequest
} = require("../../api/index");
const {
  wxToast
} = require("../../utils/wxUtils.js");
const WxParse = require('../../wxParse/wxParse.js');
const app = getApp();

Page({

  /**
   * 页面的初始数据
   */
  data: {
    id: "",
    articleDetail: "",
    isLogin: true
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {
    this.setData({
      id: options.id
    });
    severRequest("getArticle", {
      id: options.id
    }).then(res => {
      this.setData({
        articleDetail: res.data
      })
      let articleContent = res.data.content;
      WxParse.wxParse('article', 'html', articleContent, this, 5);
    })
  },
  // 点赞
  addPraise(e) {
    if (app.globalData.isLogin) {
      let data = {
        id: this.data.id,
      }
      severRequest("addPraise", data).then(res => {
        let praises = "articleDetail.praises";
        let isPraise = "articleDetail.isPraise";
        this.setData({
          [praises]: res.data.praises,
          [isPraise]: res.data.isPraise
        })
        wxToast(res.errmsg);
      })
    } else {
      this.setData({
        isLogin: app.globalData.isLogin
      })
    }

  },
  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function() {

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function() {

  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function() {

  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function() {

  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function() {

  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function() {

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function() {

  }
})