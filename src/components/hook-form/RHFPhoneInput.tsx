import { FC } from "react";
import { useFormContext, Controller } from "react-hook-form";
import { TextFieldProps, styled } from "@mui/material";
import MuiPhoneInput from "material-ui-phone-number";

type IRHFTextField = {
  name: string;
  label?: string;
} & TextFieldProps;

const RHFPhoneInput: FC<IRHFTextField> = ({ name, label, ...other }) => {
  const { control } = useFormContext();
  return (
    <Controller
      name={name}
      control={control}
      render={({ field, fieldState: { error } }) => (
        <StyledInput
          className="Phone-Input"
          inputProps={{
            placeholder: "Phone Number",
          }}
          onlyCountries={["us"]}
          disableDropdown={true}
          disableAreaCodes={true}
          disableCountryCode={true}
          defaultCountry={"us"}
          {...field}
          error={!!error}
          helperText={error?.message}
        />
      )}
    />
  );
};

const StyledInput = styled(MuiPhoneInput)(
  ({ error }) => `
 && {  
    .MuiInputBase-root  {
          border:${error ? " 1px solid red" : " 1px solid #ebebeb"};
    width: 100%;
    border-radius: ${error ? " 0px" : " 0px"}; 

    }
    border-radius: 4px; 
    width: 100%;
    clear: both;
    display: block; 
    input {  
        padding: 10px;

    }
      .MuiInputBase-root {
    &:before { 
      border: none!important; 
    }
    &:after { 
      border: none!important; 
    }
  } 
 }
`
);

export default RHFPhoneInput;
