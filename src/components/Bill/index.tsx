import { FC, ChangeEvent } from "react";
import { Box, Typography, Checkbox } from "@mui/material";
interface IBilling {
  name: string;
  company: string;
  email: string;
  vat: string;
  noGutter?: boolean;
  isItemSelected: boolean;
  handleSelectOneItem: (
    event: ChangeEvent<HTMLInputElement>,
    ItemId: any
  ) => void;
}

const Bill: FC<IBilling> = ({
  name,
  company,
  email,
  vat,
  handleSelectOneItem,
  isItemSelected,
  noGutter = false,
}) => {
  return (
    <Box
      component="li"
      display="flex"
      justifyContent="space-between"
      alignItems="flex-start"
      sx={{ backgroundColor: "#f8f9fa" }}
      borderRadius="lg"
      p={3}
      mb={noGutter ? 0 : 1}
      mt={2}
    >
      <Box width="100%" display="flex" flexDirection="column">
        <Box
          display="flex"
          justifyContent="space-between"
          alignItems={{ xs: "flex-start", sm: "center" }}
          flexDirection={{ xs: "column", sm: "row" }}
          mb={2}
        >
          <Typography
            variant="button"
            fontWeight="medium"
            textTransform="capitalize"
          >
            {name}
          </Typography>

          <Box
            display="flex"
            alignItems="center"
            mt={{ xs: 2, sm: 0 }}
            ml={{ xs: -1.5, sm: 0 }}
          >
            <Checkbox
              color="primary"
              checked={isItemSelected}
              onChange={handleSelectOneItem}
              value={isItemSelected}
            />
          </Box>
        </Box>
        <Box mb={1} lineHeight={0}>
          <Typography variant="caption" color="text">
            Company Name:&nbsp;&nbsp;&nbsp;
            <Typography
              variant="caption"
              fontWeight="medium"
              textTransform="capitalize"
            >
              {company}
            </Typography>
          </Typography>
        </Box>
        <Box mb={1} lineHeight={0}>
          <Typography variant="caption" color="text">
            Email Address:&nbsp;&nbsp;&nbsp;
            <Typography variant="caption" fontWeight="medium">
              {email}
            </Typography>
          </Typography>
        </Box>
        <Typography variant="caption" color="text">
          VAT Number:&nbsp;&nbsp;&nbsp;
          <Typography variant="caption" fontWeight="medium">
            {vat}
          </Typography>
        </Typography>
      </Box>
    </Box>
  );
};

export default Bill;
