import { FC } from "react";
import { Divider } from "@mui/material";
import { styled, Grid, Typography, Box } from "@mui/material";
import { ReactNode } from "react";
import StayCurrentPortraitIcon from "@mui/icons-material/StayCurrentPortrait";
import MailOutlineIcon from "@mui/icons-material/MailOutline";

interface cartprops {
  order: any;
  children: ReactNode;
}
const OrderSummary = ({ order }: { order: any }) => {
  return (
    <>
      <Box>
        <StyledOder>
          <StyledOrderTitle
            sx={{
              textAlign: "start",
              fontSize: "19px",
            }}
          >
            ITEMS {order?.orderSubItems?.length}
            <PriceTotal>{"$ " + order?.netamount}</PriceTotal>
          </StyledOrderTitle>

          <Divider
            sx={{
              width: "100%",
              background: "#ddd",
            }}
          />
          <StyledPrice>
            Tax: <Price> {"$ " + order?.taxamount}</Price>
          </StyledPrice>
          <Divider
            sx={{
              width: "100%",
              background: "#ddd",
            }}
          />
          <StyledContent>
            <Box display="flex" flexDirection="column">
              <StyledTitle>Patient Details</StyledTitle>
              <StyledName>{order?.customer[0].name}</StyledName>
              <StyledId>id: {order?.customer[0].id}</StyledId>
              <StyledAdress>{order?.customer[0].address1}</StyledAdress>
              <StyledAdress>
                <StayCurrentPortraitIcon />
                <strong>Phone: </strong>
                {order?.customer[0].phone}
              </StyledAdress>
              <StyledAdress>
                <MailOutlineIcon />
                <strong>Email: </strong>
                {order?.customer[0].email}
              </StyledAdress>
            </Box>
          </StyledContent>
          <Divider
            sx={{
              width: "100%",
              background: "#ddd",
            }}
          />
          <StyledOrderFooterTitle
            sx={{
              textAlign: "start",
              fontSize: "19px",
            }}
          >
            Total{" "}
            <PricefooterTotal> {"$ " + order?.totalamount}</PricefooterTotal>
          </StyledOrderFooterTitle>
        </StyledOder>
      </Box>
    </>
  );
};

export const OrderCartLayout: FC<cartprops> = ({ order, children }) => {
  return (
    <StyledCartLayouat>
      <StyledLeft>
        <Typography
          sx={{
            mb: "20px",
            lineHeight: "1.5",
            fontFamily: "Public Sans,sans-serif",
            fontWeight: "700",
            display: "block",
            fontSize: "22px",
          }}
          color="#000"
        >
          My Order
        </Typography>
        <StyledProdact>{children}</StyledProdact>
      </StyledLeft>
      <Box display="flex" flexDirection="column" gap="10px">
        <Typography
          color="#000"
          sx={{
            mb: "20px",
            lineHeight: "1.5",
            fontFamily: "Public Sans,sans-serif",
            fontWeight: "700",
            display: "block",
            fontSize: "20px!important",
          }}
        >
          Order Summary
        </Typography>
        <OrderSummary order={order} />
      </Box>
    </StyledCartLayouat>
  );
};

const Price = styled(Typography)(
  () => `  
  font-style: normal;
  margin-left:6px;
  font-weight: 700!important;
  font-size: 24!important;
  line-height: 23px!important;  
  color: #6B6B6B;

`
);

const StyledPrice = styled(Typography)(
  () => `
    font-style: normal;
    font-weight: 400!important;
    font-size: 16px!important;
    line-height: 30px!important; 
    display: flex;
    justify-content: space-between; 
    margin-right: 6px;
    color: #6B6B6B !important;
    padding: 5px 10px;
`
);

const StyledCartLayouat = styled(Box)(
  () => ` 
      gap: 40px;
      display: flex;
      justify-content: center;
      min-height: 380px;
      padding: 24px;
      width: 100%;

      @media (max-width:960px) {
        flex-direction: column;
      }
`
);
const StyledLeft = styled(Box)(
  () => `
    display: flex;
    flex-direction: column;
    gap: 10px;
    overflow: scroll;
`
);
const StyledProdact = styled(Box)(
  () => `
    background: #FFF;
    gap: 44px;
    display: grid;
    max-width: 800px;
`
);

const StyledTitle = styled(Typography)(
  () => `  
    font-style: normal; 
    color: #12a7da;
    margin-bottom: 10px;
    line-height: 1.5; 
    font-family: Public Sans,sans-serif; 
    font-weight: 700; 
    display: block; 
    font-size: 20px; 
`
);
const PriceTotal = styled(Typography)(
  () => `  
  font-style: normal;
  font-weight: 700!important; 
  line-height: 22px!important; 
  font-size: 16px!important;
  color: #000; 
`
);

const PricefooterTotal = styled(Typography)(
  () => `  
  font-style: normal;
  font-weight: 700!important;
  line-height: 30px!important;
  font-size: 22px!important;
  color: #000; 
`
);

const StyledId = styled(Typography)(
  () => `
    font-weight: 400!important;
    font-size: 16px!important;
    line-height: 30px!important; 
    color: #767676;
    clear: both;
    display: block;
`
);

const StyledName = styled(Typography)(
  () => `
      font-weight: 600!important;
      font-size: 16px!important;
      line-height: 30px!important; 
      color: #000;
      clear: both;
      display: block;
  `
);

const StyledAdress = styled(Typography)(
  () => `
        font-weight: 400!important;
        font-size: 16px!important;
        line-height: 30px!important;
        color: #000;
        clear: both;
        display: block;
        display: flex;
        align-items: center;
        gap: 10px;
    `
);

const StyledContent = styled(Grid)(
  () => ` 
  padding: 10px;
  margin-bottom: 20px;
`
);
const StyledOrderTitle = styled(Typography)(
  () => ` 
    font-style: normal;
    font-weight: 500 !important;
    font-size: 18px!important;
    line-height: 22px!important;
    display: flex;
    justify-content: space-between;
    color: #000!important;
    padding: 10px;
`
);

const StyledOrderFooterTitle = styled(Typography)(
  () => ` 
    font-style: normal;
    font-weight: 700 !important;
    font-size: 22px!important;
    line-height: 30px!important;
    display: flex;
    justify-content: space-between;
    color: #000!important;
    padding: 10px;
`
);
const StyledOder = styled(Box)(
  () => `
    background: #FFF;
    @media (min-width: 960px) {
      min-width: 380px;
    }
`
);
