import { FC, useCallback, useContext, useEffect, useState } from "react";
import { Button, Typography, Grid } from "@mui/material";
import { styled } from "@mui/material/styles";
import Box from "@mui/material/Box";
import { RHFTextField } from "@components/hook-form";
import RHFRadioGroup from "@components/hook-form/RHFRadio";
import { FormProvider } from "@components/hook-form";
import { useForm } from "react-hook-form";
import { MethodeType } from "~/types";
import { yupResolver } from "@hookform/resolvers/yup";
import * as Yup from "yup";
// @mui
import { Divider } from "@mui/material";
import { LoadingButton } from "@mui/lab";
// components
import { RHDateField } from "@components/hook-form";
import { Create, Modify } from "~/repositories/customerPaymentDetails.service";
import MuiAlert, { AlertProps } from "@mui/material/Alert";
import { SnackbarOrigin } from "@mui/material/Snackbar";
import dayjs, { Dayjs } from "dayjs";
import { AuthContext } from "~/contexts/authContext";
type IDefaultValues = Record<string, any>;

// const DEFAULT_VALUES: IDefaultValues = {
//   name: "",
//   city: "",
//   state: "",
//   phone: "",
//   email: "",
//   fax: "",
//   comments: "",
//   tags: "",
//   paymenttermid: "",
//   taxexempt: false,
// };
const SaveButton = styled(LoadingButton)(
  ({ theme }) => `
    && {
      background: #1CB7EC;
      width:${theme.typography.pxToRem(111)};
      padding:${theme.typography.pxToRem(14)};
    }
`
);
const FormInputListPayment = [
  { name: "expirydate", label: "PExp. Date" },
  { name: "cvv", label: "CVV" },
];

const DEFAULT_VALUES = {
  customerid: 0,
  paymenttype: "cc",
  name: "",
  cc: "",
  expirydate: dayjs().format("YYYY-MM-DD"),
  cvv: "",
};
export interface IPropscompanyForm {
  dataForm: Record<string, any> | null;
  onCloseForm: (success?: boolean) => void;
}
export interface State extends SnackbarOrigin {
  open: boolean;
}

const CartPaymentForm: FC = () => {
  const [state, setState] = useState<State>({
    open: false,
    vertical: "top",
    horizontal: "right",
  });
  const { vertical, horizontal, open } = state;
  const [error, setError] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const [openSnack, setOpenSnack] = useState(false);

  const { user } = useContext(AuthContext);

  const handleClose = () => {
    setState({ ...state, open: false });
  };
  const handleOpen = useCallback(() => {
    setState({ ...state, open: true });
  }, []);

  const RegisterSchema = Yup.object().shape({
    name: Yup.string().required("Name Required"),
    cc: Yup.string()
      .required("CC Required")
      .matches(/^[0-9]+$/, "Must Be Only Digits")
      .min(13, "Must Have More Than 13 Digits")
      .max(16, "Must Have Less Than 16 Digits"),
    cvv: Yup.string()
      .required("CVV Required")
      .matches(/^[0-9]+$/, "Must Be Only Digits")
      .min(3, "Must Be Exactly 3 Digits")
      .max(3, "Must Be Exactly 3 Digits"),
  });

  const methods = useForm({
    resolver: yupResolver(RegisterSchema),
    defaultValues: DEFAULT_VALUES,
  });

  const {
    handleSubmit,
    formState: { isSubmitting },
    reset,
    setValue,
  } = methods;

  const resetAsyncForm = useCallback(
    async (dataForm: IDefaultValues) => {
      reset(dataForm);
    },
    [reset]
  );

  // useEffect(() => {
  //   if (dataForm) {
  //     resetAsyncForm({
  //       ...dataForm,
  //       expirydate: dayjs()
  //         .set("year", dataForm.expiryyear)
  //         .set("month", dataForm.expirymonth - 1)
  //         .format("YYYY-MM-DD"),
  //     } as unknown as any);

  //     // reset(dataForm);
  //   }
  // }, [dataForm]);

  const onSubmit = useCallback(
    async (data: IDefaultValues) => {
      // if (id) {
      //   data.customerid = parseInt(user?.customerid);
      //   data.expiryyear = dayjs(data.expirydate).year();
      //   data.expirymonth = dayjs(data.expirydate).month() + 1;
      //   delete data.expirydate;
      //   Modify(id, data).then(
      //     async () => {
      //       handleOpen();
      //       onCloseForm(true);
      //     },
      //     (error) => {
      //       const message =
      //         error?.response?.data?.message || "Please Check your data!";
      //       setError(true);
      //       setOpenSnack(true);
      //       setErrorMessage(message);
      //     }
      //   );
      // } else {
      data.customerid = parseInt(user?.customerid);
      data.expiryyear = dayjs(data.expirydate).year() || dayjs().year();
      data.expirymonth =
        dayjs(data.expirydate).month() + 1 || dayjs().month() + 1;
      delete data.expirydate;
      await Create(data).then(
        async () => {
          handleOpen();
        },
        (error) => {
          console.log("error", error);
          const message =
            error?.response?.data?.message || "Please Check your data!";
          setError(true);
          setOpenSnack(true);
          setErrorMessage(message);
        }
      );
      // }
    },
    [user?.customerid, handleOpen]
  );
  const handleCloseSnack = (event: any, reason: string) => {
    if (reason === "clickaway") {
      return;
    }

    setOpenSnack(false);
  };

  return (
    <StyledProductCart>
      <StyledPaymentTitle
        sx={{
          textAlign: "start",
        }}
      >
        Card Info{" "}
        {/* <StyledRadio>
          <RHFRadioGroup
            value={"Credit/Debit card"}
            label={"Credit/Debit card"}
          />
          <RHFRadioGroup value={"Paypal"} label={"Paypal"} />
          <RHFRadioGroup
            value={"Cash on Delivery"}
            label={"Cash on Delivery"}
          />
        </StyledRadio> */}
      </StyledPaymentTitle>
      <FormProvider
        methods={methods as unknown as MethodeType}
        onSubmit={handleSubmit(onSubmit)}
      >
        <Box
          sx={{
            gap: "8px",
            marginTop: "8px",
            flexDirection: "column",
            display: "flex!important",
          }}
        >
          <RHFTextField name="name" label={"Card Holder Name"} />
          <RHFTextField name="cc" label={"Card Number"} />
        </Box>

        <Box
          sx={{
            marginTop: "10px",
            display: "flex!important",
            gap: "22px",
          }}
        >
          {FormInputListPayment.map((field, index) => (
            <Grid
              sx={{
                maxWidth: "129px",
              }}
              key={index}
              item
              xs={4}
            >
              <RHFTextField
                sx={{
                  maxWidth: "129px",
                  background: "#FAFAFA",
                  boxShadow: "0px 0px 14px rgb(0 0 0 / 25%)",
                  borderRadius: " 50%",
                }}
                name={field.name}
                key={index}
                label={field.label}
              />
            </Grid>
          ))}
        </Box>
        <SaveButton
          size="large"
          type="submit"
          variant="contained"
          loading={isSubmitting}
          sx={{ marginTop: "20px" }}
        >
          Save
        </SaveButton>
      </FormProvider>
    </StyledProductCart>
  );
};
const StyledProductCart = styled(Box)(
  () => `
  width: 400px;
`
);

const StyledPaymentTitle = styled(Box)(
  () => `
    font-style: normal;
    font-weight: 600 !important;
    font-size: 22px !important;
    line-height: 18px !important; 
    color: #6B6B6B !important; 
    width: 100%;
    align-items: center;
`
);

export default CartPaymentForm;
