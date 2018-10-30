const jwt = require('jsonwebtoken');

module.exports = class extends think.Service {
  createToken(openid) {
    let token = jwt.sign({ token: openid }, "12314123");
    console.log(token)
    return token;
  }
  getToken() {
    return think.cookie("token")
  }
};
