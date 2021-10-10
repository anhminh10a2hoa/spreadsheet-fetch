import React, { useState } from 'react';
import './App.css';
import { Reset } from 'styled-reset';
import { AppContainer, Button, InputWrapper, NumberInput, Label, Title } from "./styles";

import { getColumnName } from "./utils/helper";
import Sheet from './components/Sheet';

const App: React.FC = () => {
  const [numberOfRows, setNumberOfRows] = useState<number>(30)
  const [numberOfColumns, setNumberOfColumns] = useState<number>(30)
  const [tempRow, setTempRow] = useState<number>(numberOfRows)
  const [tempColumn, setTempColumn] = useState<number>(numberOfColumns)
  const simpleHandlerFunc = React.useRef<any>(null)

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
    const {row, column} = simpleHandlerFunc.current()
    console.log(row, column)
    if(numberOfRows !== row && row > 2) {
      setNumberOfRows(row)
    }
    if(numberOfColumns !== column && column > 2) {
      setNumberOfColumns(column)
    }
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
     
      </InputWrapper>
      <AppContainer>
        <Reset />
        <Sheet numberOfRows={numberOfRows} numberOfColumns={numberOfColumns} simpleHandlerFunc={simpleHandlerFunc}/>
      </AppContainer>
    </>
  );
}

export default App;
