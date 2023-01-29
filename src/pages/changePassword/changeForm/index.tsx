import * as Yup from "yup";
import React, { useState } from "react";

import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { useNavigate } from "react-router-dom";

import {
  Stack,
  Snackbar,
  Typography,
  InputAdornment,
  IconButton,
} from "@mui/material";
import { LoadingButton } from "@mui/lab";
import { FormProvider, RHFTextField } from "@components/hook-form";
import { MethodeType } from "~/types";
// import { loginService } from "~/repositories/auth.service";

import MuiAlert, { AlertProps } from "@mui/material/Alert";
import { SnackbarOrigin } from "@mui/material/Snackbar";
import { ChangeService } from "~/repositories/verefication.service";
import Iconify from "~/components/Iconify";
import { styled } from "@mui/material";

const Alert = React.forwardRef<HTMLDivElement, AlertProps>(function Alert(
  props,
  ref
) {
  return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
});

export interface State extends SnackbarOrigin {
  open: boolean;
}

export default function ChangeForm() {
  const [state, setState] = React.useState<State>({
    open: false,
    vertical: "bottom",
    horizontal: "center",
  });
  const { vertical, horizontal, open } = state;

  const [success, setSuccess] = useState(false);
  const [successMessage, setSuccessMessage] = useState("");

  const [error, setError] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");

  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [showOldPassword, setShowOldPassword] = useState(false);

  const RegisterSchema = Yup.object().shape({
    password: Yup.string().required("New Password required"),
    oldPassword: Yup.string().required("Old Password required"),

    newPassword: Yup.string()
      .when("password", (password, field) =>
        password
          ? field
              .required("Confirm Password required")
              .oneOf(
                [Yup.ref("password")],
                "The passwords you entered do not match!"
              )
          : field
      )
      .required("Confirm Password required"),
  });

  const defaultValues = {
    newPassword: "",
    oldPassword: "",
    password: "",
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
  const navigate = useNavigate();

  const handleClose = () => {
    setState({ ...state, open: false });
  };
  const onSubmit = async (data: {
    oldPassword: string;
    newPassword: string;
    password: string;
  }) => {
    await ChangeService(data.newPassword, data.oldPassword).then(
      async data => {
        const message = "Your Password Changed Successfuly";
        setSuccessMessage(message);
        console.log("data", data);
        handleOpen();
        setSuccess(true);
        setTimeout(() => {
          navigate("/login");
        }, 300);
      },
      error => {
        const message = error.response.data.message;

        setErrorMessage(message);
        setError(true);
        handleOpen();
      }
    );
  };
  return (
    <>
      {error && (
        <Snackbar
          anchorOrigin={{ vertical, horizontal }}
          open={open}
          onClose={handleClose}
          autoHideDuration={4000}
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

      <FormProvider
        methods={methods as unknown as MethodeType}
        onSubmit={handleSubmit(onSubmit)}
      >
        <Stack spacing={3}>
          <StyledInput
            name="oldPassword"
            label="Old Password"
            type={showOldPassword ? "text" : "password"}
            InputProps={{
              endAdornment: (
                <InputAdornment position="end">
                  <IconButton
                    edge="end"
                    onClick={() => setShowOldPassword(!showOldPassword)}
                  >
                    <Iconify
                      icon={
                        showOldPassword ? "eva:eye-fill" : "eva:eye-off-fill"
                      }
                    />
                  </IconButton>
                </InputAdornment>
              ),
            }}
          />
          <StyledInput
            name="password"
            label="Password"
            type={showPassword ? "text" : "password"}
            InputProps={{
              endAdornment: (
                <InputAdornment position="end">
                  <IconButton
                    edge="end"
                    onClick={() => setShowPassword(!showPassword)}
                  >
                    <Iconify
                      icon={showPassword ? "eva:eye-fill" : "eva:eye-off-fill"}
                    />
                  </IconButton>
                </InputAdornment>
              ),
            }}
          />
          <StyledInput
            name="newPassword"
            label="Confirm Password"
            type={showConfirmPassword ? "text" : "password"}
            InputProps={{
              endAdornment: (
                <InputAdornment position="end">
                  <IconButton
                    edge="end"
                    onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                  >
                    <Iconify
                      icon={
                        showConfirmPassword
                          ? "eva:eye-fill"
                          : "eva:eye-off-fill"
                      }
                    />
                  </IconButton>
                </InputAdornment>
              ),
            }}
          />
        </Stack>

        <Stack
          direction="row"
          alignItems="center"
          justifyContent="space-between"
          sx={{ my: 2 }}
        ></Stack>
        <Stack
          direction="row"
          alignItems="center"
          justifyContent="space-between"
          sx={{ my: 2 }}
        >
          <LoadingButton
            fullWidth
            size="large"
            type="submit"
            variant="contained"
            loading={isSubmitting}
          >
            Update
          </LoadingButton>
        </Stack>

        <Stack
          direction="row"
          alignItems="center"
          justifyContent="space-between"
          sx={{ my: 2 }}
        >
          <Typography variant="body1">Version 1.0.3.3 - 12/05/2022</Typography>
        </Stack>
      </FormProvider>
    </>
  );
}
const StyledInput = styled(RHFTextField)(
  ({ error }) => `
 && { 
    
    border-radius: 10px ;
    border: none;
    width: 100%; 
    display: flex;
    justify-content: center; 
    input { 
    border-radius: 10px;

    }
    ..MuiInputBase-root  .MuiOutlinedInput-notchedOutline {
      border-color: blue;
          border-width: 2px;  
    } 
 }
`
);
