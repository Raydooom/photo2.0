
const jwt = require('jsonwebtoken');

module.exports = class extends think.Controller {
  // 登录校验
  async __before() {
    let token = this.header("token");
    if (token) {
      let userId = this.verifyUserId(token);
      const userResult = await this.model('api/index').getUser({ id: userId });
      if (userResult.id) {
        think.logger.info('校验登录成功');
      } else {
        this.fail("用户不存在");
        return false;
      }
    } else {
      this.fail("未登录");
      return false;
    }
  }

  // 校验openid
  verifyUserId(token) {
    const { secret } = this.config('jwt');
    let userId = jwt.verify(token, secret).userId;
    think.logger.info(`userId解析结果：${userId}`)
    return userId;
  }
}