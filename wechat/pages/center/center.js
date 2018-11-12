const {
  severRequest
} = require("../../api/index");
const {
  wxToast
} = require("../../utils/wxUtils.js");
const app = getApp();

Page({
  data: {
    userInfo: "",
    isLogin: app.globalData.isLogin || false
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad() {

  },
  onShow() {
    if (this.data.isLogin) {
      this.getUserInfo();
    } else {
      this.login();
    }
  },
  login() {
    app.wxLogin().then(() => {
      this.setData({
        isLogin: app.globalData.isLogin
      })
      this.getUserInfo();
      wxToast("登录成功");
    })
  },
  getUserInfo() {
    severRequest("getUserInfo").then(res => {
      this.setData({
        userInfo: res.data
      })
    }).catch(err => {
      console.log(err);
    })
  }
})