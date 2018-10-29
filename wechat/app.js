const {
  severRequest
} = require("api/index");

App({
  onLaunch: function() {
    // 登录
    wx.login({
      success: res => {
        // 发送 res.code 到后台换取 openId, sessionKey, unionId
        severRequest("login", {
          code: res.code
        }).then(res => {
          console.log(res.errmsg)
        })
      }
    })
    // 必须是在用户已经授权的情况下调用
    wx.getUserInfo({
      withCredentials: true,
      lang: "zh_CN",
      success: function(res) {
        console.log(res)
      }
    })
  }
})