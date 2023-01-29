import { FC } from "react";
import {
  FormControl,
  Select,
  MenuItem,
  SelectProps,
  SelectChangeEvent,
} from "@mui/material";

type IRHFTextField = {
  name: string;
  list: any;
  field: any;
  error?: any;
  valueText: string;
  handleChange: (event: SelectChangeEvent) => void;
} & SelectProps;

const RHFTextField: FC<IRHFTextField> = ({
  field,
  name,
  list,
  error,
  valueText,
  handleChange,
  ...other
}) => {
  return (
    <FormControl variant="standard">
      <Select
        labelId="demo-simple-select-standard-label"
        id="demo-simple-select-standard"
        value={field}
        onChange={handleChange}
        label={name}
        {...other}
      >
        <MenuItem value="">
          <em>None</em>
        </MenuItem>
        {list.map((item: Record<string, any>, index: number) => {
          return (
            <MenuItem key={index} value={item.id}>
              {item[valueText]}
            </MenuItem>
          );
        })}
      </Select>
    </FormControl>
  );
};

export default RHFTextField;
