import React, { useState, useRef, useEffect, FC } from 'react';
import './App.css';
import { Reset } from 'styled-reset';

import Tooltip from '@mui/material/Tooltip';
import { getColumnIndex, getColumnName, useActiveElement } from '@utils/helper';
import Sheet from '@components/Sheet';
import IconButton from '@mui/material/IconButton';
import { InputEvent, DownloadFileType, DataSheet } from '@types';
import {
  AppContainer,
  InputExtensionContainer,
  NumberInput,
  Navbar,
  Title,
  IconContainer,
  SaveIcon,
  OpenIcon,
  ResetIcon,
  SetupContainer,
  ChangeIcon,
  SimpleIcon,
  InputHidden,
  EditFileName,
  TextInput,
  IndexInput,
  BarrierIcon,
  RowIcon,
  ColumnIcon,
  GithubIcon
} from '@themes';
import { useDispatch, useSelector } from 'react-redux';
import { Data } from '@redux/sheetReducer';
import { changeRowAndColumn, setData } from '@redux/actions';

const App: FC = () => {
  const dispatch = useDispatch();
  const sheetIndex = 0;
  const row = useSelector((state: Data) => state.data[sheetIndex].row);
  const column = useSelector((state: Data) => state.data[sheetIndex].column);
  const data = useSelector((state: Data) => state.data[sheetIndex].dataSheet);
  const [tempRow, setTempRow] = useState<number>(row - 1);
  const [tempColumn, setTempColumn] = useState<number>(column - 1);
  const [fileName] = useState<string>('sheet 1');
  const [dataJson, setDataJson] = useState<DataSheet | null>(null);
  const [inputIndex, setInputIndex] = React.useState<string>('');
  const [textInput, setTextInput] = React.useState<string>('');
  const getData = useRef<DataSheet>({});
  const focusedElement = useActiveElement() as HTMLInputElement | null;

  useEffect(() => {
    if (focusedElement) {
      if (focusedElement?.classList.contains('cell-input')) {
        setInputIndex(focusedElement.id);
        setTextInput(focusedElement.value);
      }
    }
  }, [focusedElement]);

  useEffect(() => {
    console.log(window.location.search)
    
  }, [])

  const handleChangerows = (event: InputEvent): void => {
    event.preventDefault();
    const row: number = parseInt(event.target.value);
    setTempRow(row);
  };

  const handleChangeNumberOfColumns = (event: InputEvent): void => {
    event.preventDefault();
    const column: number = parseInt(event.target.value);
    setTempColumn(column);
  };

  const submitChange = (): void => {
    if (tempRow < 2 || tempColumn < 2) {
      alert('Column and Row must be greater than 2');
    } else {
      dispatch(changeRowAndColumn(sheetIndex, { row: tempRow + 1, column: tempColumn + 1 }));
    }
  };

  const simpleHandler = (): void => {
    let firstKey: string = Object.keys(data)[0];
    let lastKey: string = Object.keys(data)[Object.keys(data).length - 1];
    for (const item in data) {
      if (
        data[item] !== '' &&
        parseInt(item) <= parseInt(firstKey) &&
        getColumnIndex(item.toString().substring(parseInt(item).toString().length, item.length)) <=
          getColumnIndex(firstKey.toString().substring(parseInt(firstKey).toString().length, firstKey.length))
      ) {
        firstKey = item;
      }
      if (
        data[item] !== '' &&
        parseInt(item) >= parseInt(lastKey) &&
        getColumnIndex(item.toString().substring(parseInt(item).toString().length, item.length)) >=
          getColumnIndex(lastKey.toString().substring(parseInt(lastKey).toString().length, lastKey.length))
      ) {
        lastKey = item;
      }
    }
    if (firstKey) {
      const firstRow: number = parseInt(firstKey);
      const firstColumn: string = firstKey.toString().substring(firstRow.toString().length, firstKey.length);
      // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
      const lastRow: number = parseInt(lastKey.match(/^\d+|\d+\b|\d+(?=\w)/g)![0]);
      const lastColumn: string = lastKey.toString().substring(lastRow.toString().length, lastKey.length);
      const newData: DataSheet = {};
      for (const item in data) {
        // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
        const row = parseInt(item.match(/^\d+|\d+\b|\d+(?=\w)/g)![0]);
        const column = item.toString().substring(row.toString().length, item.length);
        newData[`${row - firstRow + 1}${getColumnName(getColumnIndex(column) - getColumnIndex('A') - 1)}`] = data[item];
      }
      dispatch(setData(sheetIndex, newData));
      const startRow = lastRow - firstRow === 0 ? 2 : lastRow - firstRow + 1;
      const startCol =
        getColumnIndex(lastColumn) - getColumnIndex(firstColumn) === 0
          ? 2
          : getColumnIndex(lastColumn) - getColumnIndex(firstColumn) + 1;
      if (row !== startRow || column !== startCol) {
        dispatch(changeRowAndColumn(sheetIndex, { row: startRow, column: startCol }));
        setTempRow(startRow - 1);
        setTempColumn(startCol - 1);
      }
    }
  };

  const resetHandler = (): void => {
    dispatch(changeRowAndColumn(sheetIndex, { row: 31, column: 31 }));
    setTempRow(30);
    setTempColumn(30);
  };

  const downloadFile = ({ data, fileName, fileType }: DownloadFileType) => {
    // Create a blob with the data we want to download as a file
    const blob = new Blob([data], { type: fileType });
    // Create an anchor element and dispatch a click event on it
    // to trigger a download
    const a: HTMLAnchorElement = document.createElement('a');
    a.download = fileName;
    a.href = window.URL.createObjectURL(blob);
    const clickEvt = new MouseEvent('click', {
      view: window,
      bubbles: true,
      cancelable: true
    });
    a.dispatchEvent(clickEvt);
    a.remove();
  };

  const exportJsonHandler = (event: React.MouseEvent<any>): void => {
    event.preventDefault();
    const data: DataSheet = getData.current;
    downloadFile({
      data: JSON.stringify(data),
      fileName: fileName + '.json',
      fileType: 'text/json'
    });
  };

  const importJsonHandler = (e: any) => {
    const fileReader = new FileReader();
    if (e.target.files[0].type === 'application/json') {
      fileReader.readAsText(e.target.files[0], 'UTF-8');
      fileReader.onload = (e) => {
        if (e.target?.result) {
          const dataObj = JSON.parse(e.target?.result as string);
          setDataJson(dataObj);
        } else {
          alert('Something went wrong with the file');
        }
      };
    } else {
      alert('Please import JSON file');
    }
  };

  const textInputHandler = (e: any) => {
    e.preventDefault();
    setTextInput(e.target.value);
  };

  const inputIndexHandler = (e: any) => {
    e.preventDefault();
    //empty
  };

  const githubHandler = () => {
    window.open('https://github.com/anhminh10a2hoa/spreadsheet-fetch', '_blank');
  };

  return (
    <React.Fragment>
      <Navbar>
        <IconContainer>
          <Tooltip title="Save">
            <IconButton color="inherit" size="medium">
              <SaveIcon onClick={exportJsonHandler} />
            </IconButton>
          </Tooltip>

          <Tooltip title="Reset">
            <IconButton color="inherit">
              <ResetIcon onClick={resetHandler} />
            </IconButton>
          </Tooltip>

          <Tooltip title="Simple Input Mode">
            <IconButton color="inherit">
              <SimpleIcon onClick={simpleHandler} />
            </IconButton>
          </Tooltip>

          <Tooltip title="Import Json">
            <IconButton color="inherit">
              <label htmlFor="file-input">
                <OpenIcon />
              </label>
              <InputHidden id="file-input" type="file" onChange={importJsonHandler} />
            </IconButton>
          </Tooltip>

          <Tooltip title="Edit file">
            <IconButton color="inherit">
              <EditFileName />
            </IconButton>
          </Tooltip>

          <Tooltip title="Github link">
            <IconButton color="inherit">
              <GithubIcon onClick={githubHandler} />
            </IconButton>
          </Tooltip>
        </IconContainer>
        <SetupContainer>
          <Tooltip title="Number of rows: ">
            <IconButton color="inherit">
              <RowIcon />
            </IconButton>
          </Tooltip>
          <NumberInput placeholder="Rows" type="number" value={tempRow} onChange={handleChangerows} />
          <Tooltip title="Number of columns: ">
            <IconButton color="inherit">
              <ColumnIcon />
            </IconButton>
          </Tooltip>
          <NumberInput placeholder="Columns" type="number" value={tempColumn} onChange={handleChangeNumberOfColumns} />
          <Tooltip title="Change">
            <IconButton color="inherit" size="medium">
              <ChangeIcon onClick={submitChange} />
            </IconButton>
          </Tooltip>
        </SetupContainer>
        <Title>Spreadsheet - {fileName}</Title>
      </Navbar>
      <InputExtensionContainer>
        <IndexInput type="text" value={inputIndex} onChange={inputIndexHandler} />
        <BarrierIcon />
        <TextInput type="text" value={textInput} onChange={textInputHandler} id="long-text-input" />
      </InputExtensionContainer>
      <AppContainer>
        <Reset />
        <Sheet getData={getData} dataJson={dataJson} inputIndex={inputIndex} textInput={textInput} />
      </AppContainer>
    </React.Fragment>
  );
};

export default App;
