import { Action } from '@enums';
import CryptoJS from 'crypto-js';

export const decryptUserId = (userId: string): string => {
  const secretKey = import.meta.env.VITE_SECRET_KEY?.toString();
  if(secretKey && secretKey !== '') {
    return JSON.parse(CryptoJS.AES.decrypt(userId, secretKey).toString(CryptoJS.enc.Utf8)).password;
  }
  return '';
}

export const convertActionToEnumType = (action: string): Action => {
  if(action === '' || !action) {
    return Action.NoAction
  } else if(action.toUpperCase() === 'POST') {
    return Action.Post
  } else if(action.toUpperCase() === 'GET') {
    return Action.Get
  } else if(action.toUpperCase() === 'UPDATE' || action.toUpperCase() === 'EDIT') {
    return Action.Update
  } else { 
    return Action.NoAction
  }
}