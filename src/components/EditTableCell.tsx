import React from "react";
import CellEditableText from "./CellEditableText";

const updateAndModifyInTheList = (id: string, data: object) => {
  console.log("call patch api for update the data");
  console.log("updateAndModifyInTheList", id, data);
};

interface EditTableCellProps {
  name: string;
  row: {
    original: {
      id: string;
    };
  };
  getValue: () => string;
}

const EditTableCell: React.FC<EditTableCellProps> = ({
  row,
  getValue,
  name,
}) => {
  return (
    <CellEditableText
      defaultValue={getValue()}
      onSave={async (value) => {
        updateAndModifyInTheList(row.original.id, {
          [name]: value,
        });
      }}
    />
  );
};

export default EditTableCell;
