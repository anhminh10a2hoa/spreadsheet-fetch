import CryptoJS from 'crypto-js';

export const encryptUserId = (password: string): string => {
  const secretKey = import.meta.env.VITE_SECRET_KEY?.toString();
  if(secretKey && secretKey !== '') {
    return CryptoJS.AES.encrypt(password, secretKey).toString();
  }
  return CryptoJS.AES.encrypt(password, "").toString();
}