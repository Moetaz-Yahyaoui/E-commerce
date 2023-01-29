//@mui
import { styled } from "@mui/material/styles";
import Logo from "@components/Logo";
import ChangeForm from "./changeForm";
import { Container, Typography } from "@mui/material";

const StyleResponsive = styled("header")(
  ({ theme }) => `
display:none;
 @media (max-width: 960px) {
   display:flex;
  //  padding: ${theme.spacing(3, 0)};
   top: 0;
   z-index: 9;
   line-height: 0;
   width: 100%;
   align-items: center;
  //  position: absolute;
   justify-content: center;
   [${theme.breakpoints.up("md")}]: ;
     align-items: center;
   }
  }
`
);
const ContentStyle = styled("div")(({ theme }) => ({
  maxWidth: 480,
  margin: "auto",
  minHeight: "100vh",
  display: "flex",
  justifyContent: "space-evenly",
  flexDirection: "column",
}));

export default function ChangePasswordPage() {
  return (
    <>
      <Container maxWidth="sm">
        <ContentStyle>
          <StyleResponsive>
            <Logo />
          </StyleResponsive>
          <div>
            <Typography variant="h4" gutterBottom>
              Change your Password
            </Typography>
            <ChangeForm />
          </div>
        </ContentStyle>
      </Container>
    </>
  );
}
