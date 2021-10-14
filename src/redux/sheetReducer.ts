import { Action } from "./actions"

export interface NotesState {
  row: number;
  column: number;
}

const initialState = {
  row: 30,
  column: 30
}

export const sheetReducer = (state:NotesState = initialState, action: Action) => {
  switch(action.type){
    case "CHANGE_ROW_AND_COLUMN": {
      return {...state, row: action.payload.row, column: action.payload.column}
    }
    default:
      return state
  }
}