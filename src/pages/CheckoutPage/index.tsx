import {
  FC,
  useCallback,
  useContext,
  useEffect,
  useRef,
  useState,
} from "react";
import Page from "@components/Page";
import { If, Then, Else } from "react-if";
import { Container } from "@mui/material";
import SuspenseLoader from "@components/SuspenseLoader";
import { styled } from "@mui/material/styles";
import { RHFStrepper } from "~/components/hook-form";
import { ShopContext } from "~/contexts/ShopContext";
import { getCustomerCart } from "~/repositories/customerOrder.service";
import { getAllProductListForCustomer } from "~/repositories/productPricing";
import { AuthContext } from "~/contexts/authContext";

export enum PLAN_TYPES {
  FREE = "FREE",
  PRO = "PRO",
  ENTERPRISE = "ENTERPRISE",
}

const StyledContainer = styled("div")(
  () => `
    height: 100%;
    display: flex;
    align-items: center;
    justify-content: center;
    flex-direction: column;

`
);

const CheckoutPage: FC = () => {
  const { onChangeData } = useContext(ShopContext);
  const { user } = useContext(AuthContext);

  const [allProducts, setAllProducts] = useState<any[]>([]);

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
  }, [allProducts]);

  useEffect(() => {
    getCartProducts();
  }, [getCartProducts]);

  return (
    <>
      <Page sx={{ zIndex: 2 }}>
        <If condition={false}>
          <Then>
            <SuspenseLoader />
          </Then>
          <Else>
            <Container sx={{ p: "0 !important" }} maxWidth="xl">
              <StyledContainer>
                <RHFStrepper />
              </StyledContainer>
            </Container>
          </Else>
        </If>
      </Page>
    </>
  );
};

export default CheckoutPage;
