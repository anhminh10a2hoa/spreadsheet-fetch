import { createStore, combineReducers } from 'redux';
import { sheetReducer } from './sheetReducer';
import { userReducer } from './userReducer';
import { IRootState } from '@types';


const reducers = combineReducers({ sheetReducer, userReducer });

export const store = createStore(reducers);
