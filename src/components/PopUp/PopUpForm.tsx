import Dialog from "@mui/material/Dialog";
import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import { Typography, Grid } from "@mui/material";
import {
  RHDateField,
  RHDropDownSearch,
  RHFTextField,
  RHFPhoneInput,
} from "@components/hook-form";
import { FormProvider } from "@components/hook-form";
import { MethodeType } from "~/types";
// components
import * as Yup from "yup";

import { SnackbarOrigin } from "@mui/material/Snackbar";
import { DialogTitle, DialogContent, useMediaQuery, Box } from "@mui/material";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { GetAllState } from "~/repositories/ddllist.service";

import { useTheme } from "@mui/material/styles";
import { LoadingButton } from "@mui/lab";
import styled from "@emotion/styled";
import {
  Create,
  CreatePatientContact,
  ModifyPatient,
} from "~/repositories/customerContact.service";
import { AdressType, FormType } from "~/pages/CheckoutPage/Card/Patient/index";

export interface SimpleDialogProps {
  open: boolean;
  type?: AdressType;
  patient?: any;
  formtype?: FormType;
  selectedValue?: string;
  onSelectCreated: (id: number) => void;
  onFetch: () => void;
  onClose: () => void;
  actionOne?: string;
  actionTow?: string;
  actionThree?: string;
}

export interface State extends SnackbarOrigin {
  open?: boolean;
}

const FormInputList = [
  { name: "patientid", label: "Patient Id" },
  { name: "patientfirstname", label: "Patient First Name*" },
  { name: "patientmiddlename", label: "Patient Middle Name*" },
  { name: "patientlastname", label: "Patient Last Name*" },
  { name: "phone", label: "Phone" },
  { name: "email", label: "Email" },
  { name: "address1", label: "Address 1" },
  { name: "address2", label: "Address 2" },
  { name: "city", label: "City" },
  { name: "state", label: "State" },
  { name: "zip", label: "ZIP*" },
];
const FormInputListEdit = [
  { name: "patientid", label: "Patient Id" },
  { name: "firstname", label: "Patient First Name*" },
  { name: "middlename", label: "Patient Middle Name*" },
  { name: "lastname", label: "Patient Last Name*" },
  { name: "phone", label: "Phone" },
  { name: "email", label: "Email" },
  { name: "address1", label: "Address 1" },
  { name: "address2", label: "Address 2" },
  { name: "city", label: "City" },
  { name: "state", label: "State" },
  { name: "zip", label: "ZIP*" },
];
type IDefaultValues = Record<string, any>;
const DEFAULT_VALUES: IDefaultValues = {
  address1: "",
  address2: "",
  city: "",
  state: "",
  phone: "",
  email: "",
  fax: "",
  comments: "",
  zip: "",
  tags: "",
  paymenttermid: "",
  taxexempt: false,
  patientfirstname: "",
  patientmiddlename: "",
  patientlastname: "",
  patientid: "",
  birthdate: "",
};

