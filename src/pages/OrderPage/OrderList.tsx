// material
import { Container, Typography } from "@mui/material";

import { Box } from "@mui/system";
import DataTable from "~/components/TableData/index";
import Page from "@components/Page";
import { If, Then, Else } from "react-if";
import SuspenseLoader from "@components/SuspenseLoader";
import { styled } from "@mui/material/styles";

// ----------------------------------------------------------------------
const Title = styled(Typography)(
  () => ` 
    font-style: normal;
    font-weight: 600!important;
    font-size: 40px!important;
    line-height: 82px!important; 
    color: #44A2DF; 
`
);

const StyledContainer = styled("section")(
  () => `
    display: flex;
    align-items: center;
    justify-content: center;
    flex-direction: column;

`
);

export default function OrderPage() {
  return (
    <>
      <Page sx={{ zIndex: 2 }}>
        <If condition={false}>
          <Then>
            <SuspenseLoader />
          </Then>
          <Else>
            <Container sx={{ position: "relative" }} maxWidth="xl">
              <Box>
                <Title gutterBottom variant="h5">
                  Orders
                </Title>
              </Box>
              <StyledContainer>
                <DataTable />
              </StyledContainer>
            </Container>
          </Else>
        </If>
      </Page>
    </>
  );
}
