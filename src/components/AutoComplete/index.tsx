import React from "react";
import { TextField, Autocomplete } from "@mui/material";

interface IAutoCompletDropDown {
  defaultProps: {
    options: any[];
    getOptionLabel: (option: any) => any;
  };
  slected:
    | {
        [key: string]: any;
      }
    | undefined;
  handleSelection: (event: any) => void;
  label: string;
  disabled?: boolean;
  error?: boolean;
  errorMessage?: string;
}

const AutoCompletDropDown: React.FC<IAutoCompletDropDown> = ({
  defaultProps,
  slected,
  handleSelection,
  label,
  disabled,
  error,
  errorMessage,
}) => {
  return (
    <Autocomplete
      {...defaultProps}
      disabled={Boolean(disabled)}
      freeSolo={Boolean(disabled)}
      value={slected || null}
      onChange={(event: any, newValue: any) => {
        handleSelection(newValue);
      }}
      id="controllable-states-demo"
      sx={{ width: "100%" }}
      isOptionEqualToValue={(option, value) => option.id === value.id}
      renderInput={params => (
        <TextField
          {...params}
          error={error}
          helperText={errorMessage}
          size="small"
          label={label}
        />
      )}
    />
  );
};

export default AutoCompletDropDown;
