
const jwt = require('jsonwebtoken');

module.exports = class extends think.Controller {
  // 登录校验
  async __before() {
    let token = this.header("token");
    if (token) {
      let openid = await this.verifyOpenid(token);
      const userResult = await this.model('api/index').getUser({ openid: openid });
      if (userResult.id) {
        think.logger.info('校验登录成功');
      } else {
        this.fail("用户不存在")
      }
    } else {
      this.fail("未登录");
      return
    }
  }

  // 校验openid
  async verifyOpenid(token) {
    const { secret } = this.config('jwt');
    let openid = jwt.verify(token, secret).openid;
    think.logger.info(`openid解析结果：${openid}`)
    return openid;
  }
}