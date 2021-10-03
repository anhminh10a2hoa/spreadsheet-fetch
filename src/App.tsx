import React, { useState } from 'react';
import './App.css';
import { Reset } from 'styled-reset';
import Sheet from './components/Sheet';
import { AppContainer, Button, InputWrapper, NumberInput, Label, Title } from "./styles";


const App: React.FC = () => {
  const [numberOfRows, setNumberOfRows] = useState<number>(150)
  const [numberOfColumns, setNumberOfColumns] = useState<number>(27)
  const [tempRow, setTempRow] = useState<number>(numberOfRows)
  const [tempColumn, setTempColumn] = useState<number>(numberOfColumns)

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

  const submitChange = (event: any):void => {
    event.preventDefault();
    if(tempRow < 2 || tempColumn < 2) {
      alert('Column and Row must be greater than 2')
    } else {
      setNumberOfRows(tempRow)
      setNumberOfColumns(tempColumn)
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
     
      </InputWrapper>
      <AppContainer>
        <Reset />
        <Sheet numberOfRows={numberOfRows} numberOfColumns={numberOfColumns} />
      </AppContainer>
    </>
  );
}

export default App;
