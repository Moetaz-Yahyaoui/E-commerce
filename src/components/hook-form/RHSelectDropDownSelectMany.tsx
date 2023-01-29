import React, { FC } from "react";
import { useFormContext, Controller } from "react-hook-form";
import { TextField, SelectProps, MenuItem } from "@mui/material";
import Chip from "@mui/material/Chip";
import Box from "@mui/material/Box";
import OutlinedInput from "@mui/material/OutlinedInput";
import InputLabel from "@mui/material/InputLabel";
import FormControl from "@mui/material/FormControl";
import Select, { SelectChangeEvent } from "@mui/material/Select";

const ITEM_HEIGHT = 48;
const ITEM_PADDING_TOP = 8;
const MenuProps = {
  PaperProps: {
    style: {
      maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP,
      width: 250,
    },
  },
};

type IRHFTextField = {
  name: string;
  list: any;
} & SelectProps;

const RHFTextField: FC<IRHFTextField> = ({ name, list, ...other }) => {
  const { control } = useFormContext();
  const [selementSelected, setElementSelected] = React.useState<string[]>([]);
  const handleChange = (event: SelectChangeEvent<typeof selementSelected>) => {
    const {
      target: { value },
    } = event;

    setElementSelected(typeof value === "string" ? value.split(",") : value);
  };
  return (
    <Controller
      name={name}
      control={control}
      render={({ field, fieldState: { error } }) => (
        <FormControl fullWidth {...field}>
          <InputLabel id={name}>Chip</InputLabel>
          <Select
            fullWidth
            labelId={name}
            id="demo-multiple-chip"
            multiple
            value={selementSelected}
            onChange={handleChange}
            input={<OutlinedInput id="select-multiple-chip" label={name} />}
            renderValue={selected => {
              return (
                <Box sx={{ display: "flex", flexWrap: "wrap", gap: 0.5 }}>
                  {selected.map((value, index) => {
                    const vList = list
                      .filter((val: Record<string, string>) => value === val.id)
                      .map((val: Record<string, string>) => val.name);
                    return <Chip key={index} label={vList[0]} />;
                  })}
                </Box>
              );
            }}
            MenuProps={MenuProps}
          >
            {list.map((item: Record<string, any>, index: number) => (
              <MenuItem sx={{ width: "auto" }} key={index} value={item?.id}>
                {item.name}
              </MenuItem>
            ))}
          </Select>
        </FormControl>
      )}
    />
  );
};

export default RHFTextField;
