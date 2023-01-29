import React, {
  useCallback,
  useState,
  ReactNode,
  useEffect,
  FC,
  useMemo,
  useContext,
} from "react";
import {
  getAllPatientsByCustomerId,
  getAllPatientsList,
} from "~/repositories/customerContact.service";
import {
  Typography,
  IconButton,
  Autocomplete,
  TextField,
  styled,
} from "@mui/material";
import Box from "@mui/material/Box";
import Accordion from "@mui/material/Accordion";
import AccordionSummary from "@mui/material/AccordionSummary";
import AccordionDetails from "@mui/material/AccordionDetails";
import AddCircleIcon from "@mui/icons-material/AddCircle";
import { ShopContext } from "~/contexts/ShopContext";
import PatientForm from "./PatientForm";
import { AuthContext } from "~/contexts/authContext";

export enum AdressType {
  Shipping = "shipping",
  Billing = "billing",
}

export enum FormType {
  Create = "create",
  Edit = "edit",
}

export interface ICustomerContactProps {
  customerID?: any;
  isOpen?: boolean;
  onOpenForm?: () => void;
  onCloseForm?: () => void;
  query?: string;
  onHandleSelectedItems?: (items: any) => void;
  selectedID?: number;
  selected?: number;
  update?: boolean;
  handleUpdate?: () => void;
  type?: AdressType;
}
type IDefaultValues = Record<string, any>;

const IconCustomButton = ({
  onClick,
  children,
}: {
  onClick?: () => void;
  children: ReactNode;
}) => (
  <IconButton
    onClick={onClick}
    sx={{
      boxShadow: "0px 0px 9px rgba(0, 0, 0, 0.25)",
      fontStyle: "normal",
      fontWeight: "600",
      lineHeight: "19px",
      color: "#FFF!important",
      width: "250px",
      borderRadius: "10px",
      height: "50px",
      display: "flex",
      gap: "15px",
      float: "right",
      background: " #12a7da",
      fontSize: "16px",
      borderRdius: "4px",
      padding: "10px 20px",
      ":hover": {
        backgroundColor: "#000",
      },
    }}
  >
    {children}
  </IconButton>
);
IconCustomButton.displayName = "IconCustomButton";
const PatientPage: FC<ICustomerContactProps> = ({ type }) => {
  const [isExpanded, setisExpanded] = useState<boolean | undefined>(false);
  const { order, onChangeOrder } = useContext(ShopContext);
  const { user } = useContext(AuthContext);

  const [shipping, setShipping] = React.useState<
    Record<string, any> | undefined
  >();

  const [shippingList, setShippingList] = React.useState<Array<any>>([]);
  const [createdId, setCreatedId] = useState<number>();

  const GetShippingList = React.useRef(getAllPatientsByCustomerId);

  const getAllShipping = useCallback(async () => {
    await GetShippingList.current(user?.customerid).then(
      (response: any) => {
        setShippingList(response.data.data);
        const filtred = response.data.data.filter(
          (item: any) => item.id === order?.shipto_id
        );
        filtred?.length > 0 && setShipping(filtred[0]);
      },
      (error: any) => {
        console.log("error", error);
      }
    );
  }, [order?.shipto_id, user?.customerid]);

  useEffect(() => {
    getAllShipping();
  }, [getAllShipping]);

  useEffect(() => {
    // eslint-disable-next-line @typescript-eslint/no-unused-expressions
    shippingList;
  }, [shippingList]);

  const defaultProps = useMemo(() => {
    return {
      options: shippingList,
      getOptionLabel: (option: any) =>
        `${option.name} ${option.city} ${option.state}`,
    };
  }, [shippingList]);

  const handleSelect = useCallback(
    (event: IDefaultValues | null) => {
      if (event) {
        setShipping(event);
        onChangeOrder({ ...order, shipto_id: event.id });
      }
      if (event === null) {
        onChangeOrder({ ...order, shipto_id: 0 });
        setShipping(undefined);
      }
    },
    [onChangeOrder]
  );

  const createDefaultValue = useMemo(() => {
    return shipping;
  }, [shipping]);

  const handleSelectCreatedId = useCallback((patientId: number) => {
    setCreatedId(patientId);
  }, []);

  const handleSelectCreated = useCallback(
    (patientId: number) => {
      const filtred = shippingList?.filter(
        (item: any) => item.id === patientId
      );
      if (filtred?.length > 0) {
        setShipping(filtred[0]);
        onChangeOrder({ ...order, shipto_id: filtred[0].id });
      }
    },
    [onChangeOrder, shippingList]
  );

  useEffect(() => {
    createdId && handleSelectCreated(createdId);
  }, [createdId, handleSelectCreated]);

  return (
    <StyledProductCart>
      <StyledAddressDescription>
        <StyledBox>
          <StyledTypography>Select Shipping Adress</StyledTypography>

          <Accordion expanded={isExpanded}>
            <StyledAccordion
              expandIcon={
                <IconCustomButton onClick={() => setisExpanded(true)}>
                  <AddCircleIcon sx={{ color: "#fff", fontSize: "30px" }} /> Add
                  New Address
                </IconCustomButton>
              }
              // aria-controls="panel1a-content"
              id="panel1a-header"
              sx={{
                borderBottom: " 1px solid #ccc",
                borderRadius: "0",
                pb: "30px",
              }}
            >
              <StyledAutocomplete
                {...defaultProps}
                value={shipping || null}
                onChange={(event: any, newValue: any) => {
                  handleSelect(newValue);
                }}
                id="controllable-states-demo"
                sx={{
                  width: "100%",
                  height: "50px",
                  borderRadius: "4px",
                }}
                isOptionEqualToValue={(option: any, value: any) =>
                  option.id === value.id
                }
                renderInput={(params: any) => (
                  <StyledTextField
                    placeholder="address populated here...."
                    {...params}
                    size="small"
                    fullWidth
                  />
                )}
              />
            </StyledAccordion>
            <AccordionDetails
              sx={{
                padding: "30px",
              }}
            >
              <Typography>
                <PatientForm
                  actionTow={"Save"}
                  type={type}
                  patient={createDefaultValue}
                  open={false}
                  onSelectCreated={handleSelectCreatedId}
                  onFetch={getAllShipping}
                  onClose={() => setisExpanded(false)}
                />
              </Typography>
            </AccordionDetails>
          </Accordion>
        </StyledBox>
      </StyledAddressDescription>
    </StyledProductCart>
  );
};

