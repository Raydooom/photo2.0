const request = require("request-promise");

module.exports = class extends think.Controller {
  async loginAction() {
    let { code } = this.post();

    // 获取openid和session_key
    let options = {
      method: "GET",
      url: "https://api.weixin.qq.com/sns/jscode2session",
      qs: {
        grant_type: "authorization_code",
        js_code: code,
        appid: this.config("wx.appId"),
        secret: this.config("wx.appSecret")
      }
    }
    let loginInfo = await request(options);

    

  }
}