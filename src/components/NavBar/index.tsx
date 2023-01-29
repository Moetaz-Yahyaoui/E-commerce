import * as React from "react";
import { useCallback } from "react";
import AppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import IconButton from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";
import Menu from "@mui/material/Menu";
import MenuIcon from "@mui/icons-material/Menu";
import MenuItem from "@mui/material/MenuItem";
import SearchIcon from "@mui/icons-material/Search";
import Logo from "../Logo";
import { NavLink } from "react-router-dom";
import KeyIcon from "@mui/icons-material/Key";
import {
  Button,
  Box,
  Avatar,
  styled,
  useTheme,
  alpha,
  Badge,
  Divider,
  lighten,
  Popover,
  TextField,
  List,
  ListItem,
  ListItemText,
  Autocomplete,
} from "@mui/material";
import DeleteForeverIcon from "@mui/icons-material/DeleteForever";
import LockOpenTwoToneIcon from "@mui/icons-material/LockOpenTwoTone";
import PersonOutlineIcon from "@mui/icons-material/PersonOutline";
import ShoppingCartOutlinedIcon from "@mui/icons-material/ShoppingCartOutlined";
import MedSolutionsLogo from "~/assets/images/MedSolutions.png";
import { useNavigate } from "react-router-dom";
import { ShopContext } from "~/contexts/ShopContext";
import { AuthContext } from "~/contexts/authContext";
import { GetAllProduct as getAllProducts } from "~/repositories/productPricing";
import {
  deleteCustomerCartProduct,
  UpdateCustomerCart,
} from "~/repositories/customerOrder.service";
// import { logout } from "~/repositories/auth.service";
import LoginIcon from "@mui/icons-material/Login";

const pages = ["Products", "Orders", "About us", "Cart"];

const StyledAutocomplete = styled(Autocomplete)(
  () => `
  border-color: #000 !important;
  fieldset{
    border-color: #000 !important;
    border: 1px solid #000;
    border-radius: 25px;
  }
  & .MuiOutlinedInput-root {
    padding-right: 13px !important;
}
`
);

const MenuUserBox = styled(Box)(
  ({ theme }) => `
        background: ${theme.colors.alpha.black[5]};
        padding: ${theme.spacing(2)};
`
);

const UserBoxText = styled(Box)(
  ({ theme }) => `
        text-align: left;
        padding-left: ${theme.spacing(1)};
`
);

const UserBoxLabel = styled(Typography)(
  ({ theme }) => `
        font-weight: ${theme.typography.fontWeightBold};
        color: ${theme.palette.secondary.main};
        display: block;
`
);

const UserBoxDescription = styled(Typography)(
  ({ theme }) => `
        color: ${lighten(theme.palette.secondary.main, 0.5)}
`
);

const StyledButton = styled(Button)(
  () => ` 
    font-style: normal;
    font-weight: 500;
    font-size: 20px;
    line-height: 45px; 
    color: #000000;  
`
);

const ProductContainer = styled(Box)(
  ({ theme }) => ` 
display: flex;
flex-direction: column;
gap: 10px;
overflow: auto;
max-height: 400px;
`
);

const QuantityInput = styled(TextField)(
  ({ theme }) => ` 
  width: 80px;
  input {
    height: 4px !important;
  }
  fieldset {
    border: 1px solid #000 !important;
    borderRadius: 10px !important;
  }

`
);
const StyledListItemText = styled(ListItemText)(
  ({ theme }) => ` 
 span {
      font-size: 18px!important;
    font-weight: 700!important;
 }

`
);

