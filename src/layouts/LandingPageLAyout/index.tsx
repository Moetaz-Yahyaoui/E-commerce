// @mui
import { useTheme, Box } from "@mui/material";
// hooks
// components
import { Outlet } from "react-router-dom";
import NavBar from "~/components/NavBar";
import FooterStyle from "~/components/Footer";

export default function Login() {
  const theme = useTheme();
  //const mdUp = useResponsive("up", "md");
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
            // [theme.breakpoints.up("lg")]: {
            //   ml: `${theme.sidebar.width}`,
            // },
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
            <FooterStyle />
          </Box>
        </Box>
      </Box>
    </>
  );
}
