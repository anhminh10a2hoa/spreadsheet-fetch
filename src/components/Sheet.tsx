import React, { useState, Fragment, useEffect, useRef, useCallback } from 'react';
import axios from 'axios';
import { Sheet as StyledSheet } from '../styles';

import { getColumnName, getColumnIndex } from '../utils/helper';
import Cell from './Cell';

import { CellValueType, DataFormatSave, CellValueTypeByIndex } from '../types/types';
import { NotesState } from '../redux/sheetReducer';
import { useSelector } from 'react-redux';
interface SheetProps {
  getData: any;
  simpleRowAndColumn: DataFormatSave;
  dataJson: DataFormatSave | null;
  inputIndex: string;
  textInput: string;
}

type CallbackType = (...args: any) => void;

const Sheet: React.FC<SheetProps> = ({ getData, simpleRowAndColumn, dataJson, textInput, inputIndex }) => {
  const row = useSelector((state: NotesState) => state.row);
  const column = useSelector((state: NotesState) => state.column);
  const [data, setData] = useState<DataFormatSave>({});
  const tableElement = useRef(null);
  const sparqlUrl = import.meta.env.VITE_PROJECT_WARE_SPARQL;

  useEffect(() => {
    if (data) {
      getData.current = data;
    }
  }, [data]);

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
        setData(dataJson);
      }
    }
  }, [dataJson]);

  useEffect(() => {
    const newData: DataFormatSave = {};
    for (const item in data) {
      // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
      const row = parseInt(item.match(/^\d+|\d+\b|\d+(?=\w)/g)![0]);
      const column = item.toString().substring(row.toString().length, item.length);
      newData[
        `${row - simpleRowAndColumn['startRow']}${getColumnName(
          getColumnIndex(column) - simpleRowAndColumn['startCol']
        )}`
      ] = data[item];
    }
    setData(newData);
  }, [simpleRowAndColumn]);

  const setCellValue = useCallback<CallbackType>(
    ({ row, column, value }: CellValueType) => {
      if (typeof value === 'string' && value.includes("fetch('") && value.includes("')")) {
        const query: Array<string> = value.split("fetch('");
        axios.get(`${sparqlUrl}&query=${query[1].substr(0, query[1].length - 2)}`).then((res) => {
          if (Array.isArray(res.data.results.bindings)) {
            const fetchData: DataFormatSave = { ...data };
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
            setData(fetchData);
          }
        });
      } else {
        const newData: DataFormatSave = { ...data };
        newData[`${row}${column}`] = value;
        if (document.getElementById('long-text-input')) {
          (document.getElementById('long-text-input') as any).value = value;
        }
        setData(newData);
      }
    },
    [data, setData]
  );

  const setCellValueByIndex = useCallback<CallbackType>(
    ({ inputIndex, value }: CellValueTypeByIndex) => {
      if (typeof value === 'string' && value.includes("fetch('") && value.includes("')")) {
        const query: Array<string> = value.split("fetch('");
        axios.get(`${sparqlUrl}&query=${query[1].substr(0, query[1].length - 2)}`).then((res) => {
          if (Array.isArray(res.data.results.bindings)) {
            const fetchData: DataFormatSave = { ...data };
            for (const element of res.data.results.bindings.entries()) {
              for (const prop in element) {
                fetchData[`${inputIndex}`] = element[prop].value;
              }
            }
            setData(fetchData);
          }
        });
      } else {
        const newData: DataFormatSave = { ...data };
        newData[`${inputIndex}`] = value;
        setData(newData);
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
          const expression: Array<string> = cellContent.substr(1).split(/([+*-/])/g);
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
