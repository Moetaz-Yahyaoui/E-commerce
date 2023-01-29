import { styled, Box, Card, Divider } from "@mui/material";
import { ReactNode, memo, ChangeEvent } from "react";
import Header from "../BulkActions";

const SubPage = ({
  title,
  children,
  onHandleSearch,
  onOpenForm,
  sx,
}: {
  title: string;
  children: ReactNode;
  onHandleSearch: (event: ChangeEvent<HTMLInputElement>) => void;
  onOpenForm: () => void;
  sx?: any;
}): JSX.Element => {
  return (
    <CardStyled>
      <Box flex={1} p={1}>
        <Header
          onOpenForm={onOpenForm}
          onHandleSearch={onHandleSearch}
          title={title}
        />
      </Box>
      <Divider />
      <Box flex={1} p={2} {...sx}>
        {children}
      </Box>
    </CardStyled>
  );
};

const CardStyled = styled(Card)(
  () => `
    && {
      box-shadow: unset;
      border-radius:0;
    }
`
);

export default memo(SubPage);
