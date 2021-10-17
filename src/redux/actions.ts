export type ChangeRowColumnAction = { type: 'CHANGE_ROW_AND_COLUMN'; payload: ChangeRowColumn };
export type SetDataAction = { type: 'SET_DATA'; payload: DataSheet };

type ChangeRowColumn = {
  row: number;
  column: number;
};

export type DataSheet = {
  [key: string]: number | string | any;
};

export const changeRowAndColumn = (rowAndColumn: ChangeRowColumn): ChangeRowColumnAction => ({
  type: 'CHANGE_ROW_AND_COLUMN',
  payload: rowAndColumn
});
