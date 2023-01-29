import React, { FC, useCallback } from "react";
// material
import {
  Button,
  Card,
  Typography,
  CardMedia,
  CardContent,
  CardActions,
  styled,
  Box,
} from "@mui/material";
// components
import { useNavigate } from "react-router";

const ButtonAdd = styled(Button)(
  () => `
    background: #FFF;
    border: 1px solid #000;
    border-radius: 3px;
    font-size: 14px;
    font-weight: 600;
    height: 44px;
    line-height: 22px;
    padding: 0;
    text-transform: uppercase;
    width: 232px;
    margin: 0;
    display: flex;
    align-items: center;
    justify-content: center;
    color: #000;
    gap: 5px;

    :hover {
      background: #000;
      color: #FFF;
    }

`
);

const ShopProductCard: FC<any> = ({ product }: { product: any }) => {
  const { mainname, productimgurl } = product;
  const navigate = useNavigate();

  const handleSelectOneItem = useCallback(
    (Item: any): void => {
      navigate(`/product/product-details/${Item.sku}?skuId=${Item.skuid}`);
    },
    [navigate]
  );

  return (
    <Card
      sx={{
        height: "100%",
        minHeight: "446px",
        display: "flex",
        flexDirection: "column",
        justifyContent: "space-between",
        alignItems: "center",
        borderRadius: "0",
        p: "20px",
      }}
    >
      <Box sx={{ height: "150px" }}>
        <CardMedia
          component="img"
          height="140"
          image={productimgurl || "/static/image/Pas-dimage-disponible.jpg"}
          alt="Product Image"
          sx={{ height: "100%" }}
        />
      </Box>
      <CardContent sx={{ textAlign: "center", padding: "0 !important" }}>
        <Typography
          color="#000"
          fontWeight="500"
          fontSize="14px"
          letterSpacing="1.5 !important"
        >
          {mainname}
        </Typography>
        <Typography fontSize="14px" fontWeight="400" color="gray">
          {product?.productdetails?.length > 0 &&
            product?.productdetails[0].category}
        </Typography>
      </CardContent>
      <CardActions
        sx={{
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          pr: "10px",
        }}
      >
        <Typography variant="h6">
          ${" "}
          {product?.productdetails?.length > 0 &&
            product?.productdetails[0].customerprice}
        </Typography>
        <ButtonAdd autoFocus onClick={() => handleSelectOneItem(product)}>
          View Details
        </ButtonAdd>
      </CardActions>
    </Card>
  );
};

export default ShopProductCard;
