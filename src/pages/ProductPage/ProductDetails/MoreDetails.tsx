// material
import { Box, styled, Typography, useTheme } from "@mui/material";
import { FC, useState } from "react";
import { CheckBox } from "@mui/icons-material";

enum TabType {
  Specification = "specification",
  Features = "features",
}

const MoreDetails: FC<any> = ({ productDetails }: { productDetails: any }) => {
  const theme = useTheme();
  const [selectedTab, setSelectedTab] = useState<TabType>(
    TabType.Specification
  );
  const handleChangeTab = (value: TabType) => {
    setSelectedTab(value);
  };

  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        alignItems: "start",
        width: "100%",
        gap: "5px",
        backgroundColor: "#fff",
        padding: "5px",
        [theme.breakpoints.up("lg")]: {
          flexDirection: "row",
          width: "81%",
        },
      }}
    >
      <Box
        sx={{
          display: "flex",
          flexDirection: "row",
          gap: "3px",
          width: "100%",
          [theme.breakpoints.up("lg")]: {
            flexDirection: "column",
            width: "auto",
          },
        }}
      >
        <StyledTab
          selected={selectedTab === TabType.Specification}
          onClick={() => handleChangeTab(TabType.Specification)}
        >
          Details
        </StyledTab>
        <StyledTab
          selected={selectedTab === TabType.Features}
          onClick={() => handleChangeTab(TabType.Features)}
        >
          Features
        </StyledTab>
      </Box>
      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          gap: "18px",
          padding: "40px",
          width: "100%",
          backgroundColor: "#fff",
        }}
      >
        {selectedTab === TabType.Specification ? (
          <StyledMoreTitle>Product Specification</StyledMoreTitle>
        ) : (
          <StyledMoreTitle>Features</StyledMoreTitle>
        )}
        {selectedTab === TabType.Specification ? (
          <Box
            sx={{
              color: "#000",
              p: "10px",
            }}
          >
            {productDetails?.skuSpecification?.length > 0 &&
              productDetails?.skuSpecification?.map(
                (specification: any, index: number) => (
                  <StyledTitle key={specification.name + index}>
                    {specification.name}:
                    <StyledDetails> {specification.value}</StyledDetails>
                  </StyledTitle>
                )
              )}
          </Box>
        ) : (
          <Box
            sx={{
              display: "flex",
              flexDirection: "column",
              color: "#000",
              gap: "10px",
            }}
          >
            {productDetails?.feature?.length > 0 &&
              productDetails?.feature?.map((feature: any, index: any) => (
                <Typography
                  key={index}
                  sx={{ display: "flex", alignItems: "center", gap: "10px" }}
                >
                  {/* <StarIcon sx={{ color: "gold" }} /> */}
                  <CheckBox sx={{ color: "#1CB7EC" }} />
                  {feature}
                </Typography>
              ))}
          </Box>
        )}
      </Box>
    </Box>
  );
};

const StyledTitle = styled(Typography)(
  () => `
    display: flex;
    gap: 20px; 
    align-items: center;
    color: #000000; 
    font-size: 20px;
    font-family: proxima-nova,"Helvetica Neue",Helvetica,Helvetica,Arial,sans-serif;
    font-weight: 600;
    letter-spacing: 0.03em;
    border-bottom: 1px solid #ddd;
    padding: 5px 0;
`
);

const StyledDetails = styled(Typography)(
  () => ` 
    color: #000000; 
    font-size: 16px;  
    font-weight: 300;
    font-family: proxima-nova,"Helvetica Neue",Helvetica,Helvetica,Arial,sans-serif;
}  
`
);

const StyledMoreTitle = styled(Typography)(
  () => ` 
  font-size: 20px;
  color: #000;
  font-weight: 600;
  letter-spacing: 1px;
}
`
);

const StyledTab = styled<any>(Typography)(
  ({ theme, selected }) => ` 
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 20px;
  width: 100%;
  height: 100px;
  color: #000;
  font-weight: 600;
  background-color: ${selected ? "#ddd" : "#FFF"};
  border: 1px solid #ddd;
  letter-spacing: 1px;
  text-align: center;
  padding: 10px;
  cursor: pointer;

  @media (min-width: ${theme.breakpoints.values.lg}px) {
    width: 250px;
  }
}  
`
);

export default MoreDetails;
