import * as React from "react";
import Typography from "@mui/material/Typography";
import Paper from "@mui/material/Paper";
import { Box, styled } from "@mui/material";
import Iconify from "../Iconify";

const StyledBox = styled(Box)(
  ({ theme }) => `
    background: #25252f;
    padding: ${theme.spacing(2)};
    padding: 18px 180px;
    display: flex;
    gap: 15px;
    justify-content: space-between;
    align-items: baseline;
    width: 100%;
    @media (max-width: 767px) { 
      flex-direction: column; 
      padding: 18px 50px;
    }
`
);

const StyledCopyRight = styled(Typography)(
  ({ theme }) => `
    font-weight: ${theme.typography.fontWeightBold};
    color:#FFF; 
    font-size: 16px;
    span {
      color:#35b7ec;
    }
`
);

const StyledTypography = styled(Typography)(
  ({ theme }) => `
        font-weight: ${theme.typography.fontWeightBold}; 
        color: #cccccc;
        font-size: 14px;
`
);

const StyledDetails = styled(Box)(
  () => ` 
    font-style: normal; 
    background: #1e1e26; 
    font-weight: 700;
    font-size: 20px;
    line-height: 45px; 
    display: flex;
    justify-content: center; 
    align-items: center;
    padding: 5px 25px;

`
);

const StyleIconify = styled(Iconify)(
  () => `
    cursor: pointer;
    color: #35b7ec;
    font-size: 25px;
    line-height: 20px;
  `
);

interface MessageExample {
  title?: string;
  components?: string;
  icons?: string;
  details?: string;
}
const FindUsLink: React.FC<MessageExample> = ({
  components,
  icons,
  title,
  details,
}) => {
  return (
    <Box>
      <Typography
        sx={{
          fontSize: "16px",
          display: "flex",
          alignItems: "center",
          color: "#35b7ec",
          gap: "6px",
        }}
      >
        <StyleIconify icon={icons} />
        {title}
        <Typography
          sx={{
            display: "flex",
            alignItem: "center",
            color: "#fff",
            gap: "6px",
          }}
        >
          {details}
        </Typography>
      </Typography>
      <StyledTypography>{components}</StyledTypography>
    </Box>
  );
};

const FooterStyle: React.FC = () => {
  return (
    <>
      <Paper elevation={3}>
        <StyledBox>
          <FindUsLink
            icons="ic:twotone-watch-later"
            details="MedSolutions"
            components="3rd Floor, Allahabad Bank, Station Road, Guangzhou - 721101,  Street XYZ Paschim Medinipur. China"
          />
          <FindUsLink
            icons="material-symbols:mobile-screen-share-rounded"
            details="+81 12345 67890"
          />
          <FindUsLink
            details="info@lynxcables.com"
            icons="simple-line-icons:envolope"
          />
        </StyledBox>
        <StyledDetails>
          <StyledCopyRight>
            Copyright <span>MedSolution </span>All Rights Reserved
          </StyledCopyRight>
        </StyledDetails>
      </Paper>
    </>
  );
};
export default FooterStyle;
