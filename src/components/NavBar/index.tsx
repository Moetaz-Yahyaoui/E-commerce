import * as React from "react";
import AppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import Logo from "../Logo";
import { styled, useTheme, alpha } from "@mui/material";

const StyledNavBar = styled(AppBar)(
  ({ theme }) => ` 
  height: ${theme.header.height};
  color: ${theme.header.textColor};
  padding: 0;
  right: 0;
  z-index: 6;
  background-color: ${alpha(theme.header.background, 0.95)};
  backdrop-filter: blur(3px);
  position: fixed;
  justify-content: space-between;
  width: 100%;
  boxShadow: "0px 6px 11px rgb(0 0 0 / 25%)",
`
);
const NavBar: React.FC = () => {
  const theme = useTheme();

  return (
    <StyledNavBar position="static">
      <Toolbar
        sx={{
          display: "flex",
          justifyContent: "space-between",
          padding: "14px !important",
          px: "27px !important",
          [theme.breakpoints.up("md")]: {
            px: "10px !important",
          },
          [theme.breakpoints.up("lg")]: {
            px: "27px !important",
          },
        }}
        disableGutters
      >
        <Logo />
      </Toolbar>
    </StyledNavBar>
  );
};
export default NavBar;
