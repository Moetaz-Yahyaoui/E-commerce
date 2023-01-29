// @mui
import { useTheme, Box } from "@mui/material";
// components
import { Outlet } from "react-router-dom";
import NavBar from "~/components/NavBar";

export default function Login() {
  const theme = useTheme();
  return (
    <>
      <Box
        sx={{
          flex: 1,
          height: "100%",
          ".MuiPageTitle-wrapper": {
            background: false ? theme.colors.alpha.trueWhite[5] : "white",
            marginBottom: `${theme.spacing(4)}`,
          },
        }}
      >
        <NavBar />
        <Box
          sx={{
            height: "100%",
            position: "relative",
            zIndex: 5,
            display: "block",
            flex: 1,
            pt: `${theme.header.height}`,
            width: "100vw",
            overflowX: "hidden",
          }}
        >
          <Box
            sx={{
              display: "flex",
              flexDirection: "column",
              justifyContent: "space-between",
              height: "100%",
            }}
            display="block"
          >
            <Outlet />
          </Box>
        </Box>
      </Box>
    </>
  );
}
