import { Box, Typography, Button } from "@mui/material";
import CheckCircleOutlineIcon from "@mui/icons-material/CheckCircleOutline";
import { FC } from "react";

interface CheckoutProps {
  orderId: number;
  HandleReset: () => void;
}

const FinishCheckout: FC<CheckoutProps> = ({ orderId, HandleReset }) => {
  return (
    <Box
      sx={{
        display: "flex",
        alignItems: "center",
        justifyContent: "space-between",
        flexDirection: "column",
        gap: "20px",
        padding: "50px",
      }}
    >
      <Typography
        sx={{
          lineHeight: "1.5",
          fontFamily: "Public Sans,sans-serif",
          fontWeight: "700",
          display: "block",
          fontSize: "20px",
          color: "#000",
        }}
      >
        Your Order has been received
      </Typography>

      <CheckCircleOutlineIcon
        sx={{
          color: "#1ca929",
          fontSize: "50px",
          height: "100px",
          width: "100px",
        }}
      />

      <Typography
        sx={{
          lineHeight: "1.5",
          fontFamily: "Public Sans,sans-serif",
          fontWeight: "700",
          display: "block",
          fontSize: "16px",
          color: "#000",
        }}
      >
        Thank you for your purchase
      </Typography>
      <Box
        sx={{
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          flexDirection: "column",
        }}
      >
        <Typography
          sx={{
            fontSize: "14px",
            fontWeight: "400",

            color: "#767676",
          }}
        >
          Your order ID is {orderId}
        </Typography>
        <Typography
          sx={{
            fontSize: "14px",
            fontWeight: "400",

            color: "#767676",
          }}
        >
          Your will receive an order confirmation email with details of your
          order
        </Typography>
      </Box>
      <Button
        sx={{
          background: "#12a7da",
          color: "#fff",
          padding: "10px 40px",
          borderRadius: "4px !important",
          fontSize: "16px",
          lineHeight: "1.5",
          fontFamily: "Public Sans,sans-serif",
          fontWeight: "700",
          display: "block",
        }}
        onClick={HandleReset}
      >
        CONTINUE SHOPPING
      </Button>
    </Box>
  );
};

export default FinishCheckout;