export default function PopUpForm(props: SimpleDialogProps) {
  const { onClose, onFetch, onSelectCreated, open, type, patient, formtype } =
    props;
  const [listStates, setListStates] = useState<Array<any>>([]);
  const [selectedStates, setSelectedStates] = useState<IDefaultValues>();
  const GetAllStates = useRef(GetAllState);

  const theme = useTheme();
  const fullScreen = useMediaQuery(theme.breakpoints.down("md"));

  const RegisterSchema = Yup.object().shape({
    patientfirstname: Yup.string().required(" Patient First Name required"),
    patientmiddlename: Yup.string().required("Patient Middle Name required"),
    patientlastname: Yup.string().required("Patient Last Name required"),
    phone: Yup.string()
      .required("Phone Required")
      .test("phone", "Phone must be 10 digit", value =>
        !value ? false : value.length === 14
      ),
    email: Yup.string()
      .email("Email must be a valid email address")
      .required("Email required"),
    zip: Yup.string()
      .required("Zip required ")
      .matches(/^[0-9]+$/, "Must be only digits")
      .min(5, "Must be exactly 5 digits")
      .max(5, "Must be exactly 5 digits"),
  });

  const methods = useForm({
    resolver: yupResolver(RegisterSchema),
    defaultValues: DEFAULT_VALUES,
  });
  const { handleSubmit, setValue, reset } = methods;

  useEffect(() => {
    if (formtype === FormType.Edit) {
      reset(patient);
    } else {
      reset(DEFAULT_VALUES);
    }
  }, [formtype, listStates, patient, reset]);

  const getAllState = useCallback(async () => {
    await GetAllStates.current().then(
      (response: any) => {
        setListStates(
          response.data.State.map((s: any, index: number) => ({
            name: s.state,
            id: index,
          }))
        );
      },
      (error: any) => {
        console.log(error);
      }
    );
  }, [GetAllStates]);

  useEffect(() => {
    getAllState();
  }, [getAllState]);

  const defaultProps = useMemo(() => {
    return {
      options: listStates,
      getOptionLabel: (option: IDefaultValues) => option.name,
    };
  }, [listStates]);

  const handleSelectStates = (event: IDefaultValues | null) => {
    if (event) {
      setSelectedStates(event);
      setValue("state", event.name);
    }
    if (event === null) {
      setSelectedStates(undefined);
      setValue("state", "");
    }
  };
  useEffect(() => {
    if (patient && formtype === FormType.Edit) {
      const value: Array<any> = listStates?.filter(
        (state: Record<string, any>) => state?.name === patient.state
      );
      value?.length > 0 && setSelectedStates(value[0]);
    } else {
      setSelectedStates(undefined);
    }
  }, [patient, listStates, formtype]);

  const onSubmit = useCallback(
    async (data: Record<string, any>) => {
      if (type === AdressType.Shipping) {
        if (formtype === FormType.Edit) {
          const dataCreate = {
            patientid: data.patientid,
            patientfirstname: data.patientfirstname,
            patientmiddlename: data.middlename,
            patientlastname: data.patientlastname,
            email: data.email,
            state: data.state,
            address1: data.address1,
            address2: data.address2,
            zip: data.zip,
            phone: data.phone,
            birthdate: data.birthdate,
            city: data.city,
          };
          ModifyPatient(patient.id, dataCreate).then(
            async () => {
              onClose();
              onFetch();
              reset(DEFAULT_VALUES);
            },
            error => {
              console.log("error", error);
            }
          );
        } else {
          const dataCreate = {
            patientid: data.patientid,
            patientfirstname: data.patientfirstname,
            patientmiddlename: data.patientmiddlename,
            patientlastname: data.patientlastname,
            email: data.email,
            state: data.state,
            address1: data.address1,
            address2: data.address2,
            zip: data.zip,
            phone: data.phone,
            birthdate: data.birthdate,
            city: data.city,
          };
          await CreatePatientContact(dataCreate).then(
            async response => {
              const CreatedId = response.data.data[0].id;
              onClose();
              onFetch();
              onSelectCreated(CreatedId);
            },
            error => {
              console.log("error", error);
            }
          );
        }
      } else {
        await Create({
          ...data,
          contacttype: "Billing",
          contacttypeid: 1,
        }).then(
          async () => {
            onClose();
            onFetch();
          },
          error => {
            console.log("error", error);
          }
        );
      }
    },
    [formtype, onClose, onFetch, onSelectCreated, patient, reset, type]
  );

  const handleClose = () => {
    onClose();
    if (formtype === FormType.Create) {
      reset(DEFAULT_VALUES);
    } else {
      reset(patient);
    }
  };
  return (
    <Dialog
      fullScreen={fullScreen}
      open={open}
      maxWidth="md"
      fullWidth={true}
      aria-labelledby="responsive-dialog-title"
      onClose={onClose}
    >
      <DialogTitle></DialogTitle>
      <DialogContent>
        <StyledProductCart>
          <StyledOrderTitle
            sx={{
              textAlign: "start",
            }}
          >
            {formtype === FormType.Create ? (
              <>
                {type === AdressType.Shipping
                  ? "Add New Patient"
                  : "Add Billling Address"}
              </>
            ) : (
              <>
                {type === AdressType.Shipping
                  ? "Edit Patient"
                  : "Edit Billling Address"}
              </>
            )}
          </StyledOrderTitle>
          <FormProvider
            methods={methods as unknown as MethodeType}
            onSubmit={handleSubmit(onSubmit)}
          >
            <Grid container spacing="10px">
              {type === AdressType.Billing && (
                <Grid item xs={12} md={6} lg={6}>
                  <RHFTextField
                    sx={{
                      background: "#FAFAFA",
                      boxShadow: "0px 0px 14px rgb(0 0 0 / 25%)",
                      borderRadius: " 50%",
                    }}
                    name={"name"}
                    key={"index"}
                    label={"Name"}
                  />
                </Grid>
              )}
              {formtype === FormType.Create ? (
                <>
                  {FormInputList.map((field, index) => (
                    <>
                      {field.name === "state" ? (
                        <>
                          {Boolean(listStates) && (
                            <Grid item xs={12} md={6} lg={6}>
                              <RHDropDownSearch
                                name="state"
                                label="State*"
                                defaultProps={defaultProps}
                                slected={selectedStates}
                                handleSelection={handleSelectStates}
                              />
                            </Grid>
                          )}
                        </>
                      ) : field.name === "phone" ? (
                        <Grid key={index} item xs={12} md={6} lg={6}>
                          <RHFPhoneInput
                            name={field.name}
                            key={index}
                            label={field.label}
                          />
                        </Grid>
                      ) : (
                        <>
                          <Grid key={index} item xs={12} md={6} lg={6}>
                            <RHFTextField
                              sx={{
                                borderRadius: " 50%",
                              }}
                              name={field.name}
                              key={index}
                              label={field.label}
                            />
                          </Grid>
                        </>
                      )}
                    </>
                  ))}
                </>
              ) : (
                <>
                  {FormInputListEdit.map((field, index) => (
                    <>
                      {field.name === "state" ? (
                        <>
                          {Boolean(listStates) && (
                            <Grid item xs={12} md={6} lg={6}>
                              <RHDropDownSearch
                                name="state"
                                label="State*"
                                defaultProps={defaultProps}
                                slected={selectedStates}
                                handleSelection={handleSelectStates}
                              />
                            </Grid>
                          )}
                        </>
                      ) : field.name === "phone" ? (
                        <Grid key={index} item xs={12} md={6} lg={6}>
                          <RHFPhoneInput
                            name={field.name}
                            key={index}
                            label={field.label}
                          />
                        </Grid>
                      ) : (
                        <>
                          <Grid key={index} item xs={12} md={6} lg={6}>
                            <RHFTextField
                              sx={{
                                borderRadius: " 50%",
                              }}
                              name={field.name}
                              key={index}
                              label={field.label}
                            />
                          </Grid>
                        </>
                      )}
                    </>
                  ))}
                </>
              )}

              <Grid item xs={12} md={6} lg={6}>
                <RHDateField
                  sx={{
                    background: "#FAFAFA",
                    boxShadow: "0px 0px 14px rgb(0 0 0 / 25%)",
                    maxHeight: "56px",
                  }}
                  name={"birthdate"}
                  label={"Birth Date"}
                />
              </Grid>
            </Grid>
            <Box display={"flex"} justifyContent="space-between">
              <CheckoutButton type="submit" variant="contained">
                Save
              </CheckoutButton>
              {props.actionThree && (
                <CheckoutButton
                  onClick={() => handleClose()}
                  variant="contained"
                >
                  {props.actionThree}
                </CheckoutButton>
              )}
            </Box>
          </FormProvider>
        </StyledProductCart>
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
      width: 250px;
      background: #1CB7EC;
      padding:14px;
      color: #FFF;
      margin-top: 20px;
    }
`
);
const StyledProductCart = styled(Box)(
  () => ` 
};
`
);

const StyledOrderTitle = styled(Typography)(
  () => ` 
    font-style: normal;
    font-weight: 600 !important;
    font-size: 22px !important;
    line-height: 18px !important;
    display: flex;
    justify-content: space-between;
    color: #6B6B6B!important; 
    width: 100%;
    align-items: center; 
    margin: 25px 0;

`
);
