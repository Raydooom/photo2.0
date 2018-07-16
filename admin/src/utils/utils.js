import crypto from 'crypto';

// md5 加密
const md5Encrypt = string => {
  let md5 = crypto.createHash('md5');
  md5.update(string);
  return md5.digest('hex');
}

export {
  md5Encrypt
}
