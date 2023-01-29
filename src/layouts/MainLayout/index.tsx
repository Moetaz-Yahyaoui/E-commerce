import React, { FC, ReactNode, useContext } from "react";
import { Box, alpha, lighten, useTheme } from "@mui/material";
import { Outlet } from "react-router-dom";

import Sidebar from "./Sidebar";
import Header from "./Header";

import { useAuth } from "~/contexts/authContext";
import { Navigate } from "react-router-dom";
import { ShopContext } from "~/contexts/ShopContext";

interface SidebarLayoutProps {
  children?: ReactNode;
}

const SidebarLayout: FC<SidebarLayoutProps> = () => {
  const theme = useTheme();
  const { user } = useAuth();
  const { onChangeData } = useContext(ShopContext);

  if (!user) {
    onChangeData([]);
    return <Navigate to="/" />;
  }
  return (
    <>
      <Box
        sx={{
          flex: 1,
          height: "100%",
          ".MuiPageTitle-wrapper": {
            background: false ? theme.colors.alpha.trueWhite[5] : "white",
            marginBottom: `${theme.spacing(4)}`,
            boxShadow: false
              ? `0 1px 0 ${alpha(
                  lighten(theme.colors.primary.main, 0.7),
                  0.15
                )}, 0px 2px 4px -3px rgba(0, 0, 0, 0.2), 0px 5px 12px -4px rgba(0, 0, 0, .1)`
              : `0px 2px 4px -3px ${alpha(
                  theme.colors.alpha.black[100],
                  0.1
                )}, 0px 5px 12px -4px ${alpha(
                  theme.colors.alpha.black[100],
                  0.05
                )}`,
          },
        }}
      >
        <Header />
        <Sidebar />
        <Box
          sx={{
            height: "100%",
            position: "relative",
            zIndex: 5,
            display: "block",
            flex: 1,
            pt: `${theme.header.height}`,
            [theme.breakpoints.up("lg")]: {
              ml: `${theme.sidebar.width}`,
            },
          }}
        >
          <Box sx={{ height: "100%" }} display="block">
            <Outlet />
          </Box>
        </Box>
      </Box>
    </>
  );
};

export default SidebarLayout;
