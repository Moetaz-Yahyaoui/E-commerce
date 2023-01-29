// form
import { useFormContext, Controller } from "react-hook-form";
// @mui
import { Checkbox, FormControlLabel } from "@mui/material";

export function RHFCheckbox({
  name,
  label,
  ...other
}: {
  name: string;
  label: string;
}) {
  const { control } = useFormContext();

  return (
    <FormControlLabel
      label={label}
      sx={{
        color: "rgba(54, 191, 238, 1)",
      }}
      control={
        <Controller
          name={name}
          control={control}
          render={({ field }) => <Checkbox {...field} checked={field.value} />}
        />
      }
      {...other}
    />
  );
}
