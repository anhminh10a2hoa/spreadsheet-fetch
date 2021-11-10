import { ChangeRowColumn, ChangeRowColumnById, DataSheet, IUserState } from '@types';

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

interface ResetSheetByIndexAction {
  type: 'RESET_SHEET_BY_INDEX';
  payload: { id: number };
}

interface UserChangeAction {
  type: 'SET_USER_ACTION';
  payload: IUserState;
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

<<<<<<< HEAD
export const resetSheet = (id: number): ResetSheetByIndexAction => ({
  type: 'RESET_SHEET_BY_INDEX',
  payload: { id: id }
});

export const setUserAction = (user: IUserState): UserChangeAction => ({
  type: 'SET_USER_ACTION',
  payload: user
});

export type SheetActions = ChangeRowColumnByIndexAction | SetDataByIndexAction | DeleteSheetByIndexAction | ResetSheetByIndexAction;
export type UserActions = UserChangeAction;
=======
export const addSheet = () => ({
  type: 'ADD_SHEET',
});

export type Actions = ChangeRowColumnByIndexAction | SetDataByIndexAction | DeleteSheetByIndexAction;
>>>>>>> bugfix/fix-simple-input-function
