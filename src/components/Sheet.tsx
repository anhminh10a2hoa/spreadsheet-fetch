import React, { Fragment, useEffect, useRef, useCallback, useState } from 'react';
import axios from 'axios';
import IconButton from '@mui/material/IconButton';
import AddCircleOutlineIcon from '@mui/icons-material/AddCircleOutline';
import { Sheet as StyledSheet, BottomNavBar, SheetLink } from '@themes';
import { BrowserRouter as Router } from "react-router-dom";
import { getColumnName } from '@utils/helper';
import Cell from './Cell';

import { CellValueType, DataSheet, CellValueTypeByIndex, IRootState } from '@types';
import { useDispatch, useSelector } from 'react-redux';
import { setData, addSheet } from '@redux/actions';
interface SheetProps {
  dataJson: DataSheet | null;
  inputIndex: string;
  textInput: string;
  sheetIndex: number;
  setTextInput: (text: string) => void;
}

type CallbackType = (...args: any) => void;

const Sheet: React.FC<SheetProps> = ({ dataJson, textInput, inputIndex, sheetIndex, setTextInput }) => {
  const dispatch = useDispatch();
  const [count, setCount] = useState(3);
  const [savedCount, setSavedCount] = useState<any>([]);
  const saveCount = () => {
    setSavedCount(prev => [...prev, { id: count }]);
  };
  const row = useSelector((state: IRootState) => state.sheetReducer.data[sheetIndex].row);
  const column = useSelector((state: IRootState) => state.sheetReducer.data[sheetIndex].column);
  const data = useSelector((state: IRootState) => state.sheetReducer.data[sheetIndex].dataSheet);
  const tableElement = useRef(null);
  const sparqlUrl = import.meta.env.VITE_PROJECT_WARE_SPARQL;

  useEffect(() => {
    if (inputIndex !== '' && inputIndex) {
      setCellValueByIndex({
        inputIndex: inputIndex,
        value: textInput
      });
    }
  }, [textInput, inputIndex]);

  useEffect(() => {
    if (dataJson) {
      if (window.confirm('Are you sure you want to import the data?')) {
        // Save it!
        dispatch(setData(sheetIndex, dataJson));
      }
    }
  }, [dataJson]);

  useEffect(() => {
    saveCount()
  }, [count]);
console.log(data)
  const setCellValue = useCallback<CallbackType>(
    ({ row, column, value }: CellValueType) => {
      if (typeof value === 'string' && value.includes("fetch('") && value.includes("')")) {
        const query: Array<string> = value.split("fetch('");
        axios.get(`${sparqlUrl}&query=${query[1].substring(0, query[1].length - 2)}`).then((res) => {
          if (Array.isArray(res.data.results.bindings)) {
            const fetchData: DataSheet = { ...data };
            for (const [index, element] of res.data.results.bindings.entries()) {
              // fetchData[`${parseInt(columnStart)}${getColumnName(1 + index)}`] =
              let i = 0;
              for (const prop in element) {
                const rowI: number = row + index;
                const columnI: number = 64 - i;
                fetchData[`${getColumnName(column.charCodeAt(0) - columnI)}${rowI}`] = element[prop].value;
                i++;
              }
            }
            dispatch(setData(sheetIndex, fetchData));
          }
        });
      } else {
        const newData: DataSheet = { ...data };
        newData[`${column}${row}`] = value;
        if (typeof value === 'string') {
          setTextInput(value)
        }
        dispatch(setData(sheetIndex, newData));
      }
    },
    [data, setData]
  );

  const setCellValueByIndex = useCallback<CallbackType>(
    ({ inputIndex, value }: CellValueTypeByIndex) => {
      if (typeof value === 'string' && value.includes("fetch('") && value.includes("')")) {
        const query: Array<string> = value.split("fetch('");
        axios.get(`${sparqlUrl}&query=${query[1].substring(0, query[1].length - 2)}`).then((res) => {
          if (Array.isArray(res.data.results.bindings)) {
            const fetchData: DataSheet = { ...data };
            for (const element of res.data.results.bindings.entries()) {
              for (const prop in element) {
                fetchData[`${inputIndex}`] = element[prop].value;
              }
            }
            dispatch(setData(sheetIndex, fetchData));
          }
        });
      } else {
        const newData: DataSheet = { ...data };
        if(value !== "") {
          newData[`${inputIndex}`] = value;
          dispatch(setData(sheetIndex, newData));
        } else {
          delete newData[`${inputIndex}`]
          dispatch(setData(sheetIndex, newData));
        }
      }
    },
    [data, setData]
  );

  const computeCell = useCallback<CallbackType>(
    ({ row, column }: CellValueType) => {
      const cellContent: string | undefined = data[`${column}${row}`];
      if (cellContent) {
        if (cellContent?.charAt(0) === '=') {
          // This regex converts = "A1+A2" to ["A1","+","A2"]
          const expression: Array<string> = cellContent.substring(1).split(/([+*-/])/g);
          let subStitutedExpression = '';
          expression.forEach((item: any) => {
            // Regex to test if it is of form alphabet followed by number ex: A1
            if (/^[0-9].*[A-z]$/g.test(item || '')) {
              subStitutedExpression += data[(item || '').toUpperCase()] || 0;
            } else {
              subStitutedExpression += item;
            }
          });

          // @shame: Need to comeup with parser to replace eval and to support more expressions
          try {
            // eslint-disable-next-line
            return eval(subStitutedExpression);
          } catch (error) {
            return 'ERROR!';
          }
        }
        return cellContent;
      }
      return '';
    },
    [data]
  );

  const setSheetCounter = () => {
    setCount(count + 1)
    dispatch(addSheet())
  }
  console.log();
  

  return (
    <>
    <StyledSheet numberOfColumns={column} ref={tableElement}>
      {Array(row)
        .fill(0)
        .map((_, i: number) => {
          return (
            <Fragment key={i}>
              {Array(column)
                .fill(0)
                .map((_, j: number) => {
                  const columnName: string = getColumnName(j);
                  return (
                    <Cell
                      sheetIndex={sheetIndex}
                      rowIndex={i}
                      columnIndex={j}
                      columnName={columnName}
                      setCellValue={setCellValue}
                      currentValue={data[`${columnName}${i}`]}
                      computeCell={computeCell}
                      key={`${columnName}${i}`}
                    />
                  );
                })}
            </Fragment>
          );
        })}
    </StyledSheet>
    <BottomNavBar>
    <Router>
    <SheetLink to="/" >Sheet 1</SheetLink>
    <SheetLink to="2">Sheet 2</SheetLink>
    <SheetLink to="3">Sheet 3</SheetLink>
    {savedCount.filter((_, index: number) => index !== 0 ).map((c, i: number) => (
      <SheetLink to={c.id.toString()}>Sheet {c.id}</SheetLink>
    ))}
    </Router>
    <IconButton aria-label="add" size="large">
        <AddCircleOutlineIcon size="large" color='info' onClick={() => setSheetCounter()} />
    </IconButton>
    </BottomNavBar>
    </>
  );
};

export default Sheet;
