//@mui
import { styled } from "@mui/material/styles";
// hooks
import useResponsive from "~/hooks/useResponsive";
// components
import Logo from "@components/Logo";
import ForgotForm from "./ForgotForm";
import { Container, Typography } from "@mui/material";

// import AuthSocial from "@components/AuthSocial";

const HeaderStyle = styled("header")(
  ({ theme }) => `

   top: 0;
   z-index: 9;
   line-height: 0;
   width: 100%;
   align-items: center;
   position: absolute;
   display: flex;
   justify-content: center;
   [${theme.breakpoints.up("md")}]:  {
    align-items: flex-start,
  }
 @media (max-width: 960px) {
display:none;

  }`
);

const ContentStyle = styled("div")(({ theme }) => ({
  maxWidth: 480,
  margin: "auto",
  height: "100%",
  display: "flex",
  justifyContent: "space-evenly",
  flexDirection: "column",
  // padding: theme.spacing(6, 0),
}));

export default function ForgotPage() {
  const smUp = useResponsive("up", "sm");

  return (
    <>
      <HeaderStyle></HeaderStyle>
      <Container maxWidth="sm">
        <ContentStyle>
          <div>
            <ForgotForm />
          </div>
        </ContentStyle>
      </Container>
    </>
  );
}
