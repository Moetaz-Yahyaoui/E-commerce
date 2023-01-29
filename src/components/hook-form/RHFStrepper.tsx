import React, { FC, useCallback, useContext, useState } from "react";
import { Card, Box, Button, styled, Grid } from "@mui/material";
import { Create as CreateOrder } from "~/repositories/order.service";
import { CartLayout } from "~/pages/CheckoutPage/Card";
import { StyledCart } from "~/pages/CheckoutPage/Card/CartProduct";
import PatientPage from "~/pages/CheckoutPage/Card/Patient/index";
import { defaultOrder, ShopContext } from "~/contexts/ShopContext";
import { AuthContext } from "~/contexts/authContext";
import Toast from "../Notification";
import { useNavigate } from "react-router";
import FinishCheckout from "~/pages/CheckoutPage/Card/FinishCheckout";
import { deleteCustomerCartProduct } from "~/repositories/customerOrder.service";

const steps = [
  "Cart",
  "Patient",
  // , "Billing"
];

const RHFStrepper: FC<any> = () => {
  const [activeStep, setActiveStep] = useState(0);
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const [error, setError] = useState<boolean>(false);
  const [orderId, setOrderId] = useState<number>(0);

  const navigate = useNavigate();

  const { user } = useContext(AuthContext);
  const { products, order, onChangeData, onChangeOrder } =
    useContext(ShopContext);

  const selectedProducts: any = React.useMemo(() => {
    return products?.filter(product => product.quantity > 0);
  }, [products]);

  const handleNext = useCallback(() => {
    setActiveStep(prevActiveStep => prevActiveStep + 1);
  }, []);

  const handleBack = useCallback(() => {
    setActiveStep(prevActiveStep => prevActiveStep - 1);
  }, []);

  const handleReset = () => {
    navigate("/order");
  };

  const handleOpen = useCallback(() => {
    setIsOpen(true);
  }, []);

  const handleClose = useCallback(() => {
    setIsOpen(false);
  }, []);

  const onHandleOrderCreation = useCallback(async () => {
    const data = {
      ordernumber: "-",
      customerid: user?.customerid,
      billto_id: order?.billto_id,
      // billto_id: 14,
      shipto_id: order?.shipto_id,
      shiptypeid: order?.shiptypeid,
      totalamount: order?.totalamount,
      salesrepid: order?.salesrepid,
      discount: order?.discount,
      shippingamount: order?.shippingamount,
      taxamount: order?.taxamount,
      netamount: order?.netamount,
      orderSubItems: selectedProducts.map((product: any) => ({
        id: product.productid,
        orderid: 0,
        productid: product.productid,
        qty: product.quantity,
        price:
          product.pricetype === "Default"
            ? product.customerprice
            : product.customerprice,
        amount:
          product.pricetype === "Default"
            ? product.customerprice * product.quantity
            : product.customerprice * product.quantity,
      })),
    };
    await CreateOrder(data).then(
      async response => {
        setOrderId(response.data.data[0].orderid);
        handleNext();
        handleOpen();
        selectedProducts?.map(async (product: any) => {
          await deleteCustomerCartProduct({
            productid: product.productid,
            qty: 1,
          });
        });
        onChangeData([]);
        onChangeOrder(defaultOrder);
      },
      error => {
        setError(true);
        handleOpen();
        console.log("error", error);
      }
    );
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [handleNext, handleOpen, order, user?.customerid]);

  return (
    <>
      <Toast
        open={isOpen}
        message={
          error
            ? "Please check your order and try again"
            : `Your Order With Number ${orderId} Has Been Created!`
        }
        onClose={handleClose}
        severity={error ? "error" : "success"}
      />
      <StyledChekoutPage>
        <CardStyled>
          {activeStep === steps.length ? (
            <React.Fragment>
              <ContainerCard sx={{ p: 0, height: "100%" }}>
                <Box
                  width="100%"
                  height="100%"
                  display="flex"
                  justifyContent={"center"}
                  alignItems={"center"}
                >
                  <FinishCheckout orderId={orderId} HandleReset={handleReset} />
                </Box>
              </ContainerCard>
            </React.Fragment>
          ) : (
            <React.Fragment>
              <Grid
                sx={{ overflow: "hidden", margin: 0, width: "100%" }}
                flex={1}
                container
              >
                <Grid sx={{ height: "100%", width: "100%" }} item>
                  <ContainerCard sx={{ height: "100%", width: "100%" }}>
                    {activeStep === 0 ? (
                      <CartLayout
                        title="Shopping Cart"
                        buttons={
                          <Box sx={{ display: "flex", flexDirection: "row" }}>
                            <CheckoutButton
                              disabled={
                                activeStep === 0 && products?.length === 0
                              }
                              onClick={handleNext}
                              sx={{ p: 1, fontSize: "24px" }}
                            >
                              PROCEED TO PATIENT
                            </CheckoutButton>
                          </Box>
                        }
                      >
                        <StyledCart />
                      </CartLayout>
                    ) : activeStep === 1 ? (
                      <CartLayout
                        title="Patient Details"
                        buttons={
                          <Box sx={{ display: "flex", flexDirection: "row" }}>
                            <Box
                              display="flex"
                              flexDirection="column"
                              gap="10px"
                              width="100%"
                            >
                              <CheckoutButton
                                disabled={
                                  activeStep === 1 && order.shipto_id === 0
                                }
                                onClick={onHandleOrderCreation}
                                sx={{ p: 1, fontSize: "24px", mt: "10px" }}
                              >
                                CHECKOUT
                              </CheckoutButton>
                              <SecondButton
                                onClick={handleBack}
                                sx={{ p: 1, fontSize: "24px" }}
                              >
                                UPDAT CART
                              </SecondButton>
                            </Box>
                          </Box>
                        }
                      >
                        <PatientPage />
                      </CartLayout>
                    ) : null}
                  </ContainerCard>
                </Grid>
              </Grid>
            </React.Fragment>
          )}
        </CardStyled>
      </StyledChekoutPage>
    </>
  );
};

const CheckoutButton = styled(Button)(
  () => `
    background: #1CB7EC;
    border-radius: 0;
    font-size: 18px !important;
    font-weight: 400;
    height: 44px;
    line-height: 22px;
    padding: 0;
    text-transform: uppercase;
    width: 100%;
    margin: 0;
    display: flex;
    align-items: center;
    justify-content: center;
    color: #FFF;
    gap: 5px;

    :hover {
      background: #5569ff;
      color: #FFF;
    }

`
);

const SecondButton = styled(Button)(
  () => `
    background: #000;
    border: 1px solid #000;
    border-radius: 0;
    font-size: 14px !important;
    font-weight: 400;
    height: 35px;
    line-height: 22px;
    padding: 0;
    text-transform: uppercase;
    width: 100%;
    margin: 0;
    display: flex;
    align-items: center;
    justify-content: center;
    color: #FFF;
    gap: 5px;
    

    :hover {
      background: #ddd;
      color: #000;
    }

`
);

const StyledChekoutPage = styled("div")(
  () => `
    width: 100%;
    margin-left: auto;
    box-sizing: border-box;
    margin-right: auto;
    display: block; 
    height: 100%;
`
);
const ContainerCard = styled(Card)(
  () => `
    display:flex;
    align-items: center;
    justify-content: center;
    box-shadow: none;
    background-color: transparent;
`
);

const CardStyled = styled(Card)(
  () => `
    background-color: transparent;
    && {
      height: 100%;
      display: flex;
      flex-direction: column;
      box-shadow: unset;
      border-radius:0;
    }
`
);

export default RHFStrepper;
