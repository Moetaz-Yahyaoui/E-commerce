import { FC } from "react";
import { useFormContext, Controller } from "react-hook-form";
import {
  Checkbox,
  FormControlLabelProps,
  FormGroup,
  FormControlLabel,
} from "@mui/material";

type IRHFTextField = {
  name?: string;
  label: string;
};

const RHFTextField: FC<IRHFTextField> = ({ name, label, ...other }) => {
  // const { control } = useFormContext();

  return (
    <FormGroup>
      <FormControlLabel
        control={
          <Checkbox
            defaultChecked
            sx={{
              color: "#36BFEE",
              "&.Mui-checked": {
                color: "#36BFEE",
              },
            }}
          />
        }
        label={label}
      />
    </FormGroup>
  );
};

export default RHFTextField;
