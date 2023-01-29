import { FC } from "react";

import { Typography, Divider, TextField } from "@mui/material";
import { styled } from "@mui/material/styles";
import Box from "@mui/material/Box";
import { SnackbarOrigin } from "@mui/material/Snackbar";

export interface State extends SnackbarOrigin {
  openToast: boolean;
}

interface IPropscompanyForm {
  defaultProduct: any[];
}

export const OrderProductCart: FC<IPropscompanyForm> = ({ defaultProduct }) => {
  return (
    <ProductGrid>
      <GridHeader>
        <Typography
          sx={{
            lineHeight: "1.5",
            fontFamily: "Public Sans,sans-serif",
            fontWeight: "700",
            display: "block",
            fontSize: "20px",
            width: "70%",
          }}
        >
          Product
        </Typography>
        <Typography
          sx={{
            lineHeight: "1.5",
            fontFamily: "Public Sans,sans-serif",
            fontWeight: "700",
            display: "block",
            fontSize: "20px",
            width: "12%",
          }}
        >
          Price
        </Typography>
        <Typography
          sx={{
            lineHeight: "1.5",
            fontFamily: "Public Sans,sans-serif",
            fontWeight: "700",
            display: "block",
            fontSize: "20px",
            width: "13%",
          }}
        >
          Quantity
        </Typography>
        <Typography
          sx={{
            lineHeight: "1.5",
            fontFamily: "Public Sans,sans-serif",
            fontWeight: "700",
            display: "block",
            fontSize: "20px",
            width: "10%",
          }}
        >
          Subtotal
        </Typography>
      </GridHeader>
      {defaultProduct?.map((item: any, index: number) => {
        return (
          <Box display="flex" flexDirection="column" key={index}>
            <StyledProductCart>
              <StyledProdactImg>
                <Box
                  component="img"
                  src={item.imgurl || "/static/image/Pas-dimage-disponible.jpg"}
                  sx={{
                    position: "absolute",
                    height: "100px",
                    transform: "translate(-50%, -50%)",
                    top: "50%",
                    left: "50%",
                  }}
                />
              </StyledProdactImg>
              <StyledProductDescription>
                <StyledOrderTitle
                  sx={{
                    lineHeight: "1.5",
                    fontFamily: "Public Sans,sans-serif",
                    fontWeight: "700",
                    display: "block",
                    fontSize: "16px",
                    textAlign: "start",
                  }}
                >
                  {item.productname}
                </StyledOrderTitle>
              </StyledProductDescription>

              <StyledFooterDescription>
                <StyledPriceProduct>
                  <Price>${item.price}</Price>
                </StyledPriceProduct>
                <QuantityInput
                  fullWidth
                  type="number"
                  disabled
                  InputProps={{ inputProps: { min: 1 } }}
                  value={item.qty}
                />
                <StyledPriceProduct>
                  <Price>${parseInt(item.price) * parseInt(item.qty)}</Price>
                </StyledPriceProduct>
              </StyledFooterDescription>
            </StyledProductCart>
            <Divider />
          </Box>
        );
      })}
    </ProductGrid>
  );
};

const QuantityInput = styled(TextField)(
  ({ theme }) => ` 
  width: 25%;

  & .MuiOutlinedInput-root {
    width: 100%;
    height: 25px;
  }

  fieldset {
    border: 1px solid #dfdfdf !important;
    border-radius: 0 !important;
  }
`
);
const StyledProductCart = styled(Box)(
  () => `
    display: flex;
    gap: 10px;
    height: 200px;
    padding: 20px;
};
`
);

const Price = styled(Typography)(
  () => `  
  font-style: normal;
  margin-left:6px;
  font-weight: 700!important;
  font-size: 24!important;
  line-height: 30px!important;
  color: #6B6B6B;

`
);
const StyledPriceProduct = styled(Typography)(
  () => `
    font-style: normal;
    font-weight: 400!important;
    font-size: 16px!important;
    line-height: 30px!important; 
    display: flex;
    justify-content: space-between; 
    margin-right: 6px;
    color: #44A2DF!important;
`
);
const StyledOrderTitle = styled(Typography)(
  () => `  
    display: flex;
    justify-content: space-between;
    color: #000!important;
`
);

const StyledProductDescription = styled(Box)(
  () => `
  display: flex;
  flex-direction: column;
  justify-content: center;
  width: 50%;
  padding: 0 10px;
`
);

const StyledFooterDescription = styled(Box)(
  () => `
     display:flex;
     justify-content: space-around;
     align-items: center;
     gap: 10px;
`
);

const ProductGrid = styled(Box)(
  () => `
  background: #FFF;
  width: 800px;
  display: flex;
  flex-direction: column;
`
);

const GridHeader = styled(Box)(
  () => `
 display: flex;
 background: #ddd;
 padding: 10px;
 `
);

const StyledProdactImg = styled(Box)(
  () => `
    width: 25%;
    height: 100%;
    position: relative;
    border: 1px solid #dfdfdf;
`
);
const StyledDescription = styled(Box)(
  () => `
     font-style: normal;
    font-weight: 400!important;
    font-size: 13px!important;
    line-height: 30px!important;  
    margin-right: 6px;
    color: #6B6B6B!important;
`
);
