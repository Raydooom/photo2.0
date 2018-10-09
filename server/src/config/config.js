// default config
module.exports = {
  workers: 1,
  jwt: {
    secret: 'lushijie-password',
    cookie: 'jwt-token',
    expire: 30 // 秒
  },
};
