import React, { FC, useState } from "react";
import { Card, styled, Grid } from "@mui/material";
import { GetOrderById } from "~/repositories/order.service";
import { OrderCartLayout } from "~/pages/OrderDetails/OrderSummary";
import { OrderProductCart } from "~/pages/OrderDetails/CartProduct";
import { useParams } from "react-router";

const OrderDetails: FC = () => {
  const [order, setOrder] = useState<any>(null);
  const [productsList, setProductsList] = useState<any>([]);

  const { id } = useParams();

  const GetAllCustomerOrderService = React.useRef(GetOrderById);

  const getAllCustomerOrderService = React.useCallback(async (id: string) => {
    await GetAllCustomerOrderService.current(id).then(
      (response: any) => {
        setProductsList(response.data.orderSubItems);
        setOrder(response.data);
      },
      (error: any) => {
        console.log(error);
      }
    );
  }, []);

  React.useEffect(() => {
    id && getAllCustomerOrderService(id);
  }, [id, getAllCustomerOrderService]);

  return (
    <>
      <StyledChekoutPage>
        <CardStyled>
          <Grid
            sx={{ overflow: "hidden", margin: 0, width: "100%" }}
            flex={1}
            container
          >
            <Grid sx={{ height: "100%", width: "100%" }} item>
              <ContainerCard sx={{ height: "100%", width: "100%" }}>
                <OrderCartLayout order={order}>
                  <OrderProductCart defaultProduct={productsList} />
                </OrderCartLayout>
              </ContainerCard>
            </Grid>
          </Grid>
        </CardStyled>
      </StyledChekoutPage>
    </>
  );
};

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

export default OrderDetails;
