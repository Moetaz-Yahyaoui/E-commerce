import * as Yup from "yup";
import React, { useState } from "react";

import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";

import {
  Link,
  Stack,
  IconButton,
  InputAdornment,
  Snackbar,
  Typography,
} from "@mui/material";
import { LoadingButton } from "@mui/lab";
import { useNavigate } from "react-router-dom";

import Iconify from "@components/Iconify";
import { FormProvider, RHFTextField, RHFCheckbox } from "@components/hook-form";
import { MethodeType } from "~/types";
import { useAuth } from "~/contexts/authContext";
import { loginService } from "~/repositories/auth.service";

import MuiAlert, { AlertProps } from "@mui/material/Alert";
import { SnackbarOrigin } from "@mui/material/Snackbar";
import styled from "@emotion/styled";
import { Box } from "@mui/system";

const StyleLink = styled(Link)(
  ({ theme }) => `
    cursor: pointer;
    font-size: 15px;
    color: #242424; 
    text-decoration: underline !important;
  `
);
const CustomizedInput = styled(RHFTextField)(
  () => `
    && {
    border: none;
    input {
      height: 46px;
      padding: 0 10px;
    }
    label {
    color: #41b7eb;
    font-size: 16px; 
    font-weight: normal;
    font-weight: 600; 
    }
    fieldset {
      border-color: #ddd;
      border-width: 1px;
    }

    .MuiInputBase-root, .MuiOutlinedInput-root:hover .MuiOutlinedInput-notchedOutline {
      border-color: inherit;
    }
  }
`
);

const StyledStack = styled(Stack)(
  ({ theme }) => `
  .MuiTextField-root {
    margin-top: 5px;
  }
`
);
const StyleIconify = styled(Iconify)(
  () => `
    cursor: pointer;
    color: #747474;
    font-size: 25px;
    line-height: 20px;
  `
);
const Alert = React.forwardRef<HTMLDivElement, AlertProps>(function Alert(
  props,
  ref
) {
  return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
});

export interface State extends SnackbarOrigin {
  open: boolean;
}

export default function LoginForm() {
  const { login } = useAuth();
  const [state, setState] = React.useState<State>({
    open: false,
    vertical: "top",
    horizontal: "right",
  });
  const { vertical, horizontal, open } = state;

  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");

  const LoginSchema = Yup.object().shape({
    userName: Yup.string().required("User Name is required"),
    password: Yup.string().required("Password is required"),
  });

  const defaultValues = {
    userName: "",
    password: "",
    remember: true,
  };

  const methods = useForm({
    resolver: yupResolver(LoginSchema),
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

  const onSubmit = async (data: { userName: string; password: string }) => {
    loginService(data.userName, data.password).then(
      async (data) => {
        await login(data);
      },
      (error) => {
        const message = error.response.data.message;
        setErrorMessage(message);
        setError(true);
        handleOpen();
      }
    );
  };
  const navigate = useNavigate();

  const handleClick = () => {
    navigate("/forgotPassword");
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
      <FormProvider
        methods={methods as unknown as MethodeType}
        onSubmit={handleSubmit(onSubmit)}
      >
        <StyledStack spacing={3} gap={"10px"}>
          <CustomizedInput
            type={"text"}
            name="userName"
            label="Email"
            InputLabelProps={{
              shrink: true,
            }}
            placeholder="example@yourmail.com"
            InputProps={{
              endAdornment: (
                <InputAdornment position="end">
                  <IconButton edge="end">
                    <StyleIconify icon={"ic:baseline-alternate-email"} />
                  </IconButton>
                </InputAdornment>
              ),
            }}
          />
          <CustomizedInput
            placeholder="6+ Strong Character"
            name="password"
            label="Password"
            type={showPassword ? "text" : "password"}
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
        </StyledStack>

        <Box
          sx={{
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
          }}
        >
          <Stack
            direction="row"
            alignItems="center"
            justifyContent="space-between"
          >
            <RHFCheckbox name="remember" label="Remember me" />
          </Stack>
          <StyleLink
            variant="subtitle2"
            onClick={handleClick}
            underline="hover"
          >
            Forgot password?
          </StyleLink>
        </Box>
        <Stack
          direction="row"
          alignItems="center"
          justifyContent="space-between"
        >
          <LoadingButton
            fullWidth
            size="large"
            type="submit"
            variant="contained"
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
            loading={isSubmitting}
          >
            Login
          </LoadingButton>
        </Stack>
        <Typography color={"#000"} variant="body1">
          Version 1.0.2.9 - 12/24/2022
        </Typography>
      </FormProvider>
    </>
  );
}
