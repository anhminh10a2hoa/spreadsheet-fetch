import React, { useState, Fragment, useEffect, useRef, useCallback } from "react";
import axios from "axios";
import { Sheet as StyledSheet } from "../styles";

import { getColumnName, getColumnIndex } from "../utils/helper";
import Cell from "./Cell";

import { CellValueType, DataFormatSave, CellValueTypeByIndex } from "../types/types";
interface SheetProps {
  numberOfRows: number;
  numberOfColumns: number;
  getData: any;
  resetData: number;
  simpleRowAndColumn: DataFormatSave;
  dataJson: DataFormatSave | null;
  inputIndex: string;
  textInput: string;
}

type CallbackType = (...args: any) => void


const Sheet: React.FC<SheetProps> = ({ numberOfRows, numberOfColumns, getData, simpleRowAndColumn, resetData, dataJson, textInput, inputIndex }) => {
  const [data, setData] = useState<DataFormatSave>({});
  const [activeIndex, setActiveIndex] = useState<number | null>(null);
  const tableElement = useRef(null);

  useEffect(() => {
    if(data) {
      getData.current = data
    }
  }, [data])

  useEffect(() => {
    setData({})
  }, [resetData])

  useEffect(() => {
    if(inputIndex !== "" && inputIndex) {
      setCellValueByIndex({
        inputIndex: inputIndex,
        value: textInput
      })
    }
  }, [textInput, inputIndex])

  useEffect(() => {
    if(dataJson) {
      if (window.confirm('Are you sure you want to import the data?')) {
        // Save it!
        setData(dataJson);
      }
    }
  }, [dataJson])

  useEffect(() => {
    const newData: DataFormatSave = {};
    for (const item in data) {
      const row = parseInt(item.match(/^\d+|\d+\b|\d+(?=\w)/g)![0])
      const column = item.toString().substring(row.toString().length, item.length)
      newData[`${row-simpleRowAndColumn['startRow']}${getColumnName(getColumnIndex(column)-simpleRowAndColumn['startCol'])}`] = data[item]
    }
    setData(newData)
  }, [simpleRowAndColumn])

  const setCellValue = React.useCallback<CallbackType>(
    ({ row, column, value }: CellValueType) => {
      if(typeof value === 'string' && value.includes("fetch('") && value.includes("')")) {
        const query: Array<string> = value.split("fetch('")
        axios.get(`${process.env.REACT_APP_PROJECT_WARE_SPARQL}&query=${query[1].substr(0, query[1].length - 2)}`).then((res) => {
          if(Array.isArray(res.data.results.bindings)) {
            const fetchData: DataFormatSave = { ...data };
            for (const [index, element] of res.data.results.bindings.entries()) {
              // fetchData[`${parseInt(columnStart)}${getColumnName(1 + index)}`] = 
              let i = 0;
              for (const prop in element) {
                const rowI: number = row + index
                const columnI: number = 64 - i
                fetchData[`${rowI}${getColumnName(column.charCodeAt(0) - columnI)}`] = element[prop].value
                i++;
              }
            }
            setData(fetchData);
          }
        })
      } else {
        const newData: DataFormatSave = { ...data };
        newData[`${row}${column}`] = value;
        if(document.getElementById('long-text-input')) {
          (document.getElementById('long-text-input') as any).value = value;
        }
        setData(newData);
      }
    },
    [data, setData]
  );

  const setCellValueByIndex = React.useCallback<CallbackType>(
    ({ inputIndex, value }: CellValueTypeByIndex) => {
      if(typeof value === 'string' && value.includes("fetch('") && value.includes("')")) {
        const query: Array<string> = value.split("fetch('")
        axios.get(`${process.env.REACT_APP_PROJECT_WARE_SPARQL}&query=${query[1].substr(0, query[1].length - 2)}`).then((res) => {
          if(Array.isArray(res.data.results.bindings)) {
            const fetchData: DataFormatSave = { ...data };
            for (const [index, element] of res.data.results.bindings.entries()) {
              // fetchData[`${parseInt(columnStart)}${getColumnName(1 + index)}`] = 
              let i = 0;
              for (const prop in element) {
                fetchData[`${inputIndex}`] = element[prop].value
                i++;
              }
            }
            setData(fetchData);
          }
        })
      } else {
        const newData: DataFormatSave = { ...data };
        newData[`${inputIndex}`] = value;
        setData(newData);
      }
    },
    [data, setData]
  );

  const computeCell = React.useCallback<CallbackType>(
    ({ row, column }: CellValueType) => {
      const cellContent: string | undefined = data[`${row}${column}`];
      if (cellContent) {
        if (cellContent?.charAt(0) === "=") {
          // This regex converts = "A1+A2" to ["A1","+","A2"]
          const expression: Array<string> = cellContent.substr(1).split(/([+*-])/g);

          let subStitutedExpression: string = "";

          expression.forEach((item:any) => {
            // Regex to test if it is of form alphabet followed by number ex: A1
            if (/^[A-z][0-9]$/g.test(item || "")) {
              subStitutedExpression += data[(item || "").toUpperCase()] || 0;
            } else {
              subStitutedExpression += item;
            }
          });

          // @shame: Need to comeup with parser to replace eval and to support more expressions
          try {
            // eslint-disable-next-line
            return eval(subStitutedExpression);
          } catch (error) {
            return "ERROR!";
          }
        }
        return cellContent;
      }
      return "";
    },
    [data]
  );

  const mouseDown = (index: number) => {
    setActiveIndex(index);
  };


  //  const mouseMove = (e: any) => {
  //    //
  //  }

  // const removeListeners = useCallback(() => {
  //   window.removeEventListener("mousemove", mouseMove);
  //   window.removeEventListener("mouseup", removeListeners);
  // }, [mouseMove]);

  // const mouseUp = useCallback(() => {
  //   setActiveIndex(null);
  //   removeListeners();
  // }, [setActiveIndex, removeListeners]);

  // useEffect(() => {
  //   if (activeIndex !== null) {
  //     window.addEventListener("mousemove", mouseMove);
  //     window.addEventListener("mouseup", mouseUp);
  //   }

  //   return () => {
  //     removeListeners();
  //   };
  // }, [activeIndex, mouseMove, mouseUp, removeListeners]);


  return (
    <StyledSheet numberOfColumns={numberOfColumns} ref={tableElement}>
      {Array(numberOfRows)
        .fill(0)
        .map((_, i: number) => {
          return (
            <Fragment key={i}>
              {Array(numberOfColumns)
                .fill(0)
                .map((_, j: number) => {
                  const columnName: string = getColumnName(j);
                  return (
                    <>
                    
                    <Cell
                      rowIndex={i}
                      columnIndex={j}
                      columnName={columnName}
                      setCellValue={setCellValue}
                      currentValue={data[`${i}${columnName}`]}
                      computeCell={computeCell}
                      key={`${columnName}${i}`}
                      numOfCol={numberOfColumns}
                      numOfRow={numberOfRows}
                      //onMouseDown={() => mouseDown(i)}
                    />
                   
                    </>
                  );
                })}
            </Fragment>
          );
        })}
    </StyledSheet>
  );
};

export default Sheet;