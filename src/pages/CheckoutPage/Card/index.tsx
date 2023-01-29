import { FC, useContext } from "react";
import { Divider } from "@mui/material";
import React, { useMemo } from "react";
import { styled, Grid, Typography, Box } from "@mui/material";
import { ReactNode } from "react";

import { ShopContext } from "~/contexts/ShopContext";

interface cartprops {
  title: string;
  children: ReactNode;
  buttons: ReactNode;
}
const OrderSummary = ({ title }: { title: any }) => {
  const { products, order, onChangeOrder } = useContext(ShopContext);

  const subTotal = React.useMemo(() => {
    return products
      ? products.reduce((prev, curr) => {
          const price = curr.customerprice;
          return prev + price * curr.quantity;
        }, 0)
      : 0;
  }, [products]);

  const tax = useMemo(() => {
    return products
      ? products.reduce((prev, curr) => {
          const price = curr.customerprice;
          const minesPrice = curr.istaxable ? 0.2 * price * curr.quantity : 0;
          return prev + minesPrice;
        }, 0)
      : 0;
  }, [products]);

  React.useEffect(() => {
    onChangeOrder({
      ...order,
      totalamount: parseInt(subTotal),
      taxamount: parseInt(tax),
      netamount: parseInt(subTotal) - parseInt(tax),
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [onChangeOrder, subTotal, tax]);

  const taxPayed = useMemo(() => {
    return products
      ? products.reduce((prev, curr) => {
          const price = curr.customerprice;
          const minesPrice = curr.istaxable ? 0.2 * price * curr.quantity : 0;
          return prev + minesPrice;
        }, 0)
      : 0;
  }, [products]);

  return (
    <>
      <StyledOderSammury>
        <StyledOder>
          {title === "Shopping Cart" && (
            <>
              <StyledOrderTitle
                sx={{
                  textAlign: "start",
                  fontSize: "19px",
                }}
              >
                SubTotal
                <PriceTotal> {"$ " + subTotal.toFixed(2)}</PriceTotal>
              </StyledOrderTitle>
              <Divider
                sx={{
                  width: "100%",
                  borderColor: "#ddd",
                  background: "#ddd",
                }}
              />
            </>
          )}
          <StyledContent>
            {/* <StyledPrice>
              Sub Total <Price> {"$ " + subTotal.toFixed(2)}</Price>
            </StyledPrice> */}
            <StyledPrice>
              Tax <Price> {"$ " + taxPayed.toFixed(2)}</Price>
            </StyledPrice>
          </StyledContent>
          {title !== "Shopping Cart" && (
            <Divider
              sx={{
                width: "100%",
                background: "#ddd",
              }}
            />
          )}
          <StyledOrderFooterTitle
            sx={{
              textAlign: "start",
              fontSize: "19px",
            }}
          >
            Total
            <PricefooterTotal>
              {" "}
              {"$ " + (subTotal + taxPayed).toFixed(2)}
            </PricefooterTotal>
          </StyledOrderFooterTitle>
        </StyledOder>
      </StyledOderSammury>
    </>
  );
};

export const CartLayout: FC<cartprops> = ({ title, children, buttons }) => {
  return (
    <StyledCartLayouat>
      <StyledLeft>
        <Typography
          sx={{
            lineHeight: "1.5",
            fontFamily: "Public Sans,sans-serif",
            fontWeight: "700",
            display: "block",
            fontSize: "20px",
          }}
          color="#000"
        >
          {title}{" "}
        </Typography>
        <StyledProdact>{children}</StyledProdact>
      </StyledLeft>
      <Box display="flex" flexDirection="column">
        <Typography
          sx={{
            lineHeight: "1.5",
            fontFamily: "Public Sans,sans-serif",
            fontWeight: "700",
            display: "block",
            fontSize: "20px!important",
            mb: "20px",
          }}
          color="#000"
        >
          {title === "Shopping Cart" ? "Cart Totals" : "Order Summary"}{" "}
        </Typography>
        <OrderSummary title={title} />
        {buttons}
      </Box>
    </StyledCartLayouat>
  );
};

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
    gap: 20px;
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

const StyledPrice = styled(Typography)(
  () => `
    font-style: normal;
    font-weight: 400!important;
    font-size: 16px!important;
    line-height: 30px!important; 
    display: flex;
    justify-content: space-between; 
    margin-right: 6px;
    color: #6B6B6B!important;
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
const StyledOderSammury = styled(Box)(
  () => `
 
`
);
