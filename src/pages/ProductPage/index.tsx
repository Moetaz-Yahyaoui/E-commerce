import { useCallback, useContext, useEffect, useRef, useState } from "react";
// material
import {
  CircularProgress,
  Container,
  Stack,
  ToggleButton,
  ToggleButtonGroup,
  useTheme,
} from "@mui/material";

import {
  GetAllProduct as getAllProducts,
  getAllProductListForCustomer,
} from "~/repositories/productPricing";
import ShopFilterSidebar from "~/components/FilterSideBar";
import Page from "~/layouts/PageWrapper";
import { If, Then, Else } from "react-if";
import { styled } from "@mui/material/styles";
import { Typography } from "@mui/material";
import { ShopContext } from "~/contexts/ShopContext";
import { Box } from "@mui/system";
import { AuthContext } from "~/contexts/authContext";
import * as React from "react";
import ProductGrid from "./ProductGrid";
import { getCustomerCart } from "~/repositories/customerOrder.service";
import ProductList from "./ProductList";

type IDefaultValues = Record<string, any>;

// ----------------------------------------------------------------------

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

enum DisplayType {
  Grid = "grid",
  Cards = "cards",
}

export const DEFAULT_PRODUCT_VALUES: IDefaultValues = {
  productid: null,
};

export default function EcommerceShop() {
  const [product, setProduct] = useState<Array<any>>([]);
  const [allProducts, setAllProducts] = useState<any[]>([]);
  const [filtredProduct, setFilteredProduct] = useState<Array<any>>([]);
  const [displayType, setDisplayType] = React.useState<DisplayType>(
    DisplayType.Cards
  );

  const [isLoading, setIsLoding] = useState(true);

  const theme = useTheme();

  const { onChangeData, products } = useContext(ShopContext);
  const { user } = useContext(AuthContext);

  const GetAllProducts = useRef(getAllProducts);
  const GetCustomerCartData = useRef(getCustomerCart);
  const GetAllCustomerProducts = useRef(getAllProductListForCustomer);

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
    setFilteredProduct([]);
    setIsLoding(true);
    await GetAllProducts.current(user?.customerid).then(
      (data) => {
        setProduct(data.data);
        setFilteredProduct(data.data);
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

  const handleSelectOneItem = useCallback(
    (Item: any, quantity: number): void => {
      const listProduct = filtredProduct && [...filtredProduct];
      listProduct?.map((p) => {
        if (p.sku === Item.sku) {
          p.quantity = quantity > 0 ? quantity : 1;
          return p;
        } else return p;
      });
      setFilteredProduct(listProduct);
    },
    [filtredProduct]
  );

  const handleFilter = useCallback((newArray: any) => {
    setFilteredProduct(newArray);
  }, []);

  const handleChange = (
    event: React.MouseEvent<HTMLElement>,
    newAlignment: DisplayType
  ) => {
    setDisplayType(newAlignment);
  };

  return (
    <Page title="Dashboard: Products">
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
          <Stack
            direction="column"
            alignItems="center"
            justifyContent="space-between"
            sx={{
              mb: 1,
            }}
          >
            <Stack direction="row" spacing={1} flexShrink={0} sx={{ my: 1 }}>
              <ToggleButtonGroup
                color="primary"
                value={displayType}
                exclusive
                onChange={handleChange}
                aria-label="Platform"
              >
                <ToggleButton
                  sx={{
                    fontSize: "16px",
                  }}
                  value={DisplayType.Grid}
                >
                  GRID
                </ToggleButton>
                <ToggleButton
                  sx={{
                    fontSize: "16px",
                  }}
                  value={DisplayType.Cards}
                >
                  CARDS
                </ToggleButton>
              </ToggleButtonGroup>
            </Stack>
          </Stack>
        </Box>

        <Box
          display="flex"
          justifyContent="space-between"
          gap="10px"
          pb="20px"
          sx={{
            flexDirection: "column",
            [theme.breakpoints.up("lg")]: {
              flexDirection: "row",
            },
          }}
        >
          <Box
            sx={{
              width: "100%",
              height: "100%",
              [theme.breakpoints.up("lg")]: {
                width: "20%",
              },
            }}
          >
            <ShopFilterSidebar
              products={product}
              filtredProduct={filtredProduct}
              onFilter={handleFilter}
            />
            {/* {lgUp && <SendRequest onClick={HandleSendRequest} />} */}
          </Box>
          <Container
            sx={{
              display: "flex",
              flexDirection: "column",
              justifyContent: "space-between",
              px: "0 !important",
            }}
          >
            <If condition={displayType === DisplayType.Cards}>
              <Then>
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
                        <SuspenseloderProduct
                          size={64}
                          disableShrink
                          thickness={3}
                        />
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
              </Then>
              <Else>
                <ProductGrid
                  allProducts={filtredProduct}
                  selectedProducts={products?.map((item: any) => item.sku)}
                  onSelect={handleSelectOneItem}
                />
              </Else>
            </If>
          </Container>
        </Box>
      </Container>
    </Page>
  );
}
