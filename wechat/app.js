const {
  severRequest
} = require("api/index");

App({
  wxLogin() {
    wx.login({
      success: (codeRes) => {
        wx.getUserInfo({
          lang: "zh_CN",
          success: (res) => {
            let data = {
              code: codeRes.code,
              userInfo: res.userInfo
            }
            severRequest("login", data).then(res => {
              this.globalData.isLogin = res.data;
              wx.setStorageSync("token", res.data);
            })
          }
        })
      }
    })
  },
  onLaunch() {
    this.wxLogin();
  },
  globalData: {
    isLogin: ""
  }
})