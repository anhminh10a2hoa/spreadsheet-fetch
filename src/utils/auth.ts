import CryptoJS from 'crypto-js';

export const decryptUserId = (password: string): string => {
  const secretKey = import.meta.env.VITE_SECRET_KEY?.toString();
  if(secretKey && secretKey !== '') {
    return CryptoJS.AES.decrypt(password, secretKey).toString();
  }
  return '';
}