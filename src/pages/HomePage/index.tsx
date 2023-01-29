import { Typography } from "@mui/material";
import { styled } from "@mui/material/styles";
import Box from "@mui/material/Box";
import HomeImage from "~/assets/images/banner1.jpg";

const HomePage = () => {
  return (
    <>
      <Box
        sx={{
          position: "relative",
          padding: "0!important",
        }}
      >
        <Box
          sx={{
            backgroundImage: `url(${HomeImage})`,
            width: "100%",
            height: { lg: "550px", md: "550px", sm: "200px", xs: "200px" },
            backgroundRepeat: "no-repeat",
            backgroundSize: "cover",
          }}
        >
          <StyledFirstTitle
            sx={{
              fontSize: { lg: "60px", md: "60px", sm: "27px", xs: "27" },
              padding: {
                lg: "140px 100px",
                md: "140px 100px",
                sm: " 27px 24px",
                xs: "27px 24px",
              },
            }}
          >
            Healthcare simplified for everyone
          </StyledFirstTitle>
        </Box>

        <StyledBox
          sx={{
            background: "#fff",
          }}
        >
          <StyledTitleTow>ABOUT US</StyledTitleTow>
          <StyledTitle>Who We Are</StyledTitle>
          <StyledDetails>
            MedSolutions is a reliable supplier with 41 years experience. We are
            specialized in MED-ICAL EQUIPMENTS & ACCESSORIES. We have been
            exporting to North American for 27 years. Our campany products have
            successively passed product system certification in many countries,
            among which TLC UL.ETL is one of the earliest certified companies in
            China.30 years. have successively passed product system
            certification in many countries, among which TLC UL.ETL is one of
            the earliest certified companies in China.30 years.
          </StyledDetails>
        </StyledBox>
      </Box>
    </>
  );
};
const StyledBox = styled(Box)(
  () => `  
    padding: 40px 40px 20px  !important;
    width: 100%; 
    display: flex;
    align-items:center;
    flex-direction: column; 
`
);

const StyledFirstTitle = styled(Typography)(
  () => `
  color: #fff;
  text-shadow: 3px 3px 6px rgba(0, 0, 0, 1);
  width: 45%;
  text-align: left;
    
`
);
const StyledTitle = styled(Typography)(
  () => `
  color: #000;
  font-weight: 500;
  text-align: center;
  font-size: 36px !important;
  text-transform: capitalize;
  line-height: 1.2;
`
);
const StyledTitleTow = styled(Typography)(
  () => `
    font-size: 14px;
    color: #767676;
    letter-spacing: 2px;
    text-transform: uppercase;
    text-align: center;
    font-weight: normal;
`
);

const StyledDetails = styled(Typography)(
  ({ theme }) => `
 color: #000;
 font-size: 14px;
 margin: 0 0 10px;
 font-weight: 400;
 line-height: 28px;
 display: flex;
 align-items: center;
 justify-content: center;
 padding: 1.3em 10% 1.3em
`
);

export default HomePage;
