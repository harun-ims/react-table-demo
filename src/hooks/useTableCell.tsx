import { useCallback, useEffect, useState } from "react";

enum SaveStates {
  Default = "Default",
  Blinking = "Blinking",
  SaveSuccess = "Save success",
  SaveFail = "Save fail",
}

interface UseTableCellProps {
  defaultValue?: string | null;
  onSave?: (value: string) => Promise<void>;
}

interface UseTableCellReturn {
  states: typeof SaveStates;
  autoSaved: SaveStates;
  value: string | null;
  handleSave: (value: string) => Promise<void>;
  handleChange: (value: string) => void;
}

export default function useTableCell({
  defaultValue = "",
  onSave = async () => {},
}: UseTableCellProps): UseTableCellReturn {
  const [value, setValue] = useState(defaultValue);
  const [autoSaved, setAutoSaved] = useState<SaveStates>(SaveStates.Default);

  const controlSaveState = useCallback((status: SaveStates) => {
    setAutoSaved(status);
  }, []);

  const resetSaveState = useCallback(() => {
    setTimeout(() => setAutoSaved(SaveStates.Default), 1010);
  }, []);

  const handleSave = useCallback(
    async (value: string) => {
      controlSaveState(SaveStates.Blinking);

      try {
        await onSave(value);
        controlSaveState(SaveStates.SaveSuccess);
      } catch {
        controlSaveState(SaveStates.SaveFail);
      } finally {
        resetSaveState();
      }
    },
    [onSave, controlSaveState, resetSaveState]
  );

  const handleChange = useCallback((value: string) => {
    setValue(value);
  }, []);

  useEffect(() => {
    setValue(defaultValue);
  }, [defaultValue]);

  return {
    states: SaveStates,
    autoSaved,
    value,
    handleSave,
    handleChange,
  };
}
