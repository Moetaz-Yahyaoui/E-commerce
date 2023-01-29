import Dialog from "@mui/material/Dialog";
import { DialogTitle, DialogContent, useMediaQuery, Box } from "@mui/material";
import { useTheme } from "@mui/material/styles";
import { LoadingButton } from "@mui/lab";
import styled from "@emotion/styled";

export interface SimpleDialogProps {
  open: boolean;
  selectedValue?: string;
  onClose: (value: number) => void;
  actionOne?: string;
  actionTow?: string;
  actionThree?: string;
}

export default function PopUpForm(props: SimpleDialogProps) {
  const { onClose, open } = props;

  const handleClose = (selected: number) => {
    onClose(selected);
  };

  const theme = useTheme();
  const fullScreen = useMediaQuery(theme.breakpoints.down("md"));

  return (
    <Dialog
      fullScreen={fullScreen}
      open={open}
      maxWidth="md"
      fullWidth={true}
      onClose={onClose}
      aria-labelledby="responsive-dialog-title"
      sx={{ borderRadius: "8px" }}
    >
      <StyledBox></StyledBox>

      <DialogTitle
        sx={{
          borderBottom: "1px solid rgba(34, 51, 84, 0.7)",
          display: "flex",
          justifyContent: "space-evenly",
          width: "100%",
        }}
      >
        {" "}
        <Box
          component="img"
          src="/static/image/warning.png"
          sx={{ height: 114 }}
        />
        <DialogDescription>
          {"  "}
          <StyledTitle>Confirm</StyledTitle>
          <br />
          Choose Your Action For Your Order And Save Your Changes Befor Leaving
        </DialogDescription>
      </DialogTitle>
      <DialogContent>
        <Box display={"flex"} justifyContent="space-around">
          {props.actionOne && (
            <CheckoutButton onClick={() => handleClose(1)} variant="contained">
              {props.actionOne}
            </CheckoutButton>
          )}
          {props.actionTow && (
            <CheckoutButton
              onClick={() => handleClose(2)}
              // onClick={onClose}
              variant="contained"
            >
              {props.actionTow}
            </CheckoutButton>
          )}
          {props.actionThree && (
            <CheckoutButton
              sx={{
                background: "transparent!important",
                color: "rgb(0 111 228)!important",
                border: "2px solid rgb(0 111 228)",
              }}
              onClick={() => handleClose(3)}
              // onClick={onClose}
              variant="contained"
            >
              {props.actionThree}
            </CheckoutButton>
          )}
        </Box>
      </DialogContent>
    </Dialog>
  );
}
const CheckoutButton = styled(LoadingButton)(
  ({ theme }) => `
    && {
      .disabled {
        background: grey;
        opacity: 0.5;
      }
          width: 196px;
        background: rgb(0 111 228);
        height: 50px;
    color: #FFF;
    margin-top: 20px;
    font-size: 12px;
    }
`
);
const DialogDescription = styled("div")(
  ({ theme }) => `
    && {
      .disabled {
        background: grey;
        opacity: 0.5;
      }
    color: rgba(34, 51, 84, 0.7);
    font-size: 16px;
    }
`
);
const StyledTitle = styled("div")(
  ({ theme }) => `
    && {
      .disabled {
        background: grey;
        opacity: 0.5;
      }
    color: rgba(34, 51, 84, 0.7);
    font-size: 30px;
    }
`
);
const StyledBox = styled("div")(
  () => `
    && {
      width: 100%;
      height: 20px;
      background: #FFCE1B;
    }
`
);
