import Link, { LinkProps } from "@mui/material/Link";
import Typography from "@mui/material/Typography";
import Breadcrumbs from "@mui/material/Breadcrumbs";
import { Link as RouterLink, useLocation } from "react-router-dom";
import { useMemo } from "react";
import { Box } from "@mui/system";
import { Button } from "@mui/material";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";

function isNumeric(str: string) {
  if (typeof str != "string") return false;
  return !isNaN(str as unknown as number) && !isNaN(parseFloat(str));
}

const breadcrumbNameMap: { [key: string]: string } = {
  "/landingPage": "Home",
  "/customers": "Customers",
  "/customers/add-customer": "Add Customer",
  "/products": "Products",
  "/product-type": "Product Type",
  "/product-category": "Product Category",
  "/orders/add-order": "Add Order",
  "/pending-packaging": "Pending Packaging",
  "/pending-shipping": "Pending Shipping",
  "/pending-delivery": "Pending Delivery",
};

interface LinkRouterProps extends LinkProps {
  to: string;
  replace?: boolean;
}

const LinkRouter = (props: LinkRouterProps) => (
  <Link {...props} component={RouterLink as any} />
);
const excludeList = ["pending-shipping", "pending-delivery"];

const Breadcrumb = () => {
  const location = useLocation();
  const pathnames = location.pathname.split("/").filter(x => x);
  const searchParams = new URLSearchParams(location.search);
  const vriant: "h5" | "body2" = useMemo(() => {
    // eslint-disable-next-line eqeqeq
    return pathnames.length == 1 ? "h5" : "body2";
  }, [pathnames]);
  const handleBack = () => {
    window.history.go(-1);
  };
  return (
    <Breadcrumbs aria-label="breadcrumb">
      {pathnames.map((value, index) => {
        let name = null;
        let subpage = null;
        const last = index === pathnames.length - 1;
        if (searchParams.has("name")) name = searchParams.get("name");
        let to = `/${pathnames.slice(0, index + 1).join("/")}`;

        if (isNumeric(value) && pathnames[index - 1] === "orders") {
          to = `/${pathnames[index - 1]}/${value}${
            name ? `?name=${name}` : ""
          }`;
          subpage = `${pathnames[index - 1]} Details`;
        }

        // eslint-disable-next-line array-callback-return
        if (excludeList.includes(pathnames[index - 1])) return;

        return last ? (
          <Typography variant={vriant} color="text.secondary" key={to}>
            {name || breadcrumbNameMap[to] || value}
          </Typography>
        ) : (
          <Box display={"flex"} alignItems="center">
            {pathnames.length > 0 && index === 0 && (
              <Button onClick={handleBack} autoFocus>
                <ArrowBackIcon />
              </Button>
            )}
            <LinkRouter underline="hover" color="inherit" to={to} key={to}>
              <Typography variant="h5" color="text.secondary" key={to}>
                {subpage || breadcrumbNameMap[to] || value}
              </Typography>
            </LinkRouter>
          </Box>
        );
      })}
    </Breadcrumbs>
  );
};
export default Breadcrumb;
