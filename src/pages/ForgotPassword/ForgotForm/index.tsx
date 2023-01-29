import * as Yup from "yup";
import React, { useMemo, useState } from "react";

import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import {
  Link,
  Stack,
  Snackbar,
  Typography,
  IconButton,
  InputAdornment,
} from "@mui/material";
import Iconify from "@components/Iconify";

import { LoadingButton } from "@mui/lab";
import { useNavigate } from "react-router-dom";
import { FormProvider, RHFTextField } from "@components/hook-form";
import { MethodeType } from "~/types";
import MuiAlert, { AlertProps } from "@mui/material/Alert";
import { SnackbarOrigin } from "@mui/material/Snackbar";
import { verificationService } from "~/repositories/verefication.service";
import { OTPPost, ResetPwd } from "~/repositories/verefication.service";
import { useAuth } from "~/contexts/authContext";
import NewPasswordForm from "./newPasswordform";
import styled from "@emotion/styled";

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
const StyleLink = styled(Link)(
  ({ theme }) => `
    cursor: pointer;
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

export default function ForgotForm() {
  const [state, setState] = React.useState<State>({
    open: false,
    vertical: "top",
    horizontal: "right",
  });
  const { vertical, horizontal, open } = state;
  const { login } = useAuth();

  const [success, setSuccess] = useState(false);
  const [successMessage, setSuccessMessage] = useState("");
  const [emptyPassword, setEmptyPassword] = useState(false);
  const [password, setPassword] = useState(false);

  const [emptyNewPassword, setEmptyNewPassword] = useState(false);
  const [error, setError] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const [pages, setPages] = useState(1);

  const YupObject = useMemo(() => {
    let yupValue: any;
    if (pages === 1) {
      yupValue = {
        email: Yup.string()
          .email("Email must be a valid email address")
          .required("Email required"),
      };
    } else if (pages === 2) {
      yupValue = {
        logincode: Yup.string().required("Login Code required"),
      };
    } else {
      yupValue = {
        password: Yup.string().required("Password is required"),
        newPassword: Yup.string()
          .when("password", (password, field) =>
            password
              ? field
                  .required("Confirm Password is required")
                  .oneOf([Yup.ref("password"), null], "Passwords must match")
              : field
          )
          .required("Confirm Password is required"),
      };
    }
    return yupValue;
  }, [pages]);

  const LoginSchema = Yup.object().shape(YupObject);

  const defaultValues = {
    email: "",
    type: "2",
    logincode: "",
    newPassword: "",
    password: "",
  };
  const navigate = useNavigate();

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

  const handleClick = () => {
    navigate("/");
  };

  const onSubmit = async (data: {
    email: string;
    type: string;
    logincode: string;
    newPassword: string;
    password: string;
  }) => {
    if (pages === 1) {
      verificationService(data.email, data.type).then(
        async data => {
          if (pages === 1) {
            const Message = data.message;
            setSuccess(true);
            setSuccessMessage(Message);
            handleOpen();
            setPages(2);
          }
        },
        error => {
          console.log("error", error);
          const message = error.response.data.message;
          if (error.response.data.message === "Email can not be empty") {
            setErrorMessage("Email cannot be empty");
            setError(true);
            handleOpen();
          } else {
            setErrorMessage(message);
            setError(true);
            handleOpen();
          }
        }
      );
    } else if (pages === 2) {
      setSuccess(false);
      await OTPPost(data.email, data.logincode).then(
        async data => {
          setPages(3);
          const Message = "Your Code Is Valid";
          handleOpen();
          setError(false);
          setSuccessMessage(Message);
          setSuccess(true);
        },
        error => {
          console.log("error", error);
          const message = error.response.data.message;
          setErrorMessage(message);
          setError(true);
          handleOpen();
          if (error.response.data.status === 400) {
            const Message = "Your field is empty ";
            handleOpen();
            setErrorMessage(Message);
            setError(true);
          }
        }
      );
    } else if (pages === 3) {
      setSuccess(false);
      if (!data.password === true) {
        setEmptyPassword(true);
        if (!data.newPassword === true) {
          setEmptyNewPassword(true);
        } else if (!data.newPassword === false) {
          setEmptyNewPassword(false);
          if (data.newPassword !== data.password) {
            setPassword(true);
            const message = "Please Make Sure Your Passwords Match";
            setErrorMessage(message);
            setError(true);
            handleOpen();
          } else {
            await ResetPwd(data.newPassword, data.password).then(
              async data => {
                // navigate("/");
                await login(data);
              },
              error => {
                console.log("error", error);
                const message = error.response.data.title;
                setErrorMessage(message);
                setError(true);
                handleOpen();
              }
            );
          }
        }
      } else if (!data.password === false) {
        setEmptyPassword(false);
        if (!data.newPassword === true) {
          setEmptyNewPassword(true);
        } else if (!data.newPassword === false) {
          setEmptyNewPassword(false);
          if (data.newPassword !== data.password) {
            setPassword(true);
            const message = "Please Make Sure Your Passwords Match";
            setErrorMessage(message);
            setError(true);
            handleOpen();
          } else {
            await ResetPwd(data.newPassword, data.password).then(
              async data => {
                await login(data);
              },
              error => {
                console.log("error", error);
                const message = error.response.data.title;
                setErrorMessage(message);
                setError(true);
                handleOpen();
              }
            );
          }
        }
      }
    }
  };
  return (
    <>
      {error && (
        <Snackbar
          autoHideDuration={2000}
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
          autoHideDuration={2000}
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
      {pages === 1 ? (
        <Typography color={"#747474"} variant="h4" mb={"15px"} gutterBottom>
          Verify your Email
        </Typography>
      ) : pages === 2 ? (
        <Typography color={"#747474"} variant="h4" gutterBottom>
          Enter Your Code
        </Typography>
      ) : (
        <>
          <Typography color={"#747474"} variant="h4" gutterBottom>
            Enter your New Password
          </Typography>
        </>
      )}
      <FormProvider
        methods={methods as unknown as MethodeType}
        onSubmit={handleSubmit(onSubmit)}
      >
        <Stack
          spacing={3}
          sx={{
            display: "flex",
            justifyContent: "center",
            height: "100%",
          }}
        >
          {pages === 1 && (
            <CustomizedInput
              type={"text"}
              name="email"
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
          )}
          {pages === 2 && (
            <>
              <CustomizedInput
                disabled={true}
                type={"text"}
                name="email"
                label="Email"
              />

              <CustomizedInput
                name="logincode"
                label="Login Code"
                type={"text"}
                placeholder="#000000"
                InputLabelProps={{
                  shrink: true,
                }}
                InputProps={{
                  endAdornment: (
                    <InputAdornment position="end">
                      <IconButton edge="end">
                        <StyleIconify icon={"material-symbols:code-blocks"} />
                      </IconButton>
                    </InputAdornment>
                  ),
                }}
              />
            </>
          )}
          {pages === 3 && (
            <NewPasswordForm
              newPassword={emptyNewPassword ? "Confirm your password " : ""}
              password={emptyPassword ? " Password Required" : ""}
              passwordError={password}
              successMessages={successMessage}
            />
          )}
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
          {pages === 1 || pages === 2 ? (
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
              Verify
            </LoadingButton>
          ) : (
            <></>
          )}
        </Stack>

        <Stack
          direction="row"
          alignItems="center"
          justifyContent="space-between"
          sx={{ my: 2 }}
        >
          <Typography color={"#fff"} variant="body1">
            Version 1.0.2.9 - 12/24/2022
          </Typography>
        </Stack>
      </FormProvider>
    </>
  );
}
