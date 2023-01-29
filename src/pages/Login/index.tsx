// @mui
import { styled } from "@mui/material/styles";
import { Container, Typography } from "@mui/material";
// hooks
// components
import LoginForm from "./LoginForm";

const StyledSignIn = styled(Typography)(
  ({ theme }) => `
    font-size: ${theme.typography.pxToRem(38)};
    font-weight: 600;
    font-size: 30px;
    color: #000; 
    text-align: center;
    margin-bottom: 10px; 
    span {
    font-size: 30px;
    color: #2db2ea;
    }
 
`
);
const StyledTypography = styled(Typography)(
  ({ theme }) => `
    font-size: ${theme.typography.pxToRem(16)};
    font-weight: 400;
    margin-bottom: 24px;
    font-size: 16px;
    line-height: 22px;
    text-align: left;
    color: #747474;
    padding-bottom: 20px;
    margin: 0 auto; 
`
);
const ContentStyle = styled("div")(({ theme }) => ({
  padding: "8px 0",
  display: "flex",
  paddingTop: "120px",
  flexDirection: "column",
}));

export default function Login() {
  return (
    <>
      <Container maxWidth="xs">
        <ContentStyle>
          <div>
            <StyledSignIn color="rgba(54, 191, 238, 1)" gutterBottom>
              Welcome to <span>Med</span>Solution
            </StyledSignIn>
            <StyledTypography>
              Few lines about the brand to welcome the user, this is a dummy
              text used as placeholder.
            </StyledTypography>
            <LoginForm />
          </div>
        </ContentStyle>
      </Container>
    </>
  );
}
