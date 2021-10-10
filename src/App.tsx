import React, { useState } from 'react';
import './App.css';
import { Reset } from 'styled-reset';
import { AppContainer, Button, InputWrapper, NumberInput, Label, Title } from "./styles";

import { getColumnIndex } from "./utils/helper";
import Sheet from './components/Sheet';

type SimpleRowAndColumn = {
  [key:string]: number | string;
}

const App: React.FC = () => {
  const [numberOfRows, setNumberOfRows] = useState<number>(30)
  const [numberOfColumns, setNumberOfColumns] = useState<number>(30)
  const [tempRow, setTempRow] = useState<number>(numberOfRows)
  const [tempColumn, setTempColumn] = useState<number>(numberOfColumns)
  const [simpleRowAndColumn, setSimpleRowAndColumn] = useState<SimpleRowAndColumn>({})
  const [resetData, setResetData] = useState<number>(0)
  const getData = React.useRef<any>(null)

  const handleChangeNumberOfRows = (event: React.ChangeEvent<HTMLInputElement>): void => {
    event.preventDefault();
    const row: number = parseInt(event.target.value)
    setTempRow(row)
  }

  const handleChangeNumberOfColumns = (event: React.ChangeEvent<HTMLInputElement>): void => {
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
    const data = getData.current
    const firstKey = Object.keys(data)[0];
    const lastKey = Object.keys(data)[Object.keys(data).length - 1];
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
     
      </InputWrapper>
      <AppContainer>
        <Reset />
        <Sheet numberOfRows={numberOfRows} numberOfColumns={numberOfColumns} getData={getData} resetData={resetData} simpleRowAndColumn={simpleRowAndColumn}/>
      </AppContainer>
    </>
  );
}

export default App;
