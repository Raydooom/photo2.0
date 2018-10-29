// default config
module.exports = {
  workers: 1,
  jwt: {
    secret: '123456789',
    cookie: 'jwt-token',
    appToken: "token",
    expire: 60 * 60 * 24 * 3 // 秒
  },
  wx: {
    appId: "wx2984c3354dfc51d6",
    appSecret: "97edbc9d20107e9ad1fc9fc466d1c4b8",
  }
};
