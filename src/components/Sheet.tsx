import React, { useState, useCallback, Fragment } from "react";

import Cell from "./Cell";
import { Sheet as StyledSheet } from "../styles";

const getColumnName = (index: number) =>
  String.fromCharCode("A".charCodeAt(0) + index - 1);

interface SheetProps {
  numberOfRows: number;
  numberOfColumns: number;
}

type CellValueType = {
  row: number;
  column: number;
  value?: number;
}

const Sheet: React.FC<SheetProps> = ({ numberOfRows, numberOfColumns }) => {
  const [data, setData] = useState<any>({});

  const setCellValue = useCallback(
    ({ row, column, value }: CellValueType) => {
      const newData: any = { ...data };

      newData[`${column}${row}`] = value;
      setData(newData);
    },
    [data, setData]
  );

  const computeCell = useCallback(
    ({ row, column }: CellValueType) => {
      const cellContent: any = data[`${column}${row}`];
      if (cellContent) {
        if (cellContent.charAt(0) === "=") {
          // This regex converts = "A1+A2" to ["A1","+","A2"]
          const expression = cellContent.substr(1).split(/([+*-])/g);

          let subStitutedExpression = "";

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

  return (
    <StyledSheet numberOfColumns={numberOfColumns}>
      {Array(numberOfRows)
        .fill(0)
        .map((m, i) => {
          return (
            <Fragment key={i}>
              {Array(numberOfColumns)
                .fill(0)
                .map((n, j) => {
                  const columnName: string = getColumnName(j);
                  return (
                    <Cell
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
  );
};

export default Sheet;