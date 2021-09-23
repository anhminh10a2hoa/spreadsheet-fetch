import React from 'react';
import './App.css';
import { Reset } from 'styled-reset';
import Sheet from './components/Sheet';
import { AppContainer } from "./styles";


const App: React.FC = () => {
  return (
    <AppContainer>
      <Reset />
      <Sheet numberOfRows={101} numberOfColumns={27} />
    </AppContainer>
  );
}

export default App;
