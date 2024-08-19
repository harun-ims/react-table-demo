import React from "react";
import classNames from "classnames";
import useTableCell from "../hooks/useTableCell";

interface CellEditableTextProps {
  defaultValue: string;
  onSave: (value: string) => Promise<void>;
  type?: string;
}

const CellEditableText: React.FC<CellEditableTextProps> = ({
  defaultValue,
  onSave,
  type = "text",
}) => {
  const { autoSaved, states, value, handleSave, handleChange } = useTableCell({
    defaultValue,
    onSave,
  });

  return (
    <input
      type={type}
      className={classNames(
        "rounded-sm focus:outline-none focus-visible:ring-1 focus-visible:ring-slate-200 px-3 py-2 w-full",
        {
          "border-green-500 bg-green-50": autoSaved === states.SaveSuccess,
          "border-red-500 bg-red-50": autoSaved === states.SaveFail,
          "animate-blink": autoSaved === states.Blinking,
        }
      )}
      value={value || ""}
      onChange={(e) => {
        handleChange(e.currentTarget.value);
      }}
      onBlur={() => handleSave(value || "")}
    />
  );
};

export default CellEditableText;
