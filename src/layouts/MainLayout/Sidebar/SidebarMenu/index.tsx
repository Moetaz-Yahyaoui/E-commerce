import { useContext } from "react";

import { Tooltip, Box, List, styled, Button, ListItem } from "@mui/material";
import { NavLink as RouterLink } from "react-router-dom";
import { SidebarContext } from "~/contexts/SidebarContext";

import PersonTwoToneIcon from "@mui/icons-material/PersonTwoTone";
import AttachMoneyTwoToneIcon from "@mui/icons-material/AttachMoneyTwoTone";
import ShoppingCartRoundedIcon from "@mui/icons-material/ShoppingCartRounded";
import DashboardIcon from "@mui/icons-material/Dashboard";

import MenuSetting from "@components/Menu";
import MenuOrders from "@components/Menu/MenuOrders";
import { useAuth } from "~/contexts/authContext";

function SidebarMenu() {
  const { user } = useAuth();

  const { closeSidebar } = useContext(SidebarContext);

  return (
    <>
      <MenuWrapper>
        <List
          component="div"
          // subheader={
          //   <ListSubheader component="div" disableSticky>
          //     Dashboards
          //   </ListSubheader>
          // }
        >
          <SubMenuWrapper>
            <List component="div">
              {user.userAccessPages.includes("1") && (
                <ListItem component="div">
                  <Tooltip placement="right" title="Home" arrow>
                    <Button
                      disableRipple
                      component={RouterLink}
                      onClick={closeSidebar}
                      to="/landingPage"
                      startIcon={<DashboardIcon />}
                    />
                  </Tooltip>
                </ListItem>
              )}
              {user.userAccessPages.includes("2") && (
                <ListItem component="div">
                  <Tooltip placement="right" title="Customers" arrow>
                    <Button
                      disableRipple
                      component={RouterLink}
                      onClick={closeSidebar}
                      to="/customers"
                      startIcon={<PersonTwoToneIcon />}
                    />
                  </Tooltip>
                </ListItem>
              )}
              {user.userAccessPages.includes("3") && (
                <ListItem component="div">
                  <Tooltip placement="right" title="Products" arrow>
                    <Button
                      disableRipple
                      component={RouterLink}
                      onClick={closeSidebar}
                      to="/products"
                      startIcon={<ShoppingCartRoundedIcon />}
                    />
                  </Tooltip>
                </ListItem>
              )}
              {/* <ListItem component="div">
                <Tooltip placement="right" title="Orders" arrow>
                  <Button
                    disableRipple
                    component={RouterLink}
                    onClick={closeSidebar}
                    to="/orders"
                    startIcon={<AutoStoriesTwoToneIcon />}
                  />
                </Tooltip>
              </ListItem> */}
              {user.userAccessPages.includes("4") && (
                <ListItem component="div">
                  <Tooltip placement="right" title="Orders" arrow>
                    <MenuOrders />
                  </Tooltip>
                </ListItem>
              )}
              <ListItem component="div">
                <Tooltip placement="right" title="Pricing" arrow>
                  <Button
                    disableRipple
                    component={RouterLink}
                    onClick={closeSidebar}
                    to="/pricings"
                    startIcon={<AttachMoneyTwoToneIcon />}
                  />
                </Tooltip>
              </ListItem>
              {user.userAccessPages.includes("5") && (
                <ListItem component="div">
                  <Tooltip placement="right" title="Settings" arrow>
                    <MenuSetting />
                  </Tooltip>
                </ListItem>
              )}
            </List>
          </SubMenuWrapper>
        </List>
      </MenuWrapper>
    </>
  );
}

const MenuWrapper = styled(Box)(
  ({ theme }) => `
  .MuiList-root {
    padding: ${theme.spacing(0)};

    & > .MuiList-root {
      padding: 0 ${theme.spacing(0)} ${theme.spacing(1)};
    }
  }
    .MuiListSubheader-root {
      text-transform: uppercase;
      font-weight: bold;
      font-size: ${theme.typography.pxToRem(12)};
      color: ${theme.colors.alpha.trueWhite[50]};
      padding: ${theme.spacing(0, 2.5)};
      line-height: 1.4;
    }
`
);

const SubMenuWrapper = styled(Box)(
  ({ theme }) => `
    .MuiList-root {

      .MuiListItem-root {
        padding: 1px 0;

        .MuiBadge-root {
          position: absolute;
          right: ${theme.spacing(3.2)};

          .MuiBadge-standard {
            background: ${theme.colors.primary.main};
            font-size: ${theme.typography.pxToRem(10)};
            font-weight: bold;
            text-transform: uppercase;
            color: ${theme.palette.primary.contrastText};
          }
        }
    
        .MuiButton-root {
          display: flex;
          color: #01061C;
          background-color: transparent;
          width: 100%;
          justify-content: center;
          padding: ${theme.spacing(0)};
          border-radius: ${theme.spacing(0)};
          padding: 14px 0;
          .MuiButton-startIcon,
          .MuiButton-endIcon {
            transition: ${theme.transitions.create(["color"])};
            .MuiSvgIcon-root {
              color: #1CB7EC;
              font-size: 24px;
              transition: none;
            }
          }

          .MuiButton-startIcon {
            color: #01061C;
            font-size: ${theme.typography.pxToRem(20)};
            margin: ${theme.spacing(0)};
          }
          
          .MuiButton-endIcon {
            color: #01061C;
            margin-left: auto;
            opacity: .8;
            font-size: ${theme.typography.pxToRem(20)};
          }

          &.active,
          &:hover {
            background-color: #1CB7EC;
            color: ${theme.colors.alpha.trueWhite[100]};

            .MuiButton-startIcon,
            .MuiButton-endIcon {
              transition: ${theme.transitions.create(["color"])};
              .MuiSvgIcon-root {
                color: ${theme.colors.alpha.trueWhite[100]};
                font-size: 26px;
                transition: none;
              }
            }
          }
        }

        &.Mui-children {
          flex-direction: column;

          .MuiBadge-root {
            position: absolute;
            right: ${theme.spacing(7)};
          }
        }

        .MuiCollapse-root {
          width: 100%;

          .MuiList-root {
            padding: ${theme.spacing(0)};
          }

          .MuiListItem-root {
            padding: 1px 0;

            .MuiButton-root {
              padding: ${theme.spacing(0.8, 3)};

              .MuiBadge-root {
                right: ${theme.spacing(3.2)};
              }

              &:before {
                content: ' ';
                background: ${theme.colors.alpha.trueWhite[100]};
                opacity: 0;
                transition: ${theme.transitions.create([
                  "transform",
                  "opacity",
                ])};
                width: 6px;
                height: 6px;
                transform: scale(0);
                transform-origin: center;
                border-radius: 20px;
                margin-right: ${theme.spacing(1.8)};
              }

              &.active,
              &:hover {

                &:before {
                  transform: scale(1);
                  opacity: 1;
                }
              }
            }
          }
        }
      }
    }
`
);

export default SidebarMenu;
