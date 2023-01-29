import * as Yup from "yup";
import React, { FC, useState } from "react";
// form
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
// @mui

import {
  Stack,
  IconButton,
  InputAdornment,
  SnackbarOrigin,
  Snackbar,
  FormHelperText,
} from "@mui/material";
import { LoadingButton } from "@mui/lab";
// components
import Iconify from "@components/Iconify";
import { RHFTextField } from "@components/hook-form";
import { useAuth } from "~/contexts/authContext";
import styled from "@emotion/styled";
import MuiAlert, { AlertProps } from "@mui/material/Alert";

const Alert = React.forwardRef<HTMLDivElement, AlertProps>(function Alert(
  props,
  ref
) {
  return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
});

export interface State extends SnackbarOrigin {
  open: boolean;
}
export interface States {
  successMessages: string;
  passwordError: boolean;
  newPassword: string;
  password: string;
}
const NewPasswordForm: FC<States> = ({
  newPassword,
  password,
  passwordError,
}) => {
  const [state, setState] = useState<State>({
    open: false,
    vertical: "top",
    horizontal: "right",
  });
  const { vertical, horizontal, open } = state;
  const [success, setSuccess] = useState(false);
  const [successMessage, setSuccessMessage] = useState("");

  const [error, setError] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const { login } = useAuth();
  // const { verification } = useAuth();

  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const RegisterSchema = Yup.object().shape({
    password: Yup.string().required("Confirm Password is required"),
    newPassword: Yup.string()
      .when("password", (password, field) =>
        password
          ? field
              .required("Confirm Password is required")
              .oneOf([Yup.ref("password")])
          : field
      )
      .required("Confirm Password is required"),
  });

  const defaultValues = {
    newPassword: "",
    logincode: "",
    password: "",
    email: "",
  };

  const methods = useForm({
    resolver: yupResolver(RegisterSchema),
    defaultValues,
  });

  const {
    handleSubmit,
    formState: { isSubmitting },
  } = methods;
  const handleOpen = () => {
    setState({ ...state, open: true });
  };

  const handleClose = () => {
    setState({ ...state, open: false });
  };

  return (
    <>
      {error && (
        <Snackbar
          anchorOrigin={{ vertical, horizontal }}
          open={open}
          onClose={handleClose}
          key={vertical + horizontal}
        >
          <Alert icon={false} severity="error">
            {" "}
            {errorMessage}{" "}
          </Alert>
        </Snackbar>
      )}
      {success && (
        <Snackbar
          autoHideDuration={4000}
          anchorOrigin={{ vertical, horizontal }}
          open={open}
          onClose={handleClose}
          key={vertical + horizontal}
        >
          <Alert icon={false} severity="success">
            {" "}
            {successMessage}{" "}
          </Alert>
        </Snackbar>
      )}

      <Stack spacing={3}>
        <CustomizedInput
          name="password"
          label="Password"
          type={showPassword ? "text" : "password"}
          placeholder="6+ Strong Character"
          InputLabelProps={{
            shrink: true,
          }}
          InputProps={{
            endAdornment: (
              <InputAdornment position="end">
                <IconButton
                  onClick={() => setShowPassword(!showPassword)}
                  edge="end"
                >
                  <StyleIconify
                    icon={
                      showPassword
                        ? "material-symbols:lock-open-rounded"
                        : "material-symbols:lock"
                    }
                  />
                </IconButton>
              </InputAdornment>
            ),
          }}
        />
        <CustomizedInput
          name="newPassword"
          label="Confirm Password"
          type={showConfirmPassword ? "text" : "password"}
          error={passwordError}
          placeholder="6+ Strong Character"
          InputLabelProps={{
            shrink: true,
          }}
          InputProps={{
            endAdornment: (
              <InputAdornment position="end">
                <IconButton
                  onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                  edge="end"
                >
                  <StyleIconify
                    icon={
                      showConfirmPassword
                        ? "material-symbols:lock-open-rounded"
                        : "material-symbols:lock"
                    }
                  />
                </IconButton>
              </InputAdornment>
            ),
          }}
        />
        <FormHelperText sx={{ mt: "0!important " }} error>
          {newPassword}
        </FormHelperText>

        <LoadingButton
          fullWidth
          size="large"
          type="submit"
          variant="contained"
          loading={isSubmitting}
          sx={{
            background: "#2db2ea",
            color: "#fff",
            fontSize: "17px",
            textAlign: "center",
            display: "block",
            clear: "both",
            padding: "12px 50px",
            borderRadius: "5px",
            fontfamily: "proxima_nova_ltsemibold",
            textTransform: "uppercase",
            letterSpacing: "1px",
            width: "100%",
            transition: "all 250ms ease-in-out",
          }}
        >
          Update
        </LoadingButton>
      </Stack>
    </>
  );
};
const StyleIconify = styled(Iconify)(
  () => `
    cursor: pointer;
    color: #747474;
  `
);
const CustomizedInput = styled(RHFTextField)(
  () => `
    && {
    input {  
      height: 46px;
      padding: 0 10px;
    }
      height:46px;
    label {
    color: #41b7eb;
    font-size: 16px; 
    font-weight: normal;
    font-weight: 600; 
    }
    fieldset {
      border-color: #747474;
      border-width: 1px;
    }
    ..MuiInputBase-root :hover .MuiOutlinedInput-notchedOutline {
      border-color: #747474;
      border-width: 1px;

    }
  }
`
);

export default NewPasswordForm;
