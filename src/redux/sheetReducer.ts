/* eslint-disable @typescript-eslint/no-non-null-assertion */
import { ISheetState } from '@types';
import { SheetActions } from './actions';

const initialState: ISheetState = {
  data:
    localStorage.getItem('data') === null
      ? [{ row: 31, column: 31, dataSheet: {}, id: 0 },{ row: 31, column: 31, dataSheet: {}, id: 1 }, { row: 31, column: 31, dataSheet: {}, id: 2 }]
      : JSON.parse(localStorage.getItem('data')!)
};

export const sheetReducer = (state: ISheetState = initialState, action: SheetActions) => {
  switch (action.type) {
    case 'CHANGE_ROW_AND_COLUMN_BY_INDEX': {
      const id = action.payload.id;
      const newData = state.data;
      if (state.data) {
        const objIndex = state.data.findIndex((x) => x.id === id);
        if (newData) {
          newData[id].row = action.payload.rowAndColumn.row;
          newData[id].column = action.payload.rowAndColumn.column;
        }
      }
      //localStorage.setItem('data', JSON.stringify(newData));
      return { ...state, data: newData };
    }
    case 'SET_DATA_BY_INDEX': {
      const id = action.payload.id;
      const newData = state.data;
      if (state.data) {
        if (newData) {
          newData[id].dataSheet = action.payload.data;
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
    case 'RESET_SHEET_BY_INDEX': {
      const id = action.payload.id;
      const newData = state.data;
      newData[id].dataSheet = {}
      newData[id].row = 31
      newData[id].column = 31
    }
    case 'ADD_SHEET': {
      const newData = [...state.data, { row: 31, column: 31, dataSheet: {}, id: (state.data.length - 1) }]
      return { ...state, data: newData };
    }
    default:
      return state;
  }
};
