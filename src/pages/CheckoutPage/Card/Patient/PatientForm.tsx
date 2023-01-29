import * as Yup from "yup";
import {
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useRef,
  useState,
} from "react";
import { Typography, Grid } from "@mui/material";
import {
  RHDateField,
  RHDropDownSearch,
  RHFTextFieldForm,
  RHFPhoneInput,
} from "@components/hook-form";
import { FormProvider } from "@components/hook-form";
import { MethodeType } from "~/types";
// components
import { SnackbarOrigin } from "@mui/material/Snackbar";
import { Box } from "@mui/material";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { GetAllState } from "~/repositories/ddllist.service";
import { LoadingButton } from "@mui/lab";
import styled from "@emotion/styled";
import { CreatePatientContact } from "~/repositories/customerContact.service";
import { AdressType, FormType } from "~/pages/CheckoutPage/Card/Patient/index";
import Toast from "~/components/Notification";
import dayjs from "dayjs";
import { ShopContext } from "~/contexts/ShopContext";

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
  { name: "patientfirstname", label: "Patient First Name" },
  { name: "patientmiddlename", label: "Patient Middle Name" },
  { name: "patientlastname", label: "Patient Last Name" },
  { name: "phone", label: "Phone" },
  { name: "email", label: "Email" },
  { name: "address1", label: "Address 1" },
  { name: "address2", label: "Address 2" },
  { name: "city", label: "City" },
  { name: "state", label: "State" },
  { name: "zip", label: "ZIP" },
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
  birthdate: null,
};

export default function PatientForm(props: SimpleDialogProps) {
  const { onClose, onFetch, onSelectCreated } = props;
  const { order, onChangeOrder } = useContext(ShopContext);
  const [listStates, setListStates] = useState<Array<any>>([]);
  const [selectedStates, setSelectedStates] = useState<IDefaultValues>();
  const GetAllStates = useRef(GetAllState);
  const [isOpen, setIsOpen] = useState<boolean>(false);

  const RegisterSchema = Yup.object().shape({
    patientid: Yup.string().required(" Patient ID required"),
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
    birthdate: Yup.date().required("Must enter start date"),
  });

  const methods = useForm({
    resolver: yupResolver(RegisterSchema),
    defaultValues: DEFAULT_VALUES,
  });
  const { handleSubmit, setValue, reset } = methods;

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

  const onSubmit = useCallback(
    async (data: Record<string, any>) => {
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
        birthdate: dayjs(data.birthdate).format("YYYY-MM-DD"),
        city: data.city,
      };
      await CreatePatientContact(dataCreate).then(
        async response => {
          const CreatedId = response.data.data[0].id;
          onClose();
          onFetch();
          onSelectCreated(CreatedId);
          reset(DEFAULT_VALUES);
          setSelectedStates(undefined);
          onChangeOrder({ ...order, shipto_id: CreatedId });
        },
        error => {
          console.log("error", error);
          setIsOpen(true);
        }
      );
    },
    [order, onClose, onFetch, onSelectCreated, reset]
  );

  const handleClose = () => {
    onClose();
    reset(DEFAULT_VALUES);
  };
  const OnCloseToast = () => {
    setIsOpen(false);
  };
  return (
    <Box>
      <Toast
        open={isOpen}
        message={"Your Patient ID is multupled"}
        onClose={OnCloseToast}
        severity={"error"}
      />
      <StyledOrderTitle
        sx={{
          textAlign: "start",
        }}
      >
        Add New Patient
      </StyledOrderTitle>
      <FormProvider
        methods={methods as unknown as MethodeType}
        onSubmit={handleSubmit(onSubmit)}
      >
        <Grid container spacing="10px">
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
                    <RHFPhoneInput name={field.name} key={index} />
                  </Grid>
                ) : (
                  <>
                    <Grid key={index} item xs={12} md={6} lg={6}>
                      <RHFTextFieldForm
                        sx={{
                          borderRadius: " 50%",
                        }}
                        name={field.name}
                        key={index}
                        placeholder={field.label}
                      />
                    </Grid>
                  </>
                )}
              </>
            ))}
          </>

          <Grid item xs={12} md={6} lg={6}>
            <RHDateField
              sx={{
                width: "100%",
                maxHeight: "56px",
              }}
              name={"birthdate"}
            />
          </Grid>

          <Grid item xs={12} md={6} lg={6}>
            <Box
              display={"flex"}
              justifyContent="flex-end"
              sx={{
                gap: "10px",
                padding: " 30px 0",
              }}
            ></Box>
          </Grid>

          <Grid item xs={12} md={6} lg={6}>
            <Box
              display={"flex"}
              justifyContent="end"
              sx={{
                gap: "10px",
                padding: " 30px 0",
              }}
            >
              <CancelButton variant="contained" onClick={() => handleClose()}>
                CANCEL
              </CancelButton>

              <CheckoutButton type="submit" variant="contained">
                SAVE
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
          </Grid>
        </Grid>
      </FormProvider>
    </Box>
  );
}
const CheckoutButton = styled(LoadingButton)(
  // eslint-disable-next-line no-empty-pattern
  ({}) => `
    && {
      .disabled {
        background: grey;
        opacity: 0.5;
      }  
    background: #1CB7EC;
    padding: 14px;
    color: #FFF; 
    font-size: 20px;
    border-radius: 0;
    display: inline-block;
    float: left;
    background: #12a7da;
    padding: 10px 20px;
    }
`
);
const CancelButton = styled(LoadingButton)(
  // eslint-disable-next-line no-empty-pattern
  ({}) => `
    && {
      .disabled {
        background: grey;
        opacity: 0.5;
      }
     display: inline-block;
    float: left;
    background: none;
    border: 1px solid #12a7da;
    padding: 10px 20px;
    color: #12a7da;
    font-size: 16px;
    text-transform: uppercase;
    border-radius: 0; 

`
);

const StyledOrderTitle = styled(Typography)(
  () => ` 
    font-style: normal; 
    line-height: 18px !important;
    font-size: 20px;
    color: #000;
    font-weight: 100;
    margin-bottom: 10px;

`
);
