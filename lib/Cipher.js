const crypto = require("crypto-js");
const key = "123|a123123123123123@&";
const Cipher = {};

Cipher.Encrypt = function(text){
    const crypted = crypto.AES.encrypt(text, key);
    return crypted;
  };
  Cipher.Decrypt = function(text){
    const decrypted = crypto.AES.decrypt(text.toString(), key);
    return decrypted.toString(crypto.enc.Utf8);
  };

module.exports = Cipher;