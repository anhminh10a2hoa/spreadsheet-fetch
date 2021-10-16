import { Action } from "./actions"

export interface NotesState {
  row: number;
  column: number;
}

const initialState = {
  row:  localStorage.getItem("row") ? parseInt(localStorage.getItem("row")!) : 31,
  column: localStorage.getItem("column") ? parseInt(localStorage.getItem("column")!) : 31
}

export const sheetReducer = (state:NotesState = initialState, action: Action) => {
  switch(action.type){
    case "CHANGE_ROW_AND_COLUMN": {
      localStorage.setItem("row", action.payload.row.toString())
      localStorage.setItem("column", action.payload.column.toString())
      return {...state, row: action.payload.row, column: action.payload.column}
    }
    default:
      return state
  }
}