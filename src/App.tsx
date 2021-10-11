import React, { useState, useRef, FC } from 'react';
import './App.css';
import { Reset } from 'styled-reset';
import { AppContainer, Button, InputWrapper, NumberInput, Label, Title } from "./styles";

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
  const getData = useRef<DataFormatSave>({})

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
        'startRow':firstRow,
        'startCol':getColumnIndex(firstColumn) - getColumnIndex('A')
      })
      if(numberOfRows !== lastRow - firstRow && lastRow - firstRow > 2) {
        setNumberOfRows(lastRow - firstRow + 1)
        setTempRow(lastRow - firstRow)
      }
      if(numberOfColumns !== getColumnIndex(lastColumn) - getColumnIndex(firstColumn) + 2 && getColumnIndex(lastColumn) - getColumnIndex(firstColumn) + 2 > 2) {
        setNumberOfColumns(getColumnIndex(lastColumn) - getColumnIndex(firstColumn) + 2)
        setTempColumn(getColumnIndex(lastColumn) - getColumnIndex(firstColumn) + 1)
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

  const exportJsonHandler = (event: React.MouseEvent<HTMLButtonElement>):void => {
    event.preventDefault()
    const data: DataFormatSave = getData.current
    downloadFile({
      data: JSON.stringify(data),
      fileName: 'users.json',
      fileType: 'text/json',
    })
  }

  return (
    <> 
      <Title>Fetch Sheet</Title>
      <InputWrapper>
      <Label>
        Number of rows:
      </Label>
      <NumberInput placeholder="Rows" type="number" value={tempRow} onChange={handleChangeNumberOfRows} />
      
      <Label>
        Number of columns:
      </Label>
        <NumberInput placeholder="Columns" type="number" value={tempColumn} onChange={handleChangeNumberOfColumns} />
     
      <Button type="button" onClick={submitChange}>Change</Button>
      <Button type="button" onClick={simpleHandler}>Simple</Button>
      <Button type="button" onClick={resetHandler}>Reset</Button>
      <Button type="button" onClick={exportJsonHandler}>Export JSON</Button>
     
      </InputWrapper>
      <AppContainer>
        <Reset />
        <Sheet numberOfRows={numberOfRows} numberOfColumns={numberOfColumns} getData={getData} resetData={resetData} simpleRowAndColumn={simpleRowAndColumn}/>
      </AppContainer>
    </>
  );
}

export default App;
