const jsonwebtoken = require('jsonwebtoken');
const { randomString, aesEncrypt, aesDecrypt } = require("../commonUtils");

module.exports = class extends think.Controller {
  // 生成随机字符串做加密key
  getAesKeyAction() {
    let str = randomString(16);
    this.cookie("aesKey", str);
    this.success(str, "加密key获取成功");
  }
  // 登录
  async indexAction() {
    let aesKey = this.cookie("aesKey");
    const userList = await this.model("admin/login").getUser();
    const { account, password } = this.post();

    // const userInfo = {
    //   name: userList
    // };
    // const { secret, cookie, expire } = this.config('jwt');
    // 生成token
    // const token = jsonwebtoken.sign(userInfo, secret, { expiresIn: expire });
    // this.cookie(cookie, token);
    // this.success({ token: token, userName: account }, "登录成功！");

    try {
      userList.forEach(el => {
        // 解密
        let psw = aesDecrypt(password, aesKey, aesKey)
        // 校验账号密码
        if (el.account == account && el.password == psw) {
          const userInfo = {
            name: userList
          };
          const { secret, cookie, expire } = this.config('jwt');
          // 生成token
          const token = jsonwebtoken.sign(userInfo, secret, { expiresIn: expire });
          this.cookie(cookie, token);
          this.success({ token: token, userName: account }, "登录成功！");
        } else {
          this.fail("账号或密码不正确");
        }
      });
    }
    catch (err) {
      this.assign("data", {
        title: "登录错误",
        description: "登录错误"
      })
      await this.display("errorPage");
    }
  }
  // 登录检测
  isLoginAction() {
    if (this.ctx.state.user && this.ctx.state.user.name) {
      this.success({ userName: this.ctx.state.user.name }, "已登录");
    } else {
      this.fail("未登录");
    }
  }
  // 退出登录
  logoutAction() {
    const { secret, cookie, expire } = this.config('jwt');
    this.cookie(cookie, null);
    this.success("", "退出登录成功");
  }
};
