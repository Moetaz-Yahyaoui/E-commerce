import React, {
  FC,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useRef,
  useState,
} from "react";
// material
import Page from "~/layouts/PageWrapper";
import {
  CardMedia,
  Box,
  Button,
  styled,
  Typography,
  TextField,
  useTheme,
  Autocomplete,
} from "@mui/material";
import { ShopContext } from "~/contexts/ShopContext";
import { useLocation, useParams } from "react-router";
import {
  GetAllProduct as getAllProducts,
  getAllProductListForCustomer,
  GetProductSKUDetails,
} from "~/repositories/productPricing";
import { AuthContext } from "~/contexts/authContext";
import { Else, If, Then } from "react-if";
import SuspenseLoader from "~/components/SuspenseLoader";
import {
  getCustomerCart,
  UpdateCustomerCart,
} from "~/repositories/customerOrder.service";
import MoreDetails from "./MoreDetails";
// ----------------------------------------------------------------------

const ShopProductForm: FC = () => {
  const theme = useTheme();
  const location = useLocation();
  const { products, onChangeData } = useContext(ShopContext);
  const { id } = useParams();
  const { state } = useLocation();
  const { user } = useContext(AuthContext);
  const searchParams = new URLSearchParams(location.search);
  const skuId = searchParams.get("skuId");

  const defaultFiltredCartProduct = React.useMemo(() => {
    const filtred = products?.filter((item: any) => item.sku === id);
    if (filtred?.length > 0) return filtred[0];
  }, [products, id]);

  const [allProducts, setAllProducts] = useState<any[]>([]);
  const [product, setProduct] = useState<Array<any>>([]);
  const [productSku, setProductSku] = useState<any>();
  const [quantity, setQuantity] = useState<number>(
    defaultFiltredCartProduct?.quantity || state?.quantity || 1
  );
  const [isLoading, setIsLoding] = useState(true);

  const [productType, setProductType] = React.useState<
    Record<string, any> | undefined
  >(defaultFiltredCartProduct);

  const filtredCartProduct = React.useMemo(() => {
    const filtred = products?.filter((item: any) => item.sku === id);
    const filtredProduct = filtred?.filter(
      (item: any) => item.productid === productType?.productid
    );
    if (filtred?.length > 0) {
      return filtredProduct[0];
    } else if (filtred?.length > 0) {
      return filtred[0];
    }
  }, [products, id, productType?.productid]);

  const GetAllProducts = useRef(getAllProducts);
  const GetCustomerCartData = useRef(getCustomerCart);
  const GetAllCustomerProducts = useRef(getAllProductListForCustomer);
  const GetProductSkuService = useRef(GetProductSKUDetails);

  const getAllCustomerProducts = useCallback(async () => {
    await GetAllCustomerProducts.current(user?.customerid).then(
      (response: any) => {
        setAllProducts(response.data);
      },
      (error: any) => {
        console.log(error);
      }
    );
  }, [user?.customerid]);

  useEffect(() => {
    getAllCustomerProducts();
  }, [getAllCustomerProducts]);

  const getCartProducts = useCallback(async () => {
    await GetCustomerCartData.current().then(
      (response: any) => {
        const filtred = allProducts?.filter((item1: any) =>
          response.data.some(
            (item2: any) => item2.productid === item1.productid
          )
        );
        const filtredQuantity = filtred?.map((item: any) => {
          const value = response.data?.filter(
            (element: any) => item.productid === element.productid
          );
          return {
            ...item,
            quantity: value[0].qty,
          };
        });
        onChangeData(filtredQuantity);
      },
      (error: any) => {
        console.log(error);
      }
    );
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [allProducts]);

  useEffect(() => {
    getCartProducts();
  }, [getCartProducts]);

  const getAllProduct = useCallback(async () => {
    setIsLoding(true);
    await GetAllProducts.current(user?.customerid).then(
      (data) => {
        setProduct(data.data);
      },
      (error) => {
        console.log(error);
      }
    );
    setIsLoding(false);
  }, [user?.customerid]);

  useEffect(() => {
    getAllProduct();
  }, [getAllProduct]);

  const filtredProduct = React.useMemo(() => {
    const filtred = product?.filter((item: any) => item.sku === id);
    if (filtred?.length > 0) return filtred[0];
  }, [product, id]);

  const getProductSku = useCallback(async () => {
    await GetProductSkuService.current({
      skuid: skuId,
      sku: id,
    }).then(
      (response: any) => {
        setProductSku(response.data);
      },
      (error: any) => {
        console.log(error);
      }
    );
  }, [skuId, id]);

  useEffect(() => {
    getProductSku();
  }, [getProductSku]);

  const handleSelect = useCallback((event: any | null) => {
    if (event) {
      setProductType(event);
    } else {
      setProductType(undefined);
    }
  }, []);

  const handleAddToCart = useCallback(async () => {
    if (
      !products
        ?.map((item: any) => item.productid)
        ?.includes(productType?.productid)
    ) {
      await UpdateCustomerCart({
        productid: productType?.productid,
        qty: quantity,
      });
      onChangeData((prevSelected: any) => [
        ...prevSelected,
        { ...productType, quantity: quantity, sku: id },
      ]);
    } else if (
      !products
        ?.map((item: any) => item.producttype)
        ?.includes(productType?.producttype)
    ) {
      await UpdateCustomerCart({
        productid: productType?.productid,
        qty: quantity,
      });
      onChangeData((prevSelected: any) => [
        ...prevSelected,
        { ...productType, quantity: quantity, sku: id },
      ]);
    }
  }, [productType, quantity, id, products]);

  const handleQuantity = React.useCallback((id: any, quantity: number) => {
    const listProduct = products && [...products];
    quantity > 0 ? setQuantity(quantity) : setQuantity(1);
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
  }, []);

  const defaultProps = useMemo(() => {
    return {
      options: filtredProduct?.productdetails,
      getOptionLabel: (option: any) => option.producttype,
    };
  }, [filtredProduct]);

  const imagePath = useMemo(() => {
    if (productSku?.skuImg?.length > 0) return productSku?.skuImg[0].imgUrl;
    return "/static/image/Pas-dimage-disponible.jpg";
  }, [productSku?.skuImg]);

  useEffect(() => {
    if (defaultFiltredCartProduct) {
      setProductType(defaultFiltredCartProduct);
    } else if (filtredProduct?.productdetails?.length === 1) {
      setProductType(filtredProduct?.productdetails[0]);
    }

    setQuantity(defaultFiltredCartProduct?.quantity || state?.quantity || 1);
  }, [
    defaultFiltredCartProduct,
    filtredProduct?.productdetails,
    state?.quantity,
  ]);

  return (
    <Page title="Product Details">
      <If condition={isLoading}>
        <Then>
          <SuspenseLoader />
        </Then>
        <Else>
          <>
            <Box display="flex" flexDirection="column" justifyContent="center">
              <Typography
                width="81%"
                fontWeight="400"
                fontSize="14px"
                letterSpacing="2px"
                sx={{
                  padding: "20px",
                  [theme.breakpoints.up("lg")]: {
                    mx: "auto",
                  },
                }}
              >
                Home / Products /{" "}
                {productSku?.skuInfo?.length > 0 &&
                  productSku?.skuInfo[0].productName}
              </Typography>
              <StyledBox>
                <Box
                  sx={{
                    display: "flex",
                    justifyContent: "center",
                    padding: "20px",
                    width: "100%",
                    height: "100%",
                    background: "#FFF",
                    [theme.breakpoints.up("lg")]: {
                      width: "40%",
                    },
                  }}
                >
                  <CardMedia
                    component="img"
                    image={imagePath}
                    alt="Product Image"
                    sx={{
                      p: "5px",
                      width: "100%",
                      height: "100%",
                      minHeight: "420px",
                    }}
                  />
                </Box>
                <Box
                  sx={{
                    width: "100%",
                    display: "flex",
                    flexDirection: "column",
                    justifyContent: "space-between",
                    gap: "20px",
                    padding: "20px",
                    background: "#FFF",

                    [theme.breakpoints.up("lg")]: {
                      width: "40%",
                    },
                  }}
                >
                  <StyledTitle>
                    {productSku?.skuInfo?.length > 0 &&
                      productSku?.skuInfo[0].productName}
                  </StyledTitle>
                  <Box display="flex" flexDirection="column" gap="20px">
                    <StyledQuantity>
                      SKU:
                      <StyledPrice> {id}</StyledPrice>
                    </StyledQuantity>

                    {productType?.category ? (
                      <StyledQuantity>
                        Category:
                        <StyledPrice> {productType?.category}</StyledPrice>
                      </StyledQuantity>
                    ) : (
                      ""
                    )}
                    {productType?.manufacturer ? (
                      <StyledQuantity>
                        Manufacture:
                        <StyledPrice> {productType?.manufacturer}</StyledPrice>
                      </StyledQuantity>
                    ) : (
                      ""
                    )}
                  </Box>
                  {/* <StyledParagraph>
                    This refreshing and iconic seasonal offering unites two
                    timeless classics—our full spectrum, high potency CBD and
                    the crisp, nostalgic flavor of candy cane. For a limited
                    time, infuse your daily routine (and any wintertime treats
                    like hot chocolate, mocha, and desserts) with sweet relief
                    and the irresistible taste of peppermint!
                  </StyledParagraph> */}

                  <Box display="flex" alignItems="flex-end" gap="10px">
                    <Box
                      display="flex"
                      flexDirection="column"
                      gap="5px"
                      width="38%"
                    >
                      <StyledQuantity>Type:</StyledQuantity>
                      <StyledSelect
                        {...defaultProps}
                        value={productType || null}
                        onChange={(event: any, newValue: any) => {
                          handleSelect(newValue);
                        }}
                        id="controllable-states-demo"
                        sx={{ borderColor: "#000" }}
                        isOptionEqualToValue={(option: any, value: any) =>
                          option.id === value.id
                        }
                        renderInput={(params) => (
                          <TextField {...params} size="small" fullWidth />
                        )}
                      />
                    </Box>
                    <Box
                      display="flex"
                      flexDirection="column"
                      gap="5px"
                      width="20%"
                    >
                      <StyledQuantity>Quantity:</StyledQuantity>
                      <QuantityInput
                        fullWidth
                        type="number"
                        InputProps={{ inputProps: { min: 1 } }}
                        onChange={(e) =>
                          handleQuantity(
                            filtredCartProduct?.productid,
                            parseInt(e.target.value)
                          )
                        }
                        value={filtredCartProduct?.quantity || quantity}
                      />
                    </Box>
                    <StyledQuantity>
                      <StyledCostumerPrice>
                        ${productType?.customerprice || "0"}
                      </StyledCostumerPrice>
                    </StyledQuantity>
                  </Box>
                  {/* <StyledQuantity>Quantity:</StyledQuantity>
                <QuantityInput
                  fullWidth
                  type="number"
                  InputProps={{ inputProps: { min: 1 } }}
                  onChange={(e) =>
                    handleQuantity(
                      filtredCartProduct?.productid,
                      parseInt(e.target.value)
                    )
                  }
                  value={filtredCartProduct?.quantity || quantity}
                />

                <Box display="flex" flexDirection="column" gap="5px">
                  <StyledQuantity>Type:</StyledQuantity>
                  <Box display="flex" gap="5px" width="100%">
                    {filtredProduct?.productdetails?.length > 0 &&
                      filtredProduct?.productdetails?.map((type: any) => (
                        <TypeBox
                          key={type.id}
                          onClick={() => handleSelect(type)}
                          selected={
                            productType &&
                            type.producttypeid === productType?.producttypeid
                          }
                        >
                          {type.producttype}
                        </TypeBox>
                      ))}
                  </Box>
                </Box> */}
                  <Box>
                    <ButtonAdd
                      autoFocus
                      disabled={Boolean(productType === undefined)}
                      onClick={() => handleAddToCart()}
                    >
                      Add to Cart
                    </ButtonAdd>{" "}
                  </Box>
                </Box>
              </StyledBox>
            </Box>
            <Box
              display="flex"
              justifyContent="center"
              sx={{
                padding: "15px",
              }}
            >
              <MoreDetails productDetails={productSku} />
            </Box>
          </>
        </Else>
      </If>
    </Page>
  );
};

const StyledSelect = styled(Autocomplete)(
  ({ theme }) => ` 
  input {
    height: 20px !important;
  }
  fieldset {
    border-radius: 0px !important;
  }
`
);

const QuantityInput = styled(TextField)(
  ({ theme }) => `
  width: 100%;
  input {
    height: 4px !important;
  }
  fieldset {
    border: 1px solid #000 !important;
    border-radius: 0px !important;
  }

`
);

const TypeBox = styled<any>(Box)(
  ({ selected }) => ` 
    background: #ddd;
    display: flex;
    justify-content: center;
    align-items: center;
    height: 35px;
    width: 100px;
    cursor: pointer;
    border: ${selected ? "2px solid #35b7ec" : "0"};
`
);

const StyledBox = styled(Box)(
  ({ theme }) => ` 
    display: flex;
    flex-direction: column;
    justify-content: center;
    padding: 20px;
    width: 100%;
    gap: 20px;
    fieldset {
      border: 1px solid #000 !important;
      borderRadius: 10px !important;
    }
    @media (min-width: ${theme.breakpoints.values.lg}px) {
      flex-direction: row;
    }
`
);

const StyledCostumerPrice = styled(Box)(
  () => `
  font-family: proxima-nova,"Helvetica Neue",Helvetica,Helvetica,Arial,sans-serif;
  line-height: 40px;
  font-size: 38px;
  font-weight: 700;
  color: #1CB7EC; 
`
);

const StyledPrice = styled(Typography)(
  () => ` 
    color: #000; 
    font-size: 16px ; 
    font-weight: 300;
    font-family: proxima-nova,"Helvetica Neue",Helvetica,Helvetica,Arial,sans-serif;
}  
`
);
const StyledQuantity = styled(Typography)(
  () => `
    display: flex; 
    align-items: center;
    gap: 20px;
    color: #000; 
    font-size: 16px;
    font-family: proxima-nova,"Helvetica Neue",Helvetica,Helvetica,Arial,sans-serif;
    font-weight: 600;
    letter-spacing: 0.03em;
`
);
const ButtonAdd = styled(Button)(
  () => `
    background: #35b7ec;
    border-radius: 3px;
    font-size: 16px;
    font-weight: 600;
    height: 44px;
    line-height: 22px;
    padding: 0;
    text-transform: uppercase;
    width: 335px;
    margin: 0;
    display: flex;
    align-items: center;
    justify-content: center;
    color: #fff;
    gap: 5px;

    :hover {
      background: #000;
      color: #FFF;
    }

`
);
const StyledTitle = styled(Typography)(
  () => `
    color: #000;
    font-family: 'Anton', sans-serif;
    font-weight: 500;
    font-size: 32px !important; 
    letter-spacing: 1.5px;
`
);
const StyledParagraph = styled(Typography)(
  () => `
    font-size: 12px;  
    font-weight: 300;
    font-family: proxima-nova,"Helvetica Neue",Helvetica,Helvetica,Arial,sans-serif;
    line-height: 1.5;
    color: #767676;

`
);
export default ShopProductForm;
