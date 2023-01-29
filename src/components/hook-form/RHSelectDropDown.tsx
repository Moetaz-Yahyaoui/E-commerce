import React, { FC } from "react";
import { useFormContext, Controller } from "react-hook-form";
import {
  TextField,
  TextFieldProps,
  MenuItem,
  FormControl,
  Box,
  InputLabel,
} from "@mui/material";
import Select, { SelectChangeEvent } from "@mui/material/Select";
import { styled } from "@mui/system";

type IRHFTextField = {
  name?: string;
  list?: any;
  ID?: string;
  label?: string;
} & TextFieldProps;

type TItem = { [key: string]: any };
const RHFTextField: FC<IRHFTextField> = ({
  name,
  list,
  ID,
  label,
  ...other
}) => {
  const [age, setAge] = React.useState("");

  const handleChange = (event: SelectChangeEvent) => {
    setAge(event.target.value as string);
  };
  // const { control } = useFormContext();
  return (
    // <Controller
    //   name={name}
    //   control={control}
    //   render={({ field, fieldState: { error } }) => {
    //     return (
    //       <TextField
    //         select
    //         fullWidth
    //         size="small"
    //         {...field}
    //         value={
    //           typeof field.value === "number" && field.value === 0
    //             ? ""
    //             : field.value || ""
    //         }
    //         error={!!error}
    //         helperText={error?.message}
    //         {...other}
    //       >
    //         {list.map((item: TItem, index: number) => {
    //           return (
    //             <MenuItem key={index} value={ID ? item[ID] : item.id}>
    //               {item.name}
    //             </MenuItem>
    //           );
    //         })}
    //       </TextField>
    //     );
    //   }}
    // />
    <Box sx={{ minWidth: 120 }}>
      <StyledDropDown fullWidth>
        {/* <InputLabel id="demo-simple-select-label"> {label} </InputLabel> */}
        <Select
          labelId="demo-simple-select-label"
          id="demo-simple-select"
          value={age}
          label="Age"
          onChange={handleChange}
          defaultValue={"English"}
        >
          <MenuItem value={"English"}>English</MenuItem>
          <MenuItem value={"Francais"}>Francais</MenuItem>
          <MenuItem value={"Arab"}>Arabic</MenuItem>
        </Select>
      </StyledDropDown>
    </Box>
  );
};

export default RHFTextField;

const StyledDropDown = styled(FormControl)(
  () => ` 
      min-width: 245px;
background: #87DDFF;
border: 1px solid #FFFFFF;
border-radius: 47px;
color: #FEFEFE!important;
.MuiOutlinedInput-notchedOutline.MuiOutlinedInput-notchedOutline{
      border: none;
}
`
);
