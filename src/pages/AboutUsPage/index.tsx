import { Box, Typography } from "@mui/material";
import React from "react";
import ABT from "~/assets/images/abt.jpg";
import SB1 from "~/assets/images/sb1.jpg";
import { styled } from "@mui/material/styles";

const AboutUsPage = () => {
  return (
    <>
      <Box
        sx={{
          position: "relative",
          padding: "0!important",
          overflowX: "hidden",
        }}
      >
        <Box
          sx={{
            backgroundImage: `url(${ABT})`,
            width: "100%",
            height: "100%",
            backgroundRepeat: "no-repeat",
            backgroundSize: "cover",
          }}
        >
          <StyledTitle
            sx={{
              fontSize: { lg: "60px", md: "60px", sm: "30px", xs: "30px" },
              padding: { lg: "150px", md: "150px", sm: "29px", xs: "29px" },
            }}
          >
            About Us
          </StyledTitle>
        </Box>
        <Box
          sx={{
            display: "flex",
            justifyContent: "flex-start",
            width: "100%",
            flexDirection: "column",
            backgroundColor: "#f8f8f8",

            padding: {
              lg: "20px 140px 60px 140px",
              md: "20px 140px 60px 140px",
              sm: "0",
              xs: "0",
            },
          }}
        >
          <StyledMiniTitle
            sx={{
              padding: "20px 40px 0px 40px",
            }}
          >
            Since 2010
          </StyledMiniTitle>
          <StyledText1
            sx={{
              padding: "0 40px 20px 40px",
            }}
          >
            MedSolutions is a reliable supplier with 41 years experience. We are
            specialized in MED-ICAL EQUIPMENTS & ACCESSORIES. We have been
            exporting to North American for 27 years. Our campany products have
            successively passed product system certification in many countries,
            among which TLC UL.ETL is one of the earliest certified companies in
            China.30 years. have successively passed product system
            certification in many countries, among which TLC UL.ETL is one of
            the earliest certified companies in China.30 years. MedSolutions is
            a reliable supplier with 41 years experience. We are specialized in
            MED-ICAL EQUIPMENTS & ACCESSORIES. We have been exporting to North
            American for 27 years. Our campany products have successively passed
            product system certification in many countries, among which TLC
            UL.ETL is one of the earliest certified companies in China.30 years.
            have successively passed product system certification in many
            countries, among which TLC UL.ETL is one of the earliest certified
            companies in China.30 years.
          </StyledText1>
          <StyledText1
            sx={{
              padding: "0 40px 40px 40px",
            }}
          >
            MedSolutions is a reliable supplier with 41 years experience. We are
            specialized in MED-ICAL EQUIPMENTS & ACCESSORIES. We have been
            exporting to North American for 27 years. Our campany products have
            successively passed product system certification in many countries,
            among which TLC UL.ETL is one of the earliest certified companies in
            China.30 years. have successively passed product system
            certification in many countries, among which TLC UL.ETL is one of
            the earliest certified companies in China.30 years.
          </StyledText1>
        </Box>
        <Box
          sx={{
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            width: "100%",
            padding: "0px 0px 60px 0px",
          }}
        >
          <Box
            sx={{
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              backgroundColor: "#fff",
              width: "80%",
              flexDirection: {
                lg: "row",
                md: "row",
                xs: "column",
                sm: "column",
              },
              gap: "20px",
            }}
          >
            <Box
              component="img"
              src={SB1}
              sx={{ width: { lg: "50%", md: "50%", sm: "100%", xs: "100%" } }}
            />
            <Box
              sx={{
                display: "flex",
                flexDirection: "column",
                maxWidth: { lg: "50%", md: "50%", sm: "100%", xs: "100%" },
              }}
            >
              <StyledMissionTitle>Our Mission</StyledMissionTitle>
              <StyledMissionTexte>
                We were founded on the belief that quality CBD should be
                effective and accessible to everyone. We keep our prices
                affordable by owning our process from beginning to end—from our
                hemp farms in Central Oregon, to extraction, formulation, and
                packaging.
              </StyledMissionTexte>
              <StyledMissionTexte>
                Our Assistance Program is at the heart of who we are as a
                company. We are here for people who rely on the benefits of CBD,
                and extend up to 60% off Lazarus Naturals products to veterans,
                people on long-term disability, and those with limited means.
              </StyledMissionTexte>
            </Box>
          </Box>
        </Box>
        <Box
          sx={{
            width: "100%",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <StyledText1 sx={{ width: "80%" }}>
            MedSolutions is a reliable supplier with 41 years experience. We are
            specialized in MED-ICAL EQUIPMENTS & ACCESSORIES. We have been
            exporting to North American for 27 years. Our campany products have
            successively passed product system certification in many countries,
            among which TLC UL.ETL is one of the earliest certified companies in
            China.30 years. have successively passed product system
            certification in many countries, among which TLC UL.ETL is one of
            the earliest certified companies in China.30 years. MedSolutions is
            a reliable supplier with 41 years experience. We are specialized in
            MED-ICAL EQUIPMENTS & ACCESSORIES. We have been exporting to North
            American for 27 years. Our campany products have successively passed
            product system certification in many countries, among which TLC
            UL.ETL is one of the earliest certified companies in China.30 years.
            have successively passed product system certification in many
            countries, among which TLC UL.ETL is one of the earliest certified
            companies in China.30 years.
          </StyledText1>
        </Box>
      </Box>
    </>
  );
};
const StyledTitle = styled(Typography)(
  () => `
  color: #fff;
  font-weight: 500;
`
);
const StyledMiniTitle = styled(Typography)(
  () => `
  color: #12a7da;
  font-size: 18px;
  margin: 0;
  padding: 0;
  line-height: 30px;
  font-weight: 500;
  `
);
const StyledText1 = styled(Typography)(
  () => `
  font-size: 16px;
  line-height: 30px;
  margin: 0 0 10px;
  padding: 0 0 1.3em;
  color: #000;
    `
);
const StyledMissionTitle = styled(Typography)(
  () => `
  font-size: 24px;
  margin-bottom: 20px;
  font-weight: 500;
  line-height: 1.2;
  color: #000;
  text-align: left;
  padding: 0 30px 0px 30px;
    `
);
const StyledMissionTexte = styled(Typography)(
  () => `
  font-size: 14px;
  color: #000;
  text-align: left;
  font-weight: 400;
  line-height: 24px;
  padding: 0 30px 20px 30px;
    `
);
export default AboutUsPage;
