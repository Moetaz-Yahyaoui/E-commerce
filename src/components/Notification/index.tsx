import { forwardRef } from "react";
import { Snackbar } from "@mui/material";

import MuiAlert, { AlertColor, AlertProps } from "@mui/material/Alert";
import { SnackbarOrigin } from "@mui/material/Snackbar";

const Alert = forwardRef<HTMLDivElement, AlertProps>(function Alert(
  props,
  ref
) {
  return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
});

export interface State extends SnackbarOrigin {
  open: boolean;
}

export default function Toast({
  open,
  message,
  severity,
  onClose,
}: {
  open: boolean;
  message: string;
  onClose: () => void;
  severity: AlertColor;
}) {
  return (
    <Snackbar
      sx={{ top: "120px ! important" }}
      anchorOrigin={{ vertical: "top", horizontal: "right" }}
      open={open}
      onClose={onClose}
    >
      <Alert severity={severity}>{message}</Alert>
    </Snackbar>
  );
}
