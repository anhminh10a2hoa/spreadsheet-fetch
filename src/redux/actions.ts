import { ChangeRowColumn, ChangeRowColumnById, DataSheet } from '../types/types';

interface ChangeRowColumnByIndexAction {
  type: 'CHANGE_ROW_AND_COLUMN_BY_INDEX';
  payload: ChangeRowColumnById;
}
interface SetDataByIndexAction {
  type: 'SET_DATA_BY_INDEX';
  payload: DataSheet;
}

interface DeleteSheetByIndexAction {
  type: 'DELETE_SHEET_BY_INDEX';
  payload: { id: number };
}

export const changeRowAndColumn = (id: number, rowAndColumn: ChangeRowColumn): ChangeRowColumnByIndexAction => ({
  type: 'CHANGE_ROW_AND_COLUMN_BY_INDEX',
  payload: { id: id, rowAndColumn: rowAndColumn }
});

export const setData = (id: number, data: DataSheet): SetDataByIndexAction => ({
  type: 'SET_DATA_BY_INDEX',
  payload: { id: id, data: data }
});

export const deleteSheet = (id: number): DeleteSheetByIndexAction => ({
  type: 'DELETE_SHEET_BY_INDEX',
  payload: { id: id }
});

export type Actions = ChangeRowColumnByIndexAction | SetDataByIndexAction | DeleteSheetByIndexAction;
