/* eslint-disable @typescript-eslint/no-non-null-assertion */
import { Action } from '@enums';
import { IUserState } from '@types';
import { UserActions } from './actions';

const initialState: IUserState = {
  userId: '',
  menu: '',
  userAction: Action.NoAction,
};

export const userReducer = (state: IUserState = initialState, action: UserActions) => {
  switch (action.type) {
    case 'SET_USER_ACTION': {
      const userId = action.payload.userId;
      console.log(userId)
      const menu = action.payload.menu;
      const userAction = action.payload.menu;
      return { ...state, userId: userId, menu: menu, userAction: userAction };
    }
    default:
      return state;
  }
};
