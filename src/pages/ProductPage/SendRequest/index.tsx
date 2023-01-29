import { Box, Button, Typography, styled } from "@mui/material";

// ----------------------------------------------------------------------
import { FC } from "react";

// ----------------------------------------------------------------------

interface ProductProps {
  onClick: () => void;
}
const SendRequest: FC<ProductProps> = ({ onClick }) => {
  return (
    <>
      <Box sx={{}}>
        <Box
          component="img"
          src="/static/image/cta1.jpg
      "
          sx={{ width: "100%" }}
        />
        <Box
          sx={{
            border: "2px solid #000",
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            minHeight: "350px",
            justifyContent: "center",
          }}
        >
          <StyledTitle>
            Free<span>Samples</span>
          </StyledTitle>
          <Typography
            sx={{ textAlign: "center", fontWeight: "bold", fontSize: "13px" }}
          >
            Have Look on our on Limit brand samples and increase your
            profability
          </Typography>
          <Box
            component="img"
            src="/static/image/Medication.png
      "
            sx={{ width: "100%", height: 165 }}
          />
          <ButtonAdd autoFocus onClick={() => onClick()}>
            Send Request
          </ButtonAdd>
        </Box>
      </Box>
    </>
  );
};
export default SendRequest;

const ButtonAdd = styled(Button)(
  () => `
    background: #FFF;
    border: 2px solid #000;
    border-radius: 3px;
    font-size: 16px;
    font-weight: 600;
    height: 44px;
    line-height: 22px;
    padding: 0;
    text-transform: uppercase;
    width: 80%;
    margin: 0;
    margin-top: 10px;
    display: flex;
    align-items: center;
    justify-content: center;
    color: #000;
    gap: 5px; 
    font-weight: 800;
    :hover {
      background: #000;
      color: #FFF;
    }

`
);
const StyledTitle = styled(Typography)(
  () => `
     font-size: 28px;
    font-weight: 100;
    span {
            font-weight: 900;
    }

`
);
