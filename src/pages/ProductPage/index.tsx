import { useContext, useState } from "react";
// material
import { CircularProgress, Container } from "@mui/material";

import { If, Then, Else } from "react-if";
import { styled } from "@mui/material/styles";
import { Typography } from "@mui/material";
import { ShopContext } from "~/contexts/ShopContext";
import { Box } from "@mui/system";
import * as React from "react";
import ProductList from "./ProductList";

const SuspenseloderProduct = styled(CircularProgress)(
  () => `
&& {
  position: absolute;
  top: 50%;
  right: 50%;
  width: 70px;
  height: 70px;
  }
`
);

export default function EcommerceShop() {
  const [product, setProduct] = useState<Array<any>>([]);
  const [allProducts, setAllProducts] = useState<any[]>([]);
  const [filtredProduct, setFilteredProduct] = useState<Array<any>>([]);

  const [isLoading, setIsLoding] = useState(false);

  const { onChangeData, products } = useContext(ShopContext);

  return (
    <Container maxWidth={false}>
      <Box
        sx={{
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
        }}
      >
        <Typography fontWeight="400" fontSize="14px" letterSpacing="2px">
          Home / Products
        </Typography>
      </Box>

      <Container
        sx={{
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          px: "0 !important",
        }}
      >
        <If condition={Boolean(filtredProduct?.length === 0)}>
          <Then>
            {isLoading ? (
              <Box
                sx={{
                  position: "relative",
                  width: "100%",
                  height: "100%",
                }}
              >
                {" "}
                <SuspenseloderProduct size={64} disableShrink thickness={3} />
              </Box>
            ) : (
              <Box
                sx={{
                  width: "100%",
                  height: "100%",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                }}
              >
                <Typography>There Is No Product</Typography>
              </Box>
            )}
          </Then>
          <Else>
            <ProductList products={filtredProduct} />
          </Else>
        </If>
      </Container>
    </Container>
  );
}
