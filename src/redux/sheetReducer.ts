/* eslint-disable @typescript-eslint/no-non-null-assertion */
import { DataFormatSave } from '../types/types';
import { Action } from './actions';

export interface SheetState {
  row: number;
  column: number;
  data: DataFormatSave;
}

const initialState = {
  row: localStorage.getItem('row') ? parseInt(localStorage.getItem('row')!) : 31,
  column: localStorage.getItem('column') ? parseInt(localStorage.getItem('column')!) : 31,
  data: localStorage.getItem('data') ? JSON.parse(localStorage.getItem('data')!) : {}
};

export const sheetReducer = (state: SheetState = initialState, action: Action) => {
  switch (action.type) {
    case 'CHANGE_ROW_AND_COLUMN': {
      localStorage.setItem('row', action.payload.row.toString());
      localStorage.setItem('column', action.payload.column.toString());
      return { ...state, row: action.payload.row, column: action.payload.column };
    }
    case 'SET_DATA': {
      localStorage.setItem('data', JSON.stringify(action.payload));
      return { ...state, data: JSON.stringify(action.payload) };
    }
    default:
      return state;
  }
};
