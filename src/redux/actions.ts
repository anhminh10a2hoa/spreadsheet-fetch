import { ChangeRowColumn, ChangeRowColumnById, DataSheet, UserState } from '@types';

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

interface UserChangeAction {
  type: 'SET_USER_ACTION';
  payload: UserState;
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

export type SheetActions = ChangeRowColumnByIndexAction | SetDataByIndexAction | DeleteSheetByIndexAction;
export type UserActions = UserChangeAction;
