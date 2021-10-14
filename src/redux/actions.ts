export type Action = { type: "CHANGE_ROW_AND_COLUMN"; payload: ChangeRowColumn };

type ChangeRowColumn = {
  row: number;
  column: number;
}

export const addNote = (rowAndColumn: ChangeRowColumn): Action => ({
  type: "CHANGE_ROW_AND_COLUMN",
  payload: rowAndColumn,
});