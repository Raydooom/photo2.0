const {
  severRequest
} = require("api/index");
const {
  wxPromise
} = require("/utils/wxUtils.js");
const {
  Promise
} = require("/utils/external/es6-promise.min.js");

App({
  wxLogin() {
    return new Promise((resolve, reject) => {
      // 获取code码
      wxPromise(wx.login).then(loginRes => {
        // 获取用户信息
        wxPromise(wx.getUserInfo, {
          lang: "zh_CN",
        }).then(res => {
          let data = {
            code: loginRes.code,
            userInfo: res.userInfo
          }
          severRequest("login", data).then(res => {
            this.globalData.isLogin = true;
            wx.setStorageSync("token", res.data);
            resolve();
          })
        })
      })
    })
  },
  onLaunch() {
    this.wxLogin();
  },
  globalData: {
    isLogin: wx.getStorageSync("token") ? true : false
  }
})