import { Grid } from "@mui/material";
import ShopProductCard from "./ShopProductCard";
import { FC } from "react";
import { productsArray } from "./ProductArray";

// ----------------------------------------------------------------------

const ProductList: FC<any> = () => {
  return (
    <Grid container spacing={3}>
      {productsArray?.map((product) => (
        <Grid key={product.sku} item xs={12} sm={4} md={4}>
          <ShopProductCard product={product} />
        </Grid>
      ))}
    </Grid>
  );
};
export default ProductList;
