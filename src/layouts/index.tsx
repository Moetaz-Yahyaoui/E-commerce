// @mui
import { Box } from "@mui/material";
// components
import { Outlet } from "react-router-dom";
import NavBar from "~/components/NavBar";

export default function Layout() {
  return (
    <>
      <Box
        sx={{
          flex: 1,
          height: "100%",
          background: "url(/static/image/background.png)",
          minHeight: "100vh",
          overflow: "hidden",
          paddingBottom: `30px`,
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
            pt: `50px`,
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
