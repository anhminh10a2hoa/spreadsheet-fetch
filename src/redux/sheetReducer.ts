/* eslint-disable @typescript-eslint/no-non-null-assertion */
import { SheetState } from '@types';
import { Actions } from './actions';

export interface Data {
  data: Array<SheetState>;
}

const initialState: Data = {
  data:
    localStorage.getItem('data') === null
      ? [{ row: 31, column: 31, dataSheet: {}, id: 0 }]
      : JSON.parse(localStorage.getItem('data')!)
};

export const sheetReducer = (state: Data = initialState, action: Actions) => {
  switch (action.type) {
    case 'CHANGE_ROW_AND_COLUMN_BY_INDEX': {
      const id = action.payload.id;
      const newData = state.data;
      if (state.data) {
        const objIndex = state.data.findIndex((x) => x.id === id);
        if (newData) {
          newData[objIndex].row = action.payload.rowAndColumn.row;
          newData[objIndex].column = action.payload.rowAndColumn.column;
        }
      }
      localStorage.setItem('data', JSON.stringify(newData));
      return { ...state, data: newData };
    }
    case 'SET_DATA_BY_INDEX': {
      const id = action.payload.id;
      const newData = state.data;
      if (state.data) {
        const objIndex = state.data.findIndex((x) => x.id === id);
        if (newData) {
          newData[objIndex].dataSheet = action.payload.data;
        }
      }
      localStorage.setItem('data', JSON.stringify(newData));
      return { ...state, data: newData };
    }
    case 'DELETE_SHEET_BY_INDEX': {
      const id = action.payload.id;
      const newData = state.data;
      newData.splice(id, 1);
      return { ...state, data: newData };
    }
    default:
      return state;
  }
};
