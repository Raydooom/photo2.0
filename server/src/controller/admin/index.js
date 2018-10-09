module.exports = class extends think.Controller {
  __before() {
    const { secret, cookie, expire } = this.config('jwt');
    const userToken = this.header('jwt-token');
    if (this.ctx.state.user && this.ctx.state.user.name) {
      if (userToken != this.cookie(cookie)) {
        this.fail("登录信息异常");
        return false;
      }
    } else {
      this.fail("未登录");
      return false;
    }
  }
  indexAction() {
    this.success("123")
  }
}