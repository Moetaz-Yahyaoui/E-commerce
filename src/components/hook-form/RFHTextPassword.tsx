import { FC } from "react";
import { useFormContext, Controller } from "react-hook-form";
import {
  TextField,
  TextFieldProps,
  styled,
  InputAdornment,
  Box,
} from "@mui/material";
import * as React from "react";
import IconButton from "@mui/material/IconButton";
import Input from "@mui/material/Input";
import FilledInput from "@mui/material/FilledInput";
import OutlinedInput from "@mui/material/OutlinedInput";
import InputLabel from "@mui/material/InputLabel";
import FormHelperText from "@mui/material/FormHelperText";
import FormControl from "@mui/material/FormControl";
import Visibility from "@mui/icons-material/Visibility";
import VisibilityOff from "@mui/icons-material/VisibilityOff";

type IRHFTextField = {
  name?: string;
  label?: string;
  // InputProps?: Partial<StandardInputProps>;
} & TextFieldProps;
interface State {
  amount: string;
  password: string;
  weight: string;
  weightRange: string;
  showPassword: boolean;
}

const RHFTextFieldPassword: FC<IRHFTextField> = ({
  InputProps,
  label,
  name,
  ...other
}) => {
  const [values, setValues] = React.useState<State>({
    amount: "",
    password: "",
    weight: "",
    weightRange: "",
    showPassword: false,
  });
  const handleChange =
    (prop: keyof State) => (event: React.ChangeEvent<HTMLInputElement>) => {
      setValues({ ...values, [prop]: event.target.value });
    };

  const handleClickShowPassword = () => {
    setValues({
      ...values,
      showPassword: !values.showPassword,
    });
  };

  const handleMouseDownPassword = (
    event: React.MouseEvent<HTMLButtonElement>
  ) => {
    event.preventDefault();
  };

  return (
    <StyledInput sx={{ m: 1 }} variant="outlined">
      <OutlinedInput
        id="outlined-adornment-password"
        type={values.showPassword ? "text" : "password"}
        value={values.password}
        onChange={handleChange("password")}
        endAdornment={
          <InputAdornment position="end">
            <IconButton
              aria-label="toggle password visibility"
              onClick={handleClickShowPassword}
              onMouseDown={handleMouseDownPassword}
              edge="end"
            >
              {values.showPassword ? <VisibilityOff /> : <Visibility />}
            </IconButton>
          </InputAdornment>
        }
        label="Password"
      />
    </StyledInput>
  );
};
const StyledInput = styled(FormControl)(
  () => `  
 .MuiInputBase-root, .MuiOutlinedInput-root {
    background: #F5F5F5;
    box-shadow: 0px 0px 7px rgb(0 0 0 / 25%);
    border-radius: 15px;
    border: none;
} 
`
);
export default RHFTextFieldPassword;
