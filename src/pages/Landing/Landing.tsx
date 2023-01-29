import Page from "@components/Page";
import {
  Button,
  Container,
  Grid,
  MenuItem,
  MenuList,
  Typography,
} from "@mui/material";
import { useNavigate } from "react-router-dom";
import { styled } from "@mui/material/styles";
import Box from "@mui/material/Box";
import { Stack } from "@mui/system";
import LandingLogo from "~/components/Logo/LandingLogo";
import { RHSelectDropDown } from "~/components/hook-form";

export enum PLAN_TYPES {
  FREE = "FREE",
  PRO = "PRO",
  ENTERPRISE = "ENTERPRISE",
}
interface PlanFeaturesType {
  title?: string;
  features?: Array<{
    icon?: string;
    descriptions?: Array<string>;
  }>;
}

export const Menu_Item: Array<PlanFeaturesType> = [
  {
    title: "Know more",
    features: [
      {
        descriptions: ["About US", "Help Center", "How Its Work", "IFAQS"],
      },
    ],
  },
  {
    title: "Company",
    features: [
      {
        descriptions: [
          "Terms & Conditions",
          "Privacy Policy",
          "Need Help?",
          "FAQS",
        ],
      },
    ],
  },
  {
    title: "Contact US",
    features: [
      {
        icon: "Features",
        descriptions: ["+1 866-987-4149", "info@Gmail.com", "Join community"],
      },
    ],
  },
  {
    title: "Language",
    features: [
      {
        icon: "Language",
      },
    ],
  },
];

const StyledLinkFooter = styled(Typography)(
  () => `
    margin: 0;
    line-height: 1.5;
    font-size: 1rem;
    font-family: Public Sans,sans-serif;
    font-weight: 400;
    width: 100%;
    height: 127px; 
    border-top: 1px solid #FFFFFF;
    display: flex;
    align-items: center;
    padding: 0 70px;
    font-family: 'Futura Md BT';
font-style: normal;
font-weight: 400;
font-size: 29.532px;
line-height: 35px;

color: #FEFEFE;
`
);
const LandingTitle = styled(Typography)(
  ({ theme }) => `
  font-family: 'Anton', sans-serif;
  font-style: normal;
  font-weight: 700;
  font-size: ${theme.typography.pxToRem(45)};
  line-height: ${theme.typography.pxToRem(100)};
  color: #000000;
  letter-spacing: 12px;
  margin-bottom: 30px;
`
);

const MenuTitle = styled(Typography)(
  ({ theme }) => ` 
font-style: normal;
font-weight: 600;
font-size: ${theme.typography.pxToRem(28)}; 
color: #FFFFFF;
`
);
const StyledFooter = styled("footer")(
  () => `
    min-height: 750px;
    display: flex;
    align-items: center;
    justify-content: end; 
    flex-direction: column;
`
);
const StyledButton = styled(Button)(
  () => `
    border: 1px solid #223EB1;
    font-family: 'Futura BdCn BT';
    font-style: normal;
    font-weight: 400;
    font-size: 36px;
    color: #223EB1;
    border-radius: 46px;
    padding: 18px 47px;
    width: 50%;
  
    &:hover {
      border: 1px solid #000;
    }

`
);
const StyledDiscription = styled(Typography)(
  ({ theme }) => ` 
  font-style: normal;
  font-weight: 600;
  color: #000000; 
  letter-spacing: 3px;
  font-size:  ${theme.typography.pxToRem(21)};
`
);
const StyledMenuItem = styled(MenuItem)(
  ({ theme }) => ` 
  font-style: normal;
  font-weight: 600;  
      letter-spacing: 3px; 
`
);
const StyledDiscriptionFooter = styled(Typography)(
  ({ theme }) => ` 
font-style: normal!important; 
line-height: 35px!important;
    font-weight: 600!important;
    font-size:  ${theme.typography.pxToRem(18)};
color: #FEFEFE!important;
`
);
const styles = {
  paperContainer: {
    minHeight: 787,
    backgroundImage: `url(${"static/image/ShapeCover2.png"})`,
    backgroundRepeat: "no-repeat",
    backgroundSize: "cover",
    backgroundPosition: "center",
  },
};

const LandingPage = () => {
  const navigate = useNavigate();

  return (
    <>
      <Page sx={{ background: "#FFF", zIndex: 2 }}>
        <Container
          sx={{
            position: "relative",
            padding: "0!important",
            overflowX: "hidden",
            background: "url(static/image/cover215.png)",
            backgroundRepeat: "no-repeat",
            backgroundSize: "cover",
            backgroundPosition: "center center",
            height: "140vh",
          }}
          maxWidth="xl"
        >
          <Box
            sx={{
              padding: "0 24px",
              display: "flex",
              justifyContent: "space-between",
              flexDirection: "row-reverse",
            }}
          >
            <Box
              component={"img"}
              src={"static/image/Stethoscope.png"}
              alt={"background"}
              sx={{
                maxWidth: "600px",
                width: "100%",
                height: "auto",
                right: 0,
                zIndex: 99,
              }}
            />
            <Box zIndex={2}>
              <LandingTitle gutterBottom>
                We Provide the best
                <br />
                <span style={{ color: "rgba(28, 183, 236, 1)" }}>
                  wound care
                </span>
                <br /> for your health
              </LandingTitle>
              <Box
                sx={{ display: "flex", flexDirection: "column", gap: "30px" }}
              >
                <StyledDiscription gutterBottom>
                  lorem ipsum is simply dummy text of the printing and
                  typesetting
                  <br /> industry. Lorem ipsem has been the industry’s standard
                  dummy text
                  <br /> ever since the 1500s.
                </StyledDiscription>
                <StyledButton
                  variant={"outlined"}
                  onClick={() => navigate("/product")}
                >
                  view all products
                </StyledButton>
              </Box>
            </Box>
          </Box>
        </Container>
        <StyledFooter style={styles.paperContainer}>
          <Stack
            sx={{
              display: "flex",
              justifyContent: "space-around",
              width: "100%",
            }}
            direction="row"
          >
            <Box
              sx={{
                width: "20%",
              }}
            >
              <LandingLogo />
              <Grid item md={20} lg={60}>
                <StyledDiscriptionFooter gutterBottom variant="h5">
                  Lorem ipsum dolor sit amet, consectetur adipiscing elit.
                  Pellentesque pulvinar neque in justo finibus, vel mollis dui
                  sodales.
                </StyledDiscriptionFooter>
              </Grid>
            </Box>

            {Menu_Item.map(item => (
              <MenuList key={item.title}>
                <MenuTitle sx={{ my: 2, display: "block" }} textAlign="center">
                  {item.title}
                </MenuTitle>
                {item.features?.map(description => (
                  <MenuList key={description.icon}>
                    {description.icon === "Language" ? (
                      <RHSelectDropDown label={"Language"} />
                    ) : (
                      <>
                        {description.descriptions?.map(p => (
                          <StyledMenuItem
                            key={p}
                            sx={{ my: 2, color: "#fff", display: "block" }}
                          >
                            {p}
                          </StyledMenuItem>
                        ))}
                      </>
                    )}
                  </MenuList>
                ))}
              </MenuList>
            ))}
          </Stack>
          <StyledLinkFooter>
            ©MedSolution 2022. All Rights reserved.
          </StyledLinkFooter>
        </StyledFooter>
      </Page>
    </>
  );
};

export default LandingPage;
