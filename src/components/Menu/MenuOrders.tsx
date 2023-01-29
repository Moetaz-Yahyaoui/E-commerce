import * as React from "react";
import Button from "@mui/material/Button";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import AutoStoriesTwoToneIcon from "@mui/icons-material/AutoStoriesTwoTone";
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
        startIcon={<AutoStoriesTwoToneIcon />}
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
        {user.userAccessPages.includes("4.1") && (
          <MenuItem component={RouterLink} to="/orders" onClick={handleClose}>
            Orders
          </MenuItem>
        )}
        {user.userAccessPages.includes("4.2") && (
          <MenuItem
            component={RouterLink}
            to="/pending-packaging"
            onClick={handleClose}
          >
            Pending Packaging
          </MenuItem>
        )}
        {user.userAccessPages.includes("4.3") && (
          <MenuItem
            component={RouterLink}
            to="/pending-shipping"
            onClick={handleClose}
          >
            Pending Shipping
          </MenuItem>
        )}
        {user.userAccessPages.includes("4.4") && (
          <MenuItem
            component={RouterLink}
            to="/pending-delivery"
            onClick={handleClose}
          >
            Pending Delivery
          </MenuItem>
        )}
      </Menu>
    </>
  );
}

export default BasicMenu;
