import { FC } from "react";
import { useFormContext, Controller } from "react-hook-form";
import { TextField, Autocomplete, TextFieldProps } from "@mui/material";
import styled from "@emotion/styled";

type IRHFTextField = {
  name: string;
  defaultProps: {
    options: any[];
    getOptionLabel: (option: any) => any;
  };
  slected:
    | {
        [key: string]: any;
      }
    | undefined
    | null;
  handleSelection: (event: any) => void;
  label: string;
  disabled?: boolean;
  error?: boolean;
  errorMessage?: string;
  // views: CalendarPickerView;
} & TextFieldProps;

const RHDropDownSearch: FC<IRHFTextField> = ({
  name,
  defaultProps,
  slected,
  handleSelection,
  label,
  disabled,
  error,
  errorMessage,
  ...other
}) => {
  const { control } = useFormContext();

  return (
    <Controller
      name={name}
      control={control}
      render={({ field, fieldState: { error } }) => (
        <Autocomplete
          {...defaultProps}
          {...field}
          value={slected || null}
          onChange={(event: any, newValue: any) => {
            handleSelection(newValue);
          }}
          disabled={Boolean(disabled)}
          freeSolo={Boolean(disabled)}
          id="controllable-states-demo"
          sx={{ width: "100%", height: "100%" }}
          isOptionEqualToValue={(option, value) => option.id === value.id}
          renderInput={params => (
            <StyledInput
              {...params}
              size="small"
              fullWidth
              // label={label}
              placeholder="State"
              error={!!error}
              helperText={error?.message}
              {...other}
            />
          )}
        />
      )}
    />
  );
};

const StyledInput = styled(TextField)(
  ({ error }) => `
 && { 
    
    border: 1px solid #ebebeb;
    border-radius: 4px; 
    width: 100%;
    clear: both;
    display: block; 
    input {  
        padding: 10px;

    } 
  .MuiInputBase-root.Mui-focused.MuiOutlinedInput-notchedOutline {
            border-color: transparent;
    } 
 }
`
);
export default RHDropDownSearch;
