import PropTypes from "prop-types";
import { Link as RouterLink } from "react-router-dom";
import { Box } from "@mui/material";

LandingLogo.propTypes = {
  disabledLink: PropTypes.bool,
  sx: PropTypes.object,
};

export default function LandingLogo({ disabledLink = false }) {
  const logo = (
    <Box
      component="img"
      src="/static/image/LandingLogo.png
      "
      sx={{ width: 235, height: 45 }}
    />
  );

  if (disabledLink) {
    return <>{logo}</>;
  }

  return <RouterLink to="/">{logo}</RouterLink>;
}
