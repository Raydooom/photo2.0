// default config
module.exports = {
  workers: 1,
  jwt: {
    secret: 'lushijie-password',
    cookie: 'jwt-token',
    expire: 60 * 60 * 24 * 3 // 秒
  },
};
