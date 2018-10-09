const jsonwebtoken = require('jsonwebtoken');

module.exports = class extends think.Controller {
  indexAction() {
    let { user, password } = this.post();
    if (user == user) {
      const userInfo = {
        name: user
      };
      const { secret, cookie, expire } = this.config('jwt');
      const token = jsonwebtoken.sign(userInfo, secret, { expiresIn: expire });
      this.cookie(cookie, token);
      this.success({ token: token, userName: user }, "登录成功！");
    }
  }
  isLoginAction() {
    const { secret, cookie, expire } = this.config('jwt');
    const userToken = this.header('jwt-token');
    if (this.ctx.state.user && this.ctx.state.user.name) {
      if (userToken == this.cookie(cookie)) {
        this.success({ userName: this.ctx.state.user.name }, "已登录");
      } else {
        this.fail("token值错误");
      }
    } else {
      this.fail("未登录");
    }
  }
  logoutAction() {
    const { secret, cookie, expire } = this.config('jwt');
    this.cookie(cookie, null);
    this.success("", "退出登录成功");
  }
};
