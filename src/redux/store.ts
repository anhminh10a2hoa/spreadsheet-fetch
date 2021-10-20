import { createStore } from 'redux';
import { sheetReducer } from './sheetReducer';

export const store = createStore(sheetReducer);
