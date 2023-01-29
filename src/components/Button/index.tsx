import * as React from "react";
import { Stack, Button, styled } from "@mui/material";
export enum ButtonTheme {
  Default,
  Red,
  Gradient,
  Activated,
  Deactivated,
  Auth,
  Purple,
  DarkPurple,
}
export interface ButtonProps {
  isMinimal?: boolean;
  buttonTheme?: ButtonTheme;
  variant?: any;
  texte: string;
}

const StyledButton = styled(Button)(
  () => `
  
`
); 

const Buttons: React.FC<ButtonProps> = ({ variant, texte }) => {
  return (
    <Stack spacing={2} direction="row">
      <StyledButton variant={variant}> {texte} </StyledButton>
    </Stack>
  );
};
export default Buttons;
