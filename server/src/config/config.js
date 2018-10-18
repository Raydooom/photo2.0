// default config
module.exports = {
  workers: 1,
  jwt: {
    secret: 'lushijie-password',
    cookie: 'jwt-token',
    expire: 3600 // 秒
  },
};