const StyledNavBar = styled(AppBar)(
  ({ theme }) => ` 
  height: ${theme.header.height};
  color: ${theme.header.textColor};
  padding: 0;
 
  right: 0;
  z-index: 6;
  background-color: ${alpha(theme.header.background, 0.95)};
  backdrop-filter: blur(3px);
  position: fixed;
  justify-content: space-between;
  width: 100%;
  boxShadow: "0px 6px 11px rgb(0 0 0 / 25%)",
`
);
const NavBar: React.FC = () => {
  const theme = useTheme();
  const [anchorElNav, setAnchorElNav] = React.useState<null | HTMLElement>(
    null
  );

  const [isOpen, setOpen] = React.useState<boolean>(false);
  const [isCartOpen, setIsCartOpen] = React.useState<boolean>(false);
  const [product, setProduct] = React.useState<Array<any>>([]);
  const { user, logout } = React.useContext(AuthContext);
  const ref = React.useRef<any>(null);
  const CartRef = React.useRef<any>(null);
  const GetAllProducts = React.useRef(getAllProducts);
  const navigate = useNavigate();

  const { onChangeData, products } = React.useContext(ShopContext);

  const handleOpenNavMenu = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorElNav(event.currentTarget);
  };

  const handleOpen = (): void => {
    setOpen(true);
  };

  const handleClose = useCallback((): void => {
    setOpen(false);
  }, []);

  const handleOpenCart = (): void => {
    setIsCartOpen(true);
  };

  const handleCloseCart = (): void => {
    setIsCartOpen(false);
  };

  const handleCloseNavMenu = (page: string) => {
    if (page === "Home") {
      navigate("/home");
    } else if (page === "Products") {
      navigate("/product");
    } else if (page === "Orders") {
      navigate("/order");
    } else if (page === "About us") {
      navigate("/about-us");
    } else if (page === "Cart") {
      EditItem();
    }

    setAnchorElNav(null);
  };

  const changePage = React.useCallback((): void => {
    navigate(`/product`);
  }, [navigate]);

  const EditItem = React.useCallback((): void => {
    navigate(`/Checkout`);
    handleCloseCart();
  }, [navigate]);

  const HandleClick = useCallback(async () => {
    handleClose();
    onChangeData([]);
    logout();
    // await deleteAllCustomerCartProduct();
  }, [logout, onChangeData, handleClose]);

  React.useEffect(() => {
    if (!user) navigate("/");
  }, [navigate, user]);

  const handleQuantity = React.useCallback(
    (id: any, quantity: number) => {
      const listProduct = products && [...products];
      listProduct?.map(async (p) => {
        if (p.productid === id) {
          p.quantity = quantity > 0 ? quantity : 1;
          await UpdateCustomerCart({
            productid: p.productid,
            qty: quantity > 0 ? quantity : 1,
          });
          return p;
        } else return p;
      });
      onChangeData(listProduct);
    },
    [products]
  );

  const handleRemove = React.useCallback(
    async (Item: any) => {
      const filtred = products?.filter(
        (element: any) => element.productid !== Item.productid
      );
      await deleteCustomerCartProduct({
        productid: Item.productid,
        qty: 1,
      });
      onChangeData(filtred);
    },
    [products]
  );

  const getAllProduct = useCallback(async () => {
    // setFilteredProduct([]);
    await GetAllProducts.current(user?.customerid).then(
      (data) => {
        setProduct(data.data);
        // setFilteredProduct(data.data);
      },
      (error) => {
        console.log(error);
      }
    );
  }, [user?.customerid]);

  React.useEffect(() => {
    getAllProduct();
  }, [getAllProduct]);

  const handleSelectProduct = (id: number, skuId: number) => {
    navigate(`/product/product-details/${id}?skuId=${skuId}`);
  };
  const defaultProps = React.useMemo(() => {
    return {
      options: product,
      getOptionLabel: (option: any) =>
        option.mainname + " " + option.productdetails[0].category,
    };
  }, [product]);

  return (
    <StyledNavBar position="static">
      <Toolbar
        sx={{
          display: "flex",
          justifyContent: "space-between",
          padding: "14px !important",
          px: "27px !important",
          [theme.breakpoints.up("md")]: {
            px: "10px !important",
          },
          [theme.breakpoints.up("lg")]: {
            px: "27px !important",
          },
        }}
        disableGutters
      >
        <Logo />

        {user && (
          <Box
            sx={{
              display: {
                xs: "none",
                md: "flex",
                justifyContent: "space-between",
                width: "100%",
                height: "100%",
              },
            }}
          >
            <Box
              sx={{
                display: {
                  xs: "none",
                  md: "flex",
                  justifyContent: "start",
                  width: "100%",
                },
              }}
            >
              {/* <StyledButton
                onClick={() => {
                  navigate("/");
                }}
                sx={{ fontSize: "16px", fontWeight: "400", color: "black" }}
              >
                HOME
              </StyledButton> */}
              <StyledButton
                onClick={changePage}
                sx={{ fontSize: "16px", fontWeight: "400", color: "black" }}
              >
                PRODUCTS
              </StyledButton>
              <StyledButton
                onClick={() => {
                  navigate("/order");
                }}
                sx={{ fontSize: "16px", fontWeight: "400", color: "black" }}
              >
                ORDERS
              </StyledButton>
              <StyledButton
                onClick={() => {
                  navigate("/about-us");
                }}
                sx={{ fontSize: "16px", fontWeight: "400", color: "black" }}
              >
                ABOUT US
              </StyledButton>
            </Box>
            {Boolean(product.length > 0) && (
              <Box
                sx={{
                  display: "flex",
                  alignItems: "center",
                  width: "35%",
                }}
              >
                <StyledAutocomplete
                  {...defaultProps}
                  onChange={(event: any, newValue: any) => {
                    handleSelectProduct(newValue.sku, newValue.skuid);
                  }}
                  id="controllable-states-demo"
                  sx={{
                    width: "100%",
                    background: "#fff",
                    height: "45px",
                    display: "flex",
                    alignItems: "center",
                  }}
                  popupIcon={<SearchIcon />}
                  isOptionEqualToValue={(option: any, value: any) =>
                    option.id === value.id
                  }
                  renderInput={(params) => (
                    <TextField
                      {...params}
                      size="small"
                      label="Search Product"
                    />
                  )}
                />
              </Box>
            )}
            <Box
              sx={{ display: { xs: "none", md: "flex", alignItems: "center" } }}
            >
              <StyledButton color="secondary" ref={ref} onClick={handleOpen}>
                <PersonOutlineIcon fontSize="large" />
              </StyledButton>
              <StyledButton
                // onClick={EditItem}
                sx={{ my: 2, color: "black", display: "block" }}
                ref={CartRef}
                onClick={handleOpenCart}
              >
                <Badge
                  showZero
                  badgeContent={products?.length}
                  color="error"
                  max={99}
                >
                  <ShoppingCartOutlinedIcon fontSize="medium" />
                </Badge>
              </StyledButton>
            </Box>
          </Box>
        )}
        {!user && (
          <Box display="flex" alignItems="center" gap="5px">
            <Typography
              sx={{
                cursor: "pointer",
                ":hover": {
                  textDecoration: "underline !important",
                },
              }}
              onClick={() => navigate("/login")}
            >
              Login
            </Typography>
            <LoginIcon />
          </Box>
        )}
        {user && (
          <Box
            sx={{
              flexGrow: 0,
              display: { xs: "flex", md: "none" },
            }}
          >
            <IconButton
              size="large"
              aria-label="account of current user"
              aria-controls="menu-appbar"
              aria-haspopup="true"
              onClick={handleOpenNavMenu}
              color="inherit"
            >
              <MenuIcon />
            </IconButton>
            <Menu
              id="menu-appbar"
              anchorEl={anchorElNav}
              anchorOrigin={{
                vertical: "bottom",
                horizontal: "left",
              }}
              keepMounted
              transformOrigin={{
                vertical: "top",
                horizontal: "left",
              }}
              open={Boolean(anchorElNav)}
              onClose={handleCloseNavMenu}
              sx={{
                display: { xs: "block", md: "none" },
              }}
            >
              {pages.map((page, index) => (
                <MenuItem key={index} onClick={() => handleCloseNavMenu(page)}>
                  <Typography
                    sx={{ margin: 0, color: "black", display: "block" }}
                    textAlign="center"
                  >
                    {page}
                  </Typography>
                </MenuItem>
              ))}
            </Menu>
          </Box>
        )}
      </Toolbar>

      <Popover
        anchorEl={CartRef.current}
        onClose={handleCloseCart}
        open={isCartOpen}
        anchorOrigin={{
          vertical: "top",
          horizontal: "right",
        }}
        transformOrigin={{
          vertical: "top",
          horizontal: "right",
        }}
      >
        {products?.length > 0 && (
          <>
            <Box sx={{ m: 1 }}>
              <Typography
                p={1}
              >{`${products?.length} Items in Cart`}</Typography>
            </Box>
            <Divider />
          </>
        )}

        <ProductContainer>
          {products?.length > 0 ? (
            products?.map((product: any, index: number) => (
              <Box
                key={index}
                sx={{
                  display: "flex",
                  alignItems: "center",
                  width: "530px",
                  gap: "20px",
                  p: "20px",
                  borderBottom: "1px solid #000",
                }}
              >
                <Box
                  component="img"
                  src={
                    product.productimgurl ||
                    "/static/image/Pas-dimage-disponible.jpg"
                  }
                  sx={{
                    width: "50px",
                    height: "50px",
                  }}
                />
                <Box
                  sx={{
                    display: "flex",
                    // flexDirection: "column",
                    alignItems: "center",
                    width: "100%",
                    gap: "20px",
                  }}
                >
                  <Typography
                    onClick={() => {
                      navigate(
                        `/product/product-details/${product.sku}?skuId=${product.skuid}`
                      );
                      handleCloseCart();
                    }}
                    sx={{ cursor: "pointer" }}
                  >
                    {product.productname}
                  </Typography>
                  <Typography>${product?.customerprice}</Typography>
                  <Box
                    sx={{
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "space-between",
                      gap: "20px",
                    }}
                  >
                    <Box
                      sx={{
                        display: "flex",
                        alignItems: "center",
                        gap: "20px",
                      }}
                    >
                      <Typography>Qty:</Typography>
                      <QuantityInput
                        fullWidth
                        type="number"
                        InputProps={{ inputProps: { min: 1 } }}
                        onChange={(e) =>
                          handleQuantity(
                            product.productid,
                            parseInt(e.target.value)
                          )
                        }
                        value={product.quantity}
                      />
                    </Box>
                    <DeleteForeverIcon
                      onClick={() => handleRemove(product)}
                      sx={{ cursor: "pointer" }}
                    />
                  </Box>
                </Box>
              </Box>
            ))
          ) : (
            <Typography p={2}>No Elements In The Cart</Typography>
          )}
        </ProductContainer>
        <Divider />
        <Box sx={{ m: 1 }}>
          <Button
            disabled={products?.length === 0}
            onClick={EditItem}
            color="primary"
            fullWidth
          >
            View and Edit Cart
          </Button>
        </Box>
      </Popover>
      <Popover
        anchorEl={ref.current}
        onClose={handleClose}
        open={isOpen}
        anchorOrigin={{
          vertical: "top",
          horizontal: "right",
        }}
        transformOrigin={{
          vertical: "top",
          horizontal: "right",
        }}
      >
        <MenuUserBox sx={{ minWidth: 210 }} display="flex">
          <Avatar variant="rounded" alt={user?.firstname} src={user?.avatar} />
          <UserBoxText>
            <UserBoxLabel variant="body1">{user?.firstname}</UserBoxLabel>
            <UserBoxDescription variant="body2">
              {user?.usertype}
            </UserBoxDescription>
          </UserBoxText>
        </MenuUserBox>
        <Divider sx={{ mb: 0 }} />
        <List sx={{ p: 1 }} component="nav">
          <ListItem button to="/change-password" component={NavLink}>
            <KeyIcon fontSize="small" />
            <StyledListItemText primary="Change Password" />
          </ListItem>
        </List>
        <Divider sx={{ mb: 0 }} />
        <Box sx={{ m: 1 }}>
          <Button onClick={HandleClick} color="primary" fullWidth>
            <LockOpenTwoToneIcon sx={{ mr: 1 }} />
            Sign out
          </Button>
        </Box>
      </Popover>
    </StyledNavBar>
  );
};
export default NavBar;
