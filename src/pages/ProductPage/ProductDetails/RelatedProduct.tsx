import PropTypes from "prop-types";
import { useCallback, useMemo } from "react";
// material
import {
  Button,
  Card,
  Typography,
  CardMedia,
  CardContent,
  CardActions,
  styled,
} from "@mui/material";
// components
import { useNavigate } from "react-router";

const ButtonAdd = styled(Button)(
  () => `
    background: #FFF;
    border: 1px solid #000;
    border-radius: 3px;
    font-size: 16px;
    font-weight: 600;
    height: 44px;
    line-height: 22px;
    padding: 0;
    text-transform: uppercase;
    width: 150px;
    margin: 0;
    display: flex;
    align-items: center;
    justify-content: center;
    color: #000;
    gap: 5px;
    width:100%;
    :hover {
      background: #000;
      color: #FFF;
    }

`
);

RelatedProductCard.propTypes = {
  product: PropTypes.object,
};

export default function RelatedProductCard({
  product,
  productName,
  productPrice,
  productCategory,
}: {
  productPrice: any;
  productCategory: any;
  productName: string;
  product?: any;
}) {
  const navigate = useNavigate();

  const handleSelectOneItem = useCallback(
    (Item: any): void => {
      navigate(`/product/product-details/${Item.sku}`);
    },
    [navigate]
  );

  const productImage = useMemo(() => {
    const pathArray = [
      "/static/image/botle.jpg",
      "/static/image/botle.jpg",
      "/static/image/botle.jpg",
      "/static/image/botle.jpg",
    ];
    return pathArray[Math.floor(Math.random() * pathArray.length)];
  }, []);

  return (
    <Card
      sx={{
        height: "100%",
        minHeight: "440px",
        display: "flex",
        flexDirection: "column",
        justifyContent: "space-between",
        alignItems: "center",
        borderRadius: "0",
        p: "20px",
      }}
    >
      <CardMedia
        component="img"
        height="140"
        image={productImage}
        alt="Product Image"
        sx={{ p: "30px", height: "75%", borderRadius: "10px" }}
      />
      <CardContent sx={{ padding: "0 16px", textAlign: "center" }}>
        <Typography variant="h6">{productName}</Typography>
        <Typography fontSize="16px" fontWeight="400" color="gray">
          {productCategory}
        </Typography>
      </CardContent>
      <CardActions
        sx={{
          display: "flex",
          justifyContent: "center",
          pr: "10px",
          flexDirection: "column",
        }}
      >
        <Typography variant="h6">$ {productPrice}</Typography>
        <ButtonAdd autoFocus onClick={() => handleSelectOneItem(product)}>
          View Details
        </ButtonAdd>
      </CardActions>
    </Card>
  );
}
