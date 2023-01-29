import * as React from "react";
import Button from "@mui/material/Button";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import SettingsIcon from "@mui/icons-material/Settings";
import { NavLink as RouterLink } from "react-router-dom";
import { useAuth } from "~/contexts/authContext";

function BasicMenu() {
  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
  const open = Boolean(anchorEl);
  const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(event.currentTarget);
  };
  const { user } = useAuth();
  const handleClose = () => {
    setAnchorEl(null);
  };

  return (
    <>
      <Button
        disableRipple
        onClick={handleClick}
        startIcon={<SettingsIcon />}
      />
      <Menu
        id="basic-menu"
        anchorEl={anchorEl}
        open={open}
        onClose={handleClose}
        anchorOrigin={{
          vertical: "center",
          horizontal: "right",
        }}
        transformOrigin={{
          vertical: "center",
          horizontal: "left",
        }}
        MenuListProps={{
          "aria-labelledby": "basic-button",
        }}
      >
        {user.userAccessPages.includes("5.1") && (
          <MenuItem
            component={RouterLink}
            to="/product-type"
            onClick={handleClose}
          >
            Product Type
          </MenuItem>
        )}
        {user.userAccessPages.includes("5.2") && (
          <MenuItem component={RouterLink} to="/vendor" onClick={handleClose}>
            Vendor
          </MenuItem>
        )}
        {user.userAccessPages.includes("5.3") && (
          <MenuItem
            component={RouterLink}
            to="/product-category"
            onClick={handleClose}
          >
            Product Category
          </MenuItem>
        )}
        {user.userAccessPages.includes("5.4") && (
          <MenuItem
            component={RouterLink}
            to="/document-type"
            onClick={handleClose}
          >
            DocumentType
          </MenuItem>
        )}
        {user.userAccessPages.includes("5.5") && (
          <MenuItem component={RouterLink} to="/user" onClick={handleClose}>
            User
          </MenuItem>
        )}
        {user.userAccessPages.includes("5.6") && (
          <MenuItem
            component={RouterLink}
            to="/ship-type"
            onClick={handleClose}
          >
            ShipType
          </MenuItem>
        )}
      </Menu>
    </>
  );
}

export default BasicMenu;
