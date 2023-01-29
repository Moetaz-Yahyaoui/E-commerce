import {
  useState,
  useRef,
  FC,
  useCallback,
  ReactNode,
  ChangeEvent,
} from "react";
import {
  Box,
  Menu,
  ListItemText,
  ListItem,
  List,
  Typography,
  TextField,
  IconButton,
} from "@mui/material";

import { AddCircleTwoTone, Search } from "@mui/icons-material";
import DeleteForeverIcon from "@mui/icons-material/DeleteForever";
import { ReactComponent as IconExcel } from "~/assets/icons/microsoft_excel.svg";

import { styled } from "@mui/material/styles";

const IconCustomButton = ({
  onClick,
  children,
}: {
  onClick?: () => void;
  children: ReactNode;
}) => (
  <IconButton color="primary" onClick={onClick} sx={{ ml: 1, p: 1 }}>
    {children}
  </IconButton>
);

IconCustomButton.displayName = "IconCustomButton";

interface IBulkActions {
  onHandleSearch: (event: ChangeEvent<HTMLInputElement>) => void;
  AddItemAction: () => void;
  title: string;
  selectedItems: number[];
  handleClickOpen: (id: any, item: any) => void;
  noAdd?: boolean;
}

const CustomTextField = styled(TextField)(
  () => `
    && {
      box-shadow: unset;
      border-radius:0;
      .MuiInputBase-root {
        border-radius: 0;
        input {
          padding: 7.5px 10px;
        }
      }
    }
`
);

const BulkActions: FC<IBulkActions> = ({
  onHandleSearch,
  AddItemAction,
  title,
  selectedItems,
  handleClickOpen,
  noAdd,
}) => {
  const [onMenuOpen, menuOpen] = useState<boolean>(false);

  const moreRef = useRef<HTMLButtonElement | null>(null);

  const openMenu = useCallback((): void => {
    console.log("openMenu");
  }, []);

  const closeMenu = (): void => {
    menuOpen(false);
  };

  return (
    <>
      <Box display="flex" alignItems="center" justifyContent="space-between">
        <Box display="flex" alignItems="center">
          <Typography variant="h5" color="text.secondary">
            {title}
          </Typography>
        </Box>
        <Box display="flex" alignItems="center">
          {/* {Boolean(selectedItems?.length > 0) && (
            <IconCustomButton
              onClick={() => handleClickOpen(selectedItems, null)}
            >
              <DeleteForeverIcon />
            </IconCustomButton>
          )} */}
          <CustomTextField
            placeholder="Search"
            onChange={onHandleSearch}
            InputProps={{
              endAdornment: (
                <IconCustomButton>
                  <Search />
                </IconCustomButton>
              ),
            }}
          />
          {!noAdd && (
            <IconCustomButton onClick={AddItemAction}>
              <AddCircleTwoTone />
            </IconCustomButton>
          )}
          <IconCustomButton onClick={openMenu}>
            <IconExcel
              style={{
                width: "24px",
                height: "24px",
                fill: "#5569ff",
              }}
            />
          </IconCustomButton>
        </Box>
      </Box>
      <Menu
        keepMounted
        anchorEl={moreRef.current}
        open={onMenuOpen}
        onClose={closeMenu}
        anchorOrigin={{
          vertical: "center",
          horizontal: "center",
        }}
        transformOrigin={{
          vertical: "center",
          horizontal: "center",
        }}
      >
        <List sx={{ p: 1 }} component="nav">
          <ListItem button>
            <ListItemText primary="Bulk delete selected" />
          </ListItem>
          <ListItem button>
            <ListItemText primary="Bulk edit selected" />
          </ListItem>
        </List>
      </Menu>
    </>
  );
};

export default BulkActions;
