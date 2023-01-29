import { ReactNode, memo, useState } from "react";
import { styled, Box } from "@mui/material";
import Accordion from "@mui/material/Accordion";
import AccordionSummary from "@mui/material/AccordionSummary";
import AccordionDetails from "@mui/material/AccordionDetails";
import AccordionActions from "@mui/material/AccordionActions";
import AddIcon from "@mui/icons-material/Add";

const ColapsableSubPage = ({
  title,
  children,
}: {
  title: ReactNode;
  children: ReactNode;
}) => {
  const [isExpanded, setisExpanded] = useState<boolean | undefined>(false);
  return (
    <StyledAccordion expanded={isExpanded}>
      <AccordionSummary
        expandIcon={<AddIcon onClick={() => setisExpanded(!isExpanded)} />}
        aria-controls="panel1a-content"
        id="panel1a-header"
        sx={{ minHeight: "36px !important" }}
        onClick={(e) => e.stopPropagation()}
        onChange={(e) => e.stopPropagation()}
      >
        <Box
          display="flex"
          justifyContent="space-between"
          width="100%"
          alignItems="center"
        >
          <Box display="flex" alignItems="center" gap="10px">
            {title}
          </Box>
          <AccordionActions></AccordionActions>
        </Box>
      </AccordionSummary>
      <AccordionDetails>{children}</AccordionDetails>
    </StyledAccordion>
  );
};

const StyledAccordion = styled(Accordion)(
  () => `
    && {
      border-radius: 0;
      .MuiAccordionSummary-content {
        margin: 0;
      }
      .MuiAccordionSummary-root {
        padding: 0;
      }
    }
`
);

export default memo(ColapsableSubPage);
