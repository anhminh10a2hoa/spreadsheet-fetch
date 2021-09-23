import React from 'react';
import './App.css';
import { Reset } from 'styled-reset';
import Sheet from './components/Sheet';

const App: React.FC = () => {
  return (
    <>
      <Reset />
      <Sheet numberOfRows={10} numberOfColumns={10} />
    </>
  );
}

export default App;
