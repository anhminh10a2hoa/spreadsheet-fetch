import { FC, LazyExoticComponent } from 'react';
import { Action, RouteType } from '@enums';

export type ViewComponentProps = LazyExoticComponent<FC>;
export type RouteComponent = ViewComponentProps | FC;

export type ChangeRowColumn = {
  row: number;
  column: number;
};

export type ChangeRowColumnById = {
  rowAndColumn: ChangeRowColumn;
  id: number;
};

export type DataSheet = {
  [key: string]: number | string | any;
};

export type SheetState = {
  id: number;
  row: number;
  column: number;
  dataSheet: DataSheet;
};

export type IUserState = {
  userId: string;
  menu: string;
  userAction: Action;
}

export type InputEvent = React.ChangeEvent<HTMLInputElement>;

export type DownloadFileType = {
  data: BlobPart;
  fileName: string;
  fileType: string;
};

export type CellValueType = {
  row: number;
  column: string;
  value?: number | string;
};

export type CellValueTypeByIndex = {
  inputIndex: string;
  value?: number | string;
};

export interface Route {
  path: string;
  component: RouteComponent;
  type: RouteType;
}

export interface IRootState {
  sheetReducer: ISheetState;
  userReducer: IUserState
}

export interface ISheetState {
  data: Array<SheetState>;
}

export interface IToastObject {
  type: string;
  message: string;
  open: boolean;
}