import { styled, Typography, Box, Card, Divider } from "@mui/material";
import { ReactNode, memo, FC } from "react";

type ISubPage = {
  title: string;
  children: ReactNode;
} & any;

const SubPage: FC<ISubPage> = ({
  title,
  children,
  ...options
}): JSX.Element => {
  return (
    <CardStyled {...options}>
      <Box flex={1} p={2}>
        <Box display="flex" alignItems="center" justifyContent="space-between">
          <Box display="flex" alignItems="center">
            <Typography variant="h5" color="text.secondary">
              {title}
            </Typography>
          </Box>
        </Box>
      </Box>
      <Divider />
      <Box flex={1} p={2}>
        {children}
      </Box>
    </CardStyled>
  );
};

const CardStyled = styled(Card)(
  () => `
    && {
      overflow-y: scroll;
      box-shadow: unset;
      border-radius:0;
    }
`
);

export default memo(SubPage);
