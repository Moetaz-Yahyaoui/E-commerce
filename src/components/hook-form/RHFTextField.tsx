import { FC } from "react";
import { useFormContext, Controller } from "react-hook-form";
import { TextField, TextFieldProps, styled } from "@mui/material";

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
    
    border-radius: 10px ;
    border: none;
    width: 100%; 
    display: flex;
    border: 1px solid #ccc;
    justify-content: center; 
    input { 
    border-radius: 10px;

    }
 }
`
);

export default RHFTextField;
