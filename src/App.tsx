import React, { useState, useRef, useEffect, FC } from 'react';
import './App.css';
import { Reset } from 'styled-reset';
import { AppContainer, InputExtensionContainer, NumberInput, Label, Navbar, Title, IconContainer, SaveIcon, OpenIcon, ResetIcon, SetupContainer, ChangeIcon, SimpleIcon, OpenIconContainer, InputHidden, EditFileName, TextInput, IndexInput, BarrierIcon } from "./styles";

import { getColumnIndex } from "./utils/helper";
import Sheet from './components/Sheet';

import { DataFormatSave, InputEvent, DownloadFileType } from "./types/types";

const App: FC = () => {
  const [numberOfRows, setNumberOfRows] = useState<number>(30)
  const [numberOfColumns, setNumberOfColumns] = useState<number>(30)
  const [tempRow, setTempRow] = useState<number>(numberOfRows)
  const [tempColumn, setTempColumn] = useState<number>(numberOfColumns)
  const [simpleRowAndColumn, setSimpleRowAndColumn] = useState<DataFormatSave>({})
  const [resetData, setResetData] = useState<number>(0)
  const [fileName, setFileName] = useState<string>("sheet 1")
  const [dataJson, setDataJson] = useState<DataFormatSave | null>(null)
  const [inputIndex, setInputIndex] = React.useState("");
  const [textInput, setTextInput] = React.useState("");
  const getData = useRef<DataFormatSave>({})

  useEffect(() => {
    const interval = setInterval(() => {
      const active = document.activeElement as HTMLInputElement | null
      if(active?.classList.contains("cell-input")) {
        setInputIndex(active.id)
        setTextInput(active.value)
      }
    }, 500);
    return () => clearInterval(interval);
  }, []);

  const handleChangeNumberOfRows = (event: InputEvent): void => {
    event.preventDefault();
    const row: number = parseInt(event.target.value)
    setTempRow(row)
  }

  const handleChangeNumberOfColumns = (event: InputEvent): void => {
    event.preventDefault();
    const column: number = parseInt(event.target.value)
    setTempColumn(column)
  }

  const submitChange = ():void => {
    if(tempRow < 2 || tempColumn < 2) {
      alert('Column and Row must be greater than 2')
    } else {
      setNumberOfRows(tempRow)
      setNumberOfColumns(tempColumn)
    }
  }

  const simpleHandler = ():void => {
    const data: DataFormatSave = getData.current
    const firstKey: string = Object.keys(data)[0];
    const lastKey: string = Object.keys(data)[Object.keys(data).length - 1];
    if(firstKey) {
      const firstRow: number = parseInt(firstKey.match(/^\d+|\d+\b|\d+(?=\w)/g)![0])
      const firstColumn: string = firstKey.toString().substring(firstRow.toString().length, firstKey.length)
      const lastRow: number = parseInt(lastKey.match(/^\d+|\d+\b|\d+(?=\w)/g)![0])
      const lastColumn: string = lastKey.toString().substring(lastRow.toString().length, lastKey.length)
      setSimpleRowAndColumn({
        'startRow':firstRow - 1,
        'startCol':getColumnIndex(firstColumn) - getColumnIndex('A')
      })
      const startRow = lastRow - firstRow === 0 ? 2 : lastRow - firstRow + 2
      const startCol = getColumnIndex(lastColumn) - getColumnIndex(firstColumn) === 0 ? 2 : getColumnIndex(lastColumn) - getColumnIndex(firstColumn) + 2
      if(numberOfRows !== startRow) {
        setNumberOfRows(startRow)
        setTempRow(startRow - 1)
      }
      if(numberOfColumns !== startCol) {
        setNumberOfColumns(startCol)
        setTempColumn(startCol - 1)
      }
    }
  }

  const resetHandler = ():void => {
    const times: number = resetData + 1
    setResetData(times)
    setNumberOfRows(31)
    setTempRow(30)
    setNumberOfColumns(31)
    setTempColumn(30)
  }

  const downloadFile = ({ data, fileName, fileType }:DownloadFileType) => {
    // Create a blob with the data we want to download as a file
    const blob = new Blob([data], { type: fileType })
    // Create an anchor element and dispatch a click event on it
    // to trigger a download
    const a: HTMLAnchorElement = document.createElement('a')
    a.download = fileName
    a.href = window.URL.createObjectURL(blob)
    const clickEvt = new MouseEvent('click', {
      view: window,
      bubbles: true,
      cancelable: true,
    })
    a.dispatchEvent(clickEvt)
    a.remove()
  }

  const exportJsonHandler = (event: React.MouseEvent<any>):void => {
    event.preventDefault()
    const data: DataFormatSave = getData.current
    downloadFile({
      data: JSON.stringify(data),
      fileName: fileName + '.json',
      fileType: 'text/json',
    })
  }

  const importJsonHandler = (e: any) => {
    const fileReader = new FileReader();
    if(e.target.files[0].type === 'application/json') {
      fileReader.readAsText(e.target.files[0], "UTF-8");
      fileReader.onload = e => {
        if(e.target?.result) {
          const dataObj = JSON.parse(e.target?.result as string)
          setDataJson(dataObj)
        }
        else {
          alert('Something went wrong with the file')
        }
      };
    }
    else {
      alert('Please import JSON file')
    }
  };

  const textInputHandler = (e: any) => {
    e.preventDefault()
    setTextInput(e.target.value)
  }

  const inputIndexHandler = (e: any) => {
    e.preventDefault()
    //empty
  }

  return (
    <React.Fragment> 
      <Navbar>
        <IconContainer>
          <SaveIcon onClick={exportJsonHandler}/>
          <ResetIcon onClick={resetHandler}/>
          <SimpleIcon onClick={simpleHandler}/>
          <OpenIconContainer>
            <label htmlFor="file-input">
              <OpenIcon />
            </label>
            <InputHidden id="file-input" type="file" onChange={importJsonHandler} />
          </OpenIconContainer>
          <EditFileName />
        </IconContainer>
        <SetupContainer>
          <Label>
            rows
          </Label>
          <NumberInput placeholder="Rows" type="number" value={tempRow} onChange={handleChangeNumberOfRows} />
          <Label>
            columns
          </Label>
          <NumberInput placeholder="Columns" type="number" value={tempColumn} onChange={handleChangeNumberOfColumns} />
          <ChangeIcon onClick={submitChange}/>
        </SetupContainer>
        <Title>Spreadsheet - {fileName}</Title>
      </Navbar>
      <InputExtensionContainer>
        <IndexInput type="text" value={inputIndex} onChange={inputIndexHandler}/>
        <BarrierIcon />
        <TextInput type="text" value={textInput} onChange={textInputHandler}/>
      </InputExtensionContainer>
      <AppContainer>
        <Reset />
        <Sheet numberOfRows={numberOfRows} numberOfColumns={numberOfColumns} getData={getData} resetData={resetData} simpleRowAndColumn={simpleRowAndColumn} dataJson={dataJson} inputIndex={inputIndex} textInput={textInput}/>
      </AppContainer>
    </React.Fragment>
  );
}

export default App;
