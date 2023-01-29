import PropTypes from "prop-types";
import { Link as RouterLink, useNavigate } from "react-router-dom";
import { Box } from "@mui/material";
import MedSolutionsLogo from "~/assets/images/MedSolutions.png";

Logo.propTypes = {
  disabledLink: PropTypes.bool,
  sx: PropTypes.object,
};

export default function Logo({ disabledLink = false }) {
  const logo = <Box component="img" src={MedSolutionsLogo} />;
  const navigate = useNavigate();

  const handleChangePage = () => {
    navigate("/");
  };

  if (disabledLink) {
    return <>{logo}</>;
  }

  return (
    <RouterLink to="/product" onClick={handleChangePage}>
      {logo}
    </RouterLink>
  );
}
