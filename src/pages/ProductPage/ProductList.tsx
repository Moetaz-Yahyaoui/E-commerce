// material
import { Grid } from "@mui/material";
import ShopProductCard from "~/components/ProductCard";
import { FC } from "react";

// ----------------------------------------------------------------------

interface ProductProps {
  products: Array<any>;
}
const ProductList: FC<ProductProps> = ({ products }) => {
  return (
    <Grid container spacing={0.5}>
      {products?.map((product) => (
        <Grid key={product.sku} item xs={12} sm={4} md={3}>
          <ShopProductCard product={product} />
        </Grid>
      ))}
    </Grid>
  );
};
export default ProductList;
