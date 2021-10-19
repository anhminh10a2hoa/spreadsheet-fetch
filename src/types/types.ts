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
