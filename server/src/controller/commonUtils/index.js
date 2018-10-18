const crypto = require('crypto');

/**
 * 生成随机字符串
 * @param {number} len 生成随机字符串的长度 
 */
export const randomString = (len) => {
  let length = len || 32;
  let $chars = 'ABCDEFGHJKMNPQRSTWXYZabcdefhijkmnprstwxyz2345678';    /****默认去掉了容易混淆的字符oOLl,9gq,Vv,Uu,I1****/
  let maxPos = $chars.length;
  let str = '';
  for (i = 0; i < length; i++) {
    str += $chars.charAt(Math.floor(Math.random() * maxPos));
  }
  return str;
}
/**
 * 加密
 * @param {string} data 待加密字符串
 * @param {string} key 
 * @param {string} iv 
 * @returns {String} 加密后字符串
 */
export const aesEncrypt = (data, key, iv) => {
  let cipher = crypto.createCipheriv('aes-128-cbc', key, iv);
  return cipher.update(data, 'utf8', 'hex') + cipher.final('hex');
}

/**
 * 解密
 * @param {string} crypted 
 * @param {string} key 
 * @param {string} iv 
 * @returns {string} 
 */
export const aesDecrypt = (crypted, key, iv) => {
  let decipher = crypto.createDecipheriv('aes-128-cbc', key, iv);
  return decipher.update(crypted, 'hex', 'utf8') + decipher.final('utf8');
}