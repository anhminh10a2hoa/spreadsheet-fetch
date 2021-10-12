import React, { useState, memo } from "react";
import { Input, Header } from "../styles";

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
      value={value}
      type="text"
      id={rowIndex+columnName}
      className="cell-input"
      onChange={handleChange}
    />
  );
};

export default memo(Cell);