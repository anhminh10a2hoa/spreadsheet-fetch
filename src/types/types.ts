export type DataFormatSave = {
  [key:string]: number | string | any;
}

export type InputEvent = React.ChangeEvent<HTMLInputElement>

export type DownloadFileType = {
  data: BlobPart,
  fileName: string,
  fileType: string
}

export type CellValueType = {
  row: number;
  column: string;
  value?: number | string;
}