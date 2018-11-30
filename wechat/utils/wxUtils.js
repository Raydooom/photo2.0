const Promise = require("./external/es6-promise.min.js");

// promise封装微信官方api方法
const wxPromise = (wxApi, options) => {
  return new Promise((resolve, reject) => {
    wxApi({
      ...options,
      success: (res) => {
        resolve(res)
      },
      fail: (err) => {
        reject(err)
      }
    })
  })
}
// 微信弹框
const wxToast = (text, icon) => {
  wx.showToast({
    title: text,
    mask: true,
    icon: icon ? "icon" : "none",
    duration: 1500
  })
}

module.exports = {
  wxPromise: wxPromise,
  wxToast: wxToast,
}