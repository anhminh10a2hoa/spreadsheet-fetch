import React, { useState, memo, useRef } from "react";
import { Input, Header } from "../styles";
import { getColumnName } from "../utils/helper";

interface CellProps {
  rowIndex: number;
  columnIndex: number;
  columnName: string;
  // type check
  setCellValue: (...args: any) => void;
  // type check
  computeCell: (...args: any) => void;
  currentValue: number;
}

enum KeyCode {
  UP = "ArrowUp",
  DOWN = "ArrowDown",
  LEFT = "ArrowLeft",
  RIGHT = "ArrowRight"
}

type CallbackType = (...args: any) => void

const Cell: React.FC<CellProps> = ({
  rowIndex,
  columnIndex,
  columnName,
  setCellValue,
  computeCell,
  currentValue
}) => {
  const [edit, setEdit] = useState<boolean>(false);

  const value = React.useMemo<any>(() => {
    if (edit) {
      return currentValue || "";
    }
    return computeCell({ row: rowIndex, column: columnName });
  }, [edit, currentValue, rowIndex, columnName, computeCell]);

  const handleChange = React.useCallback<CallbackType>(
    (event: React.ChangeEvent<HTMLInputElement>) => {
      setCellValue({
        row: rowIndex,
        column: columnName,
        value: event.target.value
      });
    },
    [rowIndex, columnName, setCellValue]
  );

  function keyDownEvent(event: React.KeyboardEvent<HTMLInputElement>){
    let eventKey: string = event.key;
    let currentInputId: string = rowIndex+columnName;
    let afterInputId: string = "";
    
    if(eventKey === KeyCode.DOWN){

      let newRowIndex = rowIndex + 1;
      afterInputId = newRowIndex + columnName; 
    
    }else if (eventKey === KeyCode.UP){
    
      let newRowIndex = rowIndex - 1;
      afterInputId = newRowIndex + columnName; 
   
    }else if (eventKey === KeyCode.LEFT){

      let newColumnName = getColumnName(columnIndex - 1);
      afterInputId = rowIndex + newColumnName;

    }else if (eventKey === KeyCode.RIGHT){

      let newColumnName = getColumnName(columnIndex + 1);
      afterInputId = rowIndex + newColumnName;
    
    }

    if(eventKey === KeyCode.DOWN || eventKey === KeyCode.UP || eventKey === KeyCode.LEFT || eventKey === KeyCode.RIGHT){
      console.log("column: ",columnName);
      console.log("row: ",rowIndex)
      document.getElementById(currentInputId)?.blur();
      document.getElementById(afterInputId)?.focus();
    }
  }

  if (columnIndex === 0 && rowIndex === 0) {
    return <Header />;
  }

  if (columnIndex === 0) {
    return <Header>{rowIndex}</Header>;
  }

  if (rowIndex === 0) {
    return <Header>{columnName}</Header>;
  }

  return (
    <Input
      onBlur={() => setEdit(false)}
      onFocus={() => setEdit(true)}
      onKeyDown={(event) => keyDownEvent(event)}
      value={value}
      type="text"
      id={rowIndex+columnName}
      className="cell-input"
      onChange={handleChange}
    />
  );
};

export default memo(Cell);