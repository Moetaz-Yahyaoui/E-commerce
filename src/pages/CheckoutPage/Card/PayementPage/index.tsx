import { FC } from "react";
import Page from "@components/Page";
import Box from "@mui/material/Box";
import CartPaymentForm from "./PayementForm";

interface IPropscompanyForm {}
const CheckoutPage: FC<IPropscompanyForm> = () => {
  return (
    <>
      <Page sx={{ zIndex: 2 }}>
        <Box
          sx={{
            display: "flex",
            width: "100%",
            pt: "50px",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <CartPaymentForm />
        </Box>
      </Page>
    </>
  );
};

export default CheckoutPage;