const StyledAutocomplete = styled(Autocomplete)(
  () => ` && {
    border-color: #ddd !important;
    input {
      height: 32px;
    }
    fieldset{
      border: 1px solid #ddd !important;
      border-radius: 10px;
    }
    & .MuiOutlinedInput-root {
      padding-right: 13px !important;
    }
  }
`
);

const StyledProductCart = styled(Box)(
  () => ` 
  display: flex;
  flex-direction: column; 
`
);

const StyledAddressDescription = styled(Typography)(
  () => `  
     display: flex;
     gap: 10px;
`
);
const StyledAccordion = styled(AccordionSummary)(
  () => ` 
&& {
  background: #FFF;
  gap: 30px;
  & .MuiAccordionSummary-expandIconWrapper,
    .Mui-expanded {
    transform: rotate(0deg);
  }
    & .MuiAccordionSummary-content {
        width: 100%;
    }
    @media(max-width: 960px){
      flex-direction: column;
    }
  }
`
);
const StyledBox = styled(Box)(
  () => `
    padding: 20px 0 0 0;
`
);
const StyledTypography = styled(Typography)(
  () => `
    color: #000; 
    font-weight: 700;
    font-size: 14px !important;
    margin-bottom: 10px;
    letter-spacing: 1.5px; 
    padding: 30px 30px 0px;
`
);
const StyledTextField = styled(TextField)(
  () => `  
 && { 
..MuiInputBase-root  .MuiOutlinedInput-notchedOutline { 
    border: none;
}
input::placeholder {
    font-weight: 100;
    opacity: 1;
        color: #000;
}
}
}

`
);
export default PatientPage;
