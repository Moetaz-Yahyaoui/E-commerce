import { FC } from "react";
import { useFormContext, Controller } from "react-hook-form";
import {
  FormGroup,
  TextFieldProps,
  Button,
  Box,
  Typography,
} from "@mui/material";
import AddIcon from "@mui/icons-material/Add";

type IRHFTextField = {
  name: string;
} & TextFieldProps;

const RHFTextField: FC<IRHFTextField> = ({ name, ...other }) => {
  const { control } = useFormContext();
  return (
    <Controller
      name={name}
      control={control}
      render={({ field, fieldState: { error } }) => {
        return (
          <Box
            display="flex"
            flexDirection="column"
            justifyContent={"center"}
            alignItems={"center"}
          >
            <FormGroup sx={{ width: "100%" }}>
              <Button
                sx={{ width: "100%" }}
                variant="contained"
                component="label"
                color="primary"
              >
                {" "}
                <AddIcon /> Upload a file
                <input
                  onChange={e => {
                    const file = e.target.files && e.target.files[0];
                    field.onChange(file);
                  }}
                  accept="application/pdf"
                  value={""}
                  //   {...other}
                  type="file"
                  hidden
                />
              </Button>
              <Typography variant="body2">{field.value?.name || ""}</Typography>
            </FormGroup>
          </Box>
        );
      }}
    />
  );
};

export default RHFTextField;
