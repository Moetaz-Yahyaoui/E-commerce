import React, { FC, ReactNode, useContext } from "react";

import { Typography, IconButton, Divider, TextField } from "@mui/material";
import DeleteForeverIcon from "@mui/icons-material/DeleteForever";
import { styled } from "@mui/material/styles";
import Box from "@mui/material/Box";
import { SnackbarOrigin } from "@mui/material/Snackbar";
import { ShopContext } from "~/contexts/ShopContext";
import {
  deleteCustomerCartProduct,
  UpdateCustomerCart,
} from "~/repositories/customerOrder.service";

export interface State extends SnackbarOrigin {
  openToast: boolean;
}

const IconCustomButton = ({
  onClick,
  children,
}: {
  onClick?: () => void;
  children: ReactNode;
}) => (
  <IconButton
    color="primary"
    onClick={onClick}
    sx={{ color: "#6B6B6B!important" }}
  >
    {children}
  </IconButton>
);

export const StyledCart: FC<any> = () => {
  const { products, onChangeData } = useContext(ShopContext);

  const handleRemove = React.useCallback(
    async (Item: any) => {
      const filtred = products?.filter(
        (element: any) => element.productid !== Item.productid
      );
      await deleteCustomerCartProduct({
        productid: Item.productid,
        qty: 1,
      });
      onChangeData(filtred);
    },
    [products]
  );

  const handleQuantity = React.useCallback(
    (id: any, quantity: number) => {
      const listProduct = products && [...products];
      listProduct?.map(async (p) => {
        if (p.productid === id) {
          p.quantity = quantity > 0 ? quantity : 1;
          await UpdateCustomerCart({
            productid: p.productid,
            qty: quantity > 0 ? quantity : 1,
          });
          return p;
        } else return p;
      });
      onChangeData(listProduct);
    },
    [products]
  );

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
            width: "61%",
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
            width: "9%",
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
            width: "12%",
          }}
        >
          Subtotal
        </Typography>
      </GridHeader>
      {products?.map((item: any, index: number) => {
        return (
          <Box display="flex" flexDirection="column" key={index}>
            <StyledProductCart>
              <StyledProdactImg>
                <Box
                  component="img"
                  src={
                    item.productimgurl ||
                    "/static/image/Pas-dimage-disponible.jpg"
                  }
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
                  <Price>${item.customerprice}</Price>
                </StyledPriceProduct>
                <QuantityInput
                  fullWidth
                  type="number"
                  InputProps={{ inputProps: { min: 1 } }}
                  onChange={(e) =>
                    handleQuantity(item.productid, parseInt(e.target.value))
                  }
                  value={item.quantity}
                />
                <StyledPriceProduct>
                  <Price>
                    ${parseInt(item.customerprice) * parseInt(item.quantity)}
                  </Price>
                </StyledPriceProduct>
                <ButtonDelete>
                  <IconCustomButton>
                    <DeleteForeverIcon
                      onClick={() => handleRemove(item)}
                      sx={{ cursor: "pointer", fill: "#fc5050" }}
                    />
                  </IconCustomButton>
                </ButtonDelete>
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
     justify-content: space-between;
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

const ButtonDelete = styled(Box)(
  () => `
 
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
