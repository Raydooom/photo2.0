const {
  severRequest
} = require("../../api/index");
const app = getApp();
Page({

  /**
   * 页面的初始数据
   */
  data: {
    userInfo: "",
    isLogin: false
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad() {
    this.setData({
      isLogin: app.globalData.isLogin ? true : false
    })
  },
  onShow: function(options) {
    severRequest("getUserInfo").then(res => {
      this.setData({
        userInfo: res.data
      })
    }).catch(err => {
      console.log(err);
    })
  },
  bindGetUserInfo(res) {
    console.log(res)
  },
  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function() {

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