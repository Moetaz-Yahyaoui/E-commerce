import { Box, styled, Typography } from "@mui/material";
import Clients from "~/assets/images/clients.jpg";

const images = [
  {
    imgPath: "/static/image/b1.jpg",
    texte:
      "Why Men Should Stay on Top of Health ScreeningsWhy Men Should Stay on Top of Health Screenings",
    date: "5.11.23",
  },
  {
    imgPath: "/static/image/b2.jpg",
    texte: "Why Physicals Are Especially Important for Teens and Young Men",
    date: "5.11.23",
  },
  {
    imgPath: "/static/image/b3.jpg",
    texte: "Self Management Is the Key to Unlocking a Bright Future",
    date: "5.11.23",
  },
];

const BlogSection = () => {
  return (
    <Box
      sx={{
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        flexDirection: "column",
      }}
    >
      <StyledTitleTow> OUR BLOG</StyledTitleTow>
      <StyledTitle sx={{ paddingBottom: "20px" }}>Knowledge Base</StyledTitle>
      <Box
        sx={{
          display: "flex",
          justifyContent: "space-between",
          width: "80%",
          gap: "10px",
          paading: {
            lg: "40px 0px 0px",
            md: "40px 0px 0px",
            sm: "20px",
            xs: "20px",
          },
          flexDirection: { lg: "row", md: "row", xs: "column", sm: "column" },
        }}
      >
        {images.map(image => (
          <Box
            sx={{
              display: "flex",
              alignItems: "center",
              justifyContent: {
                lg: "flex-start",
                md: "flex-start",
                sm: "center",
                xs: "center",
              },
              flexDirection: "column",
              width: "100%",
              gap: "10px",
              height: "auto",
            }}
          >
            <Box
              component="img"
              src={image.imgPath}
              sx={{
                width: { lg: "100%", md: "100%", sm: "100%", xs: "100%" },
              }}
            />
            <StyledDetails
              sx={{
                fontSize: { lg: "18px", md: "18px", sm: "14px", xs: "14px" },
                textAlign: { sm: "center", xs: "center" },
                display: "flex",
                alignItems: "center",
                justifyContent: {
                  lg: "flex-start",
                  md: "flex-start",
                  sm: "center",
                  xs: "center",
                },
              }}
            >
              {image.texte}
            </StyledDetails>
            <StyledDate>{image.date}</StyledDate>
          </Box>
        ))}
      </Box>
      <Box
        sx={{
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          width: "100%",
        }}
      >
        <Box component="img" src={Clients} sx={{ width: "100%" }} />
      </Box>
    </Box>
  );
};
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
const StyledDetails = styled(Typography)(
  () => `
    color: #000; 
    font-weight: 500;
    margin-bottom: 20px;
    font-family: 'Poppins', sans-serif;
`
);
const StyledDate = styled(Typography)(
  () => `
  font-size: 14px;
  margin-bottom: 20px;
  color: #b8a87f;
  line-height: 30px;
    padding: 0 0 1.3em;
    font-weight: 400;
`
);
export default BlogSection;
