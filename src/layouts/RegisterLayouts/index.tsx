// @mui
import { styled } from "@mui/material/styles";
import { Box, Typography } from "@mui/material";
// hooks
import useResponsive from "~/hooks/useResponsive";
// components
import { Outlet } from "react-router-dom";
import RegisterBG from "~/assets/images/htopbanner.jpg";
import CenterLogo from "~/assets/images/medsolutions-logo.jpg";
import LoginpageImage from "~/assets/images/loginpageImage.png";

const RootStyle = styled("div")(({ theme }) => ({
  [theme.breakpoints.up("md")]: {
    display: "flex",
    width: "80%",
    height: "100%",
    minHeight: "614px",
    background: "#fff",
    color: "#000",
    borderRadius: "20px",
    boxShadow: "0px 3px 30px rgb(0 0 0 / 20%)",
    overflow: "hidden",
  },
  display: "flex",
  width: "80%",
  height: "100%",
  minHeight: "614px",
  background: "#fff",
  color: "#000",
  borderRadius: "20px",
  boxShadow: "0px 3px 30px rgb(0 0 0 / 20%)",
  overflow: "hidden",
}));

const SectionStyle = styled(Box)(({ theme }) => ({
  width: "100%",
  maxWidth: "50%",
  display: "flex",
  flexDirection: "column",
  justifyContent: "center",
  alignItems: "center",
  background: `url(${RegisterBG})`,
  backgroundColor: "rgba(45, 178, 234, 0.79)",
  backgroundBlendMode: "soft-light",
  backgroundRepeat: "no-repeat",
  backgroundSize: "cover",
  position: "relative",
}));

export default function Login() {
  const mdUp = useResponsive("up", "md");
  return (
    <Box
      width="100%"
      height="fit-content"
      display="flex"
      justifyContent="center"
      alignItems="flex-start"
      p="50px"
    >
      <RootStyle>
        <Outlet />
        {mdUp && (
          <SectionStyle>
            <Box
              component={"img"}
              sx={{
                textAlign: "center",
                position: "absolute",
                left: "-160px",
                top: "15px",
                zIndex: "999",
              }}
              alt={"bg"}
              src={CenterLogo}
            />
            {/* <Box
              component={"img"}
              width="55%"
              alt={"bg"}
              src={LoginpageImage}
            /> */}
            <Typography
              variant="h3"
              color="#FFF"
              textAlign="center"
              sx={{ p: "30px" }}
            >
              Med Solutions is a medical distributor offering medical supplies
            </Typography>
          </SectionStyle>
        )}
      </RootStyle>
    </Box>
  );
}
