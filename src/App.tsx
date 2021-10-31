import React, { useState, useRef, useEffect, FC } from 'react';
import './App.css';
import { Reset } from 'styled-reset';

import Tooltip from '@mui/material/Tooltip';
import { getColumnIndex, getColumnName, useActiveElement } from '@utils/helper';
import Sheet from '@components/Sheet';
import IconButton from '@mui/material/IconButton';
import { InputEvent, DownloadFileType, DataSheet, IRootState, IToastObject } from '@types';
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
  GithubIcon,
  ActionIcon
} from '@themes';
import { useDispatch, useSelector } from 'react-redux';
import { changeRowAndColumn, setData, setUserAction, resetSheet } from '@redux/actions';
import { convertActionToEnumType, decryptUserId } from '@utils/auth';
import { PROJECTERP_DATA_01, saveSheetData } from '@controllers/RootClassController';
import CustomizedSnackbars from '@components/alert/CustomizedSnackbars';

const App: FC = () => {
  const dispatch = useDispatch();
  const sheetIndex = 0;
  const row = useSelector((state: IRootState) => state.sheetReducer.data[sheetIndex].row);
  const column = useSelector((state: IRootState) => state.sheetReducer.data[sheetIndex].column);
  const data = useSelector((state: IRootState) => state.sheetReducer.data[sheetIndex].dataSheet);
  const [tempRow, setTempRow] = useState<number>(row - 1);
  const [tempColumn, setTempColumn] = useState<number>(column - 1);
  const [fileName] = useState<string>('sheet ' + sheetIndex);
  const [dataJson, setDataJson] = useState<DataSheet | null>(null);
  const [inputIndex, setInputIndex] = React.useState<string>('');
  const [textInput, setTextInput] = React.useState<string>('');
  const userId = useSelector((state: IRootState) => state.userReducer.userId);
  const menu = useSelector((state: IRootState) => state.userReducer.menu);
  const userAction = useSelector((state: IRootState) => state.userReducer.userAction);
  const focusedElement = useActiveElement() as HTMLInputElement | null;
  const [toastObj, setToastObj] = useState<IToastObject>({type: "", message: "", open: false})

  useEffect(() => {
    if (focusedElement) {
      if (focusedElement?.classList.contains('cell-input')) {
        setInputIndex(focusedElement.id);
        setTextInput(focusedElement.value);
      }
    }
  }, [focusedElement]);

  useEffect(() => {
    const searchKey = import.meta.env.VITE_SEARCH_KEY?.toString();
    const searchQueryArray = window.location.search.split(searchKey + "&")
    const userIdEncrypted = searchQueryArray.find((item) => item.includes('userId='))
    const menuQuery = searchQueryArray.find((item) => item.includes('menu='))
    const actionQuery = searchQueryArray.find((item) => item.includes('action='))
    let userId, menu, action;
    if(userIdEncrypted && userIdEncrypted.includes('?userId=')) {
      userId = userIdEncrypted.replace('?userId=', '')
    } else if(userIdEncrypted && userIdEncrypted.includes('userId=')) {
      userId = userIdEncrypted.replace('userId=', '')
    } else {
      userId = ''
    }
    if(menuQuery && menuQuery.includes('?menu=')) {
      menu = menuQuery.replace('?menu=', '')
    } else if(menuQuery && menuQuery.includes('menu=')) {
      menu = menuQuery.replace('menu=', '')
    } else {
      menu = ''
    }
    if(actionQuery && actionQuery.includes('?action=')) {
      action = actionQuery.replace('?action=', '')
    } else if(actionQuery && actionQuery.includes('action=')) {
      action = actionQuery.replace('action=', '')
    } else {
      action = ''
    }
    
    dispatch(setUserAction({userId: decryptUserId(userId), userAction: convertActionToEnumType(action), menu: menu}));
  }, [])

  const handleChangeNumberOfRows = (event: InputEvent): void => {
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
      setToastObj({'type': 'error', 'message': 'Column and Row must be greater than 2', 'open': true});
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
    dispatch(resetSheet(sheetIndex))
    setTextInput('');
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
          setToastObj({'type': 'error', 'message': 'Something went wrong with the file', 'open': true});
        }
      };
    } else {
      setToastObj({'type': 'warning', 'message': 'Please import JSON file', 'open': true});
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

  const actionHandler = async(e: any) => {
    e.preventDefault();
    if(PROJECTERP_DATA_01 && typeof PROJECTERP_DATA_01 == 'string') {
      if(!userId || userId === '') {
        setToastObj({'type': 'error', 'message': 'User id not found', 'open': true});
      } else {
        if(!data || Object.keys(data).length === 0) {
          setToastObj({'type': 'error', 'message': 'Data must not be empty', 'open': true});
        } else {
          const res = await saveSheetData(PROJECTERP_DATA_01, userId, "http://www.ekseli.fi/data", JSON.stringify(data), true)
          console.log(res)
          setToastObj(res);
        }
      }
    }
  }

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

          <Tooltip title="Action">
            <IconButton color="inherit">
              <ActionIcon onClick={actionHandler}/>
            </IconButton>
          </Tooltip>
        </IconContainer>
        <SetupContainer>
          <Tooltip title="Number of rows: ">
            <IconButton color="inherit">
              <RowIcon />
            </IconButton>
          </Tooltip>
          <NumberInput placeholder="Rows" type="number" value={tempRow} onChange={handleChangeNumberOfRows} />
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
        <Sheet dataJson={dataJson} inputIndex={inputIndex} textInput={textInput} setTextInput={setTextInput} />
      </AppContainer>
      <CustomizedSnackbars toastObj={toastObj}/>
    </React.Fragment>
  );
};

export default App;

