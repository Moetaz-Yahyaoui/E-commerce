import React, { FC } from "react";

import { Box } from "@mui/material";
import PopUpForm from "./PopUpForm";
import styled from "@emotion/styled";
import { LoadingButton } from "@mui/lab";

const emails = ["username@gmail.com", "user02@gmail.com"];

export interface SimpleDialogProps {
  open: boolean;
  selectedValue: string;
  onClose: (value: string) => void;
  name: string;
}

interface IProps {
  Name: string;
  disabled?: boolean;
  actionOne: string;
  actionTow?: string;
  actionThree?: string;
}
export const PopUpButton: FC<IProps> = ({
  Name,
  actionOne,
  actionTow,
  actionThree,
}: IProps) => {
  const [open, setOpen] = React.useState(false);
  const [selectedValue] = React.useState(emails[1]);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = (value: number) => {
    setOpen(false);
  };
  return (
    <Box>
      <CheckoutButton variant="outlined" onClick={handleClickOpen}>
        {Name}
      </CheckoutButton>
      <PopUpForm
        actionTow={actionTow}
        actionThree={actionThree}
        actionOne={actionOne}
        selectedValue={selectedValue}
        open={open}
        onClose={handleClose}
      />
    </Box>
  );
};
const CheckoutButton = styled(LoadingButton)(
  ({ theme }) => `
    && {
      .disabled {
        background: grey;
        opacity: 0.5;
      }
      width: 300px;
      background: #1CB7EC;
      padding:14px;
      color: #FFF;
      margin-top: 20px;
    }
`
);
