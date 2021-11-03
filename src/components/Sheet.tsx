import React, { Fragment, useEffect, useRef, useCallback } from 'react';
import axios from 'axios';
import { Sheet as StyledSheet } from '@themes';

import { getColumnName } from '@utils/helper';
import Cell from './Cell';

import { CellValueType, DataSheet, CellValueTypeByIndex, IRootState } from '@types';
import { useDispatch, useSelector } from 'react-redux';
import { setData } from '@redux/actions';
interface SheetProps {
  dataJson: DataSheet | null;
  inputIndex: string;
  textInput: string;
  setTextInput: (text: string) => void;
}

type CallbackType = (...args: any) => void;

const Sheet: React.FC<SheetProps> = ({ dataJson, textInput, inputIndex, setTextInput }) => {
  const sheetIndex = 0;
  const dispatch = useDispatch();
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
                fetchData[`${rowI}${getColumnName(column.charCodeAt(0) - columnI)}`] = element[prop].value;
                i++;
              }
            }
            dispatch(setData(sheetIndex, fetchData));
          }
        });
      } else {
        const newData: DataSheet = { ...data };
        newData[`${row}${column}`] = value;
        if (typeof value === 'string') {
          setTextInput(value);
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
        console.log(newData);
        if (value !== '') {
          newData[`${inputIndex}`] = value;
          dispatch(setData(sheetIndex, newData));
        } else {
          delete newData[`${inputIndex}`];
          dispatch(setData(sheetIndex, newData));
        }
      }
    },
    [data, setData]
  );

  const computeCell = useCallback<CallbackType>(
    ({ row, column }: CellValueType) => {
      const cellContent: string | undefined = data[`${row}${column}`];
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

  return (
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
                      rowIndex={i}
                      columnIndex={j}
                      columnName={columnName}
                      setCellValue={setCellValue}
                      currentValue={data[`${i}${columnName}`]}
                      computeCell={computeCell}
                      key={`${columnName}${i}`}
                    />
                  );
                })}
            </Fragment>
          );
        })}
    </StyledSheet>
  );
};

export default Sheet;
