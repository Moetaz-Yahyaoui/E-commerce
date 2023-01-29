import { FC } from "react";
import { useFormContext, Controller } from "react-hook-form";
import { TextField, TextFieldProps, styled } from "@mui/material";
import { DesktopDatePicker } from "@mui/x-date-pickers/DesktopDatePicker";
import dayjs from "dayjs";

type IRHFTextField = {
  name: string;
} & TextFieldProps;

const RHFTextField: FC<IRHFTextField> = ({ name, ...other }) => {
  const { control } = useFormContext();

  return (
    <Controller
      name={name}
      control={control}
      render={({ field, fieldState: { error } }) => (
        <StyledDesktopDatePicker
          views={["year", "month", "day"]}
          openTo="year"
          maxDate={dayjs(new Date())}
          {...field}
          renderInput={(params: any) => (
            <StyledInput
              size="small"
              {...params}
              inputProps={{
                ...params.inputProps,
                placeholder: "Date Of Birth",
              }}
              sx={{
                ".MuiInputLabel-root": {
                  display: "none",
                },
                ".MuiInput-root": {
                  margin: 0,
                },
                "& legend": { display: "none" },
                "& fieldset": { top: 0 },
              }}
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

const StyledDesktopDatePicker = styled(DesktopDatePicker)(
  // eslint-disable-next-line no-empty-pattern
  ({}) => `
 && { 
 .MuiInputBase-root , .MuiOutlinedInput-root{
        width: 100%;
        border: 1px solid #ebebeb;
        border-radius: 0px;  
      }

    clear: both;
    display: block; 
    input {  
        padding: 10px;

          }  
    label {
            font-size: 14px;
          }
 }
`
);

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
   .MuiInputBase-root.Mui-focused.MuiOutlinedInput-notchedOutline{
            border-color: transparent;
    }
    label {
            font-size: 14px;
    }
 }
`
);

export default RHFTextField;
