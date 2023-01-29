import React, {
  useCallback,
  ReactNode,
  useEffect,
  FC,
  useMemo,
  useContext,
} from "react";
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
import { getBillingList } from "~/repositories/customerOrder.service";
import { ShopContext } from "~/contexts/ShopContext";

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
    }}
  >
    {children}
  </IconButton>
);

IconCustomButton.displayName = "IconCustomButton";

const BillingPage: FC<ICustomerContactProps> = () => {
  const { order, onChangeOrder } = useContext(ShopContext);

  const [billing, setBilling] = React.useState<
    Record<string, any> | undefined
  >();

  const [billingList, setBillingList] = React.useState<Array<any>>([]);

  const GetBillingList = React.useRef(getBillingList);

  const getAllBilling = useCallback(async () => {
    await GetBillingList.current().then(
      (response: any) => {
        setBillingList(response.data);
        const filtred = response.data.filter(
          (item: any) => item.id === order?.billto_id
        );
        filtred?.length > 0 && setBilling(filtred[0]);
      },
      (error: any) => {
        console.log("error", error);
      }
    );
  }, [order?.billto_id]);

  useEffect(() => {
    getAllBilling();
  }, [getAllBilling]);

  const defaultProps = useMemo(() => {
    return {
      options: billingList,
      getOptionLabel: (option: any) =>
        `${option.name} ${option.city} ${option.state}`,
    };
  }, [billingList]);

  const handleSelect = useCallback(
    (event: IDefaultValues | null) => {
      if (event) {
        setBilling(event);
        onChangeOrder({ ...order, billto_id: event.id });
      }
      if (event === null) {
        onChangeOrder({ ...order, billto_id: 0 });
        setBilling(undefined);
      }
    },
    [onChangeOrder]
  );

  return (
    <StyledProductCart>
      <StyledAddressDescription>
        <StyledBox>
          <StyledTypography>Select Billing Adress</StyledTypography>

          <Accordion expanded={false}>
            <StyledAccordion
              // aria-controls="panel1a-content"
              id="panel1a-header"
              sx={{
                borderBottom: " 1px solid #ccc",
                borderRadius: "0",
                padding: "0 30px 30px 30px",
              }}
            >
              <StyledAutocomplete
                {...defaultProps}
                value={billing || null}
                onChange={(event: any, newValue: any) => {
                  handleSelect(newValue);
                }}
                id="controllable-states-demo"
                isOptionEqualToValue={(option: any, value: any) =>
                  option.id === value.id
                }
                sx={{
                  height: "50px",
                }}
                renderInput={params => (
                  <StyledTextField
                    placeholder="address populated here...."
                    {...params}
                    size="small"
                    fullWidth
                  />
                )}
              />
            </StyledAccordion>
          </Accordion>
        </StyledBox>
      </StyledAddressDescription>
    </StyledProductCart>
  );
};

const StyledAutocomplete = styled(Autocomplete)(
  () => ` && {
    border-color: #ddd !important;
    width: 60%;
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
    @media(max-width: 960px){
      width: 100%;
    }
  }
`
);

const StyledProductCart = styled(Box)(
  () => ` 
  display: flex;
  flex-direction: column;
  gap: 20px;
`
);

const StyledAddressDescription = styled(Typography)(
  () => `  
     display: flex;
     gap: 10px;
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
const StyledAccordion = styled(AccordionSummary)(
  () => ` 
&& {
  background: #FFF;
  width: 800px;
  & .MuiAccordionSummary-expandIconWrapper,
    .Mui-expanded {
    transform: rotate(0deg);
  }
    & .MuiAccordionSummary-content {
        width: 100%;
    }
    @media(max-width: 960px){
      flex-direction: column;
      width: 100%;
    }
  }
}
`
);
const StyledBox = styled(Box)(
  () => `
    padding: 20px 0 0 0;
    width:100%;
`
);
export default BillingPage;
