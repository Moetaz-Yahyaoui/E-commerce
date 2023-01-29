import { FC } from "react";
import { useFormContext, Controller } from "react-hook-form";
import { TextField, TextFieldProps, styled } from "@mui/material";

type IRHFTextField = {
  name: string;
  placeholder?: string;
} & TextFieldProps;

const RHFTextFieldForm: FC<IRHFTextField> = ({ name, ...other }) => {
  const { control } = useFormContext();

  return (
    <Controller
      name={name}
      control={control}
      render={({ field, fieldState: { error } }) => (
        <StyledInput
          size="medium"
          {...field}
          fullWidth
          value={
            typeof field.value === "number" && field.value === 0
              ? ""
              : field.value ?? ""
          }
          helperText={error?.message}
          {...other}
          error={!!error}
        />
      )}
    />
  );
};

const StyledInput = styled(TextField)(
  ({ error }) => `
 && { 
    .MuiInputBase-root  {
        border: 1px solid #ebebeb;
            border-radius: 0px; 

    } 
    border-radius: 4px; 
    width: 100%;
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

export default RHFTextFieldForm;
