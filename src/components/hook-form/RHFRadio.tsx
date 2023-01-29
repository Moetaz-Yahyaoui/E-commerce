import * as React from "react";
import { styled } from "@mui/material/styles";
import RadioGroup, { useRadioGroup } from "@mui/material/RadioGroup";
import FormControlLabel, {
  FormControlLabelProps,
} from "@mui/material/FormControlLabel";
import Radio from "@mui/material/Radio";

interface StyledFormControlLabelProps extends FormControlLabelProps {
  checked: boolean;
}
type IRHFRadio = {
  value?: string;
  label?: string;
  // InputProps?: Partial<StandardInputProps>;
};

const StyledFormControlLabel = styled((props: StyledFormControlLabelProps) => (
  <FormControlLabel {...props} />
))(({ theme, checked }) => ({
  ".MuiFormControlLabel-label": checked && {
    color: theme.palette.primary.main,
  },
}));

function MyFormControlLabel(props: FormControlLabelProps) {
  const radioGroup = useRadioGroup();

  let checked = false;

  if (radioGroup) {
    checked = radioGroup.value === props.value;
  }

  return <StyledFormControlLabel checked={checked} {...props} />;
}

const RHFRadioGroup: React.FC<IRHFRadio> = ({ value, label }) => {
  return (
    <RadioGroup
      sx={{ flexDirection: "row" }}
      name="use-radio-group"
      defaultValue="first"
    >
      <MyFormControlLabel value={value} label={label} control={<Radio />} />
    </RadioGroup>
  );
};
export default RHFRadioGroup;
