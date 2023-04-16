import CryptoJS from 'crypto-js';

const secretKey = `${process.env.REACT_APP_ENCRPT_SECRETKEY}`;

export function encrypt(data) {
  return CryptoJS.AES.encrypt(JSON.stringify(data), secretKey).toString();
}

export function decrypt(encryptedData) {
  const bytes = CryptoJS.AES.decrypt(encryptedData, secretKey);
  return JSON.parse(bytes.toString(CryptoJS.enc.Utf8));
}
