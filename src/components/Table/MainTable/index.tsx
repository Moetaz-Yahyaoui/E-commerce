import {
  FC,
  ChangeEvent,
  useState,
  useMemo,
  ReactNode,
  useCallback,
} from "react";
import PropTypes from "prop-types";
import {
  Tooltip,
  Divider,
  Box,
  Card,
  Checkbox,
  IconButton,
  Table,
  TableBody,
  TableCell as StyledTableCell,
  TableHead,
  TablePagination,
  TableRow,
  TableContainer,
  Typography,
  useTheme,
  styled,
} from "@mui/material";
import DeleteForeverIcon from "@mui/icons-material/DeleteForever";
import { tableCellClasses } from "@mui/material/TableCell";

import Label from "@components/Label";
import { ServiceStatus } from "~/types/patienTable";
import { IMainTable } from "~/types";
import EditTwoToneIcon from "@mui/icons-material/EditTwoTone";
import DeleteTwoToneIcon from "@mui/icons-material/DeleteTwoTone";
import BulkActions from "./BulkActions";
import { useNavigate } from "react-router-dom";
import Modal from "@components/Modal/BasicModal";
import FileDownloadIcon from "@mui/icons-material/FileDownload";
import CheckIcon from "@mui/icons-material/Check";
interface IPagination {
  page: number;
  limit: number;
}

const IconCustomButton = ({
  onClick,
  children,
}: {
  onClick?: () => void;
  children: ReactNode;
}) => (
  <IconButton color="primary" onClick={onClick} sx={{ color: "red!important" }}>
    {children}
  </IconButton>
);

IconCustomButton.displayName = "IconCustomButton";

interface RecentOrdersTableProps {
  className?: string;
  itemlist: IMainTable[];
  onDeleteItem: (id: number) => Promise<void>;
  pagination: IPagination;
  handleLimitChange: (event: ChangeEvent<HTMLInputElement>) => void;
  handlePageChange: (event: any, newPage: number) => void;
  tableRowColumns: Array<string>;
  sharedData: Record<string, any>;
  totalRows: number;
  EditItem: (id: any, item: Record<string, any>) => void;
  noHeader?: boolean;
  noStatus?: boolean;
  onhandleForm?: (id: any, item: Record<string, any>) => void;
  noAdd?: boolean;
  noDelete?: boolean;
  isDownload?: boolean;
  downloadService?: (id: number, fileName: string) => Promise<void>;
}

interface Filters {
  status?: ServiceStatus | null;
  query?: string | undefined;
}

const getStatusLabel = (ServiceStatus: ServiceStatus): JSX.Element => {
  const map = {
    failed: {
      text: "Failed",
      color: "error",
    },
    completed: {
      text: "Completed",
      color: "success",
    },
    pending: {
      text: "Pending",
      color: "warning",
    },
  };

  const { text, color }: any = map[ServiceStatus];

  return <Label color={color}>{text}</Label>;
};

const applyFilters = (
  itemlist: IMainTable[],
  filters: Filters
): IMainTable[] => {
  return itemlist.filter(item => {
    let matches = true;
    const { status, query } = filters;

    if (
      status &&
      //item.status !== filters.status
      true
    ) {
      matches = false;
    }
    if (query) {
      matches = Object.keys(item).some(key => {
        return (
          item[key] &&
          item[key].toString().toLowerCase().indexOf(query.toLowerCase()) > -1
        );
      });
    }

    return matches;
  });
};

const applyPagination = (
  itemlist: IMainTable[],
  page: number,
  limit: number
): IMainTable[] => {
  // return itemlist.slice(page * limit, page * limit + limit);
  return itemlist;
};

const RecentOrdersTable: FC<RecentOrdersTableProps> = ({
  itemlist,
  onDeleteItem,
  pagination,
  handleLimitChange,
  handlePageChange,
  tableRowColumns,
  sharedData,
  totalRows,
  EditItem,
  noHeader,
  onhandleForm,
  noStatus,
  noAdd,
  noDelete,
  isDownload,
  downloadService,
}) => {
  const [selectedItems, setItems] = useState<number[]>([]);
  const [open, setOpen] = useState<boolean>(false);
  const [selectedID, setSelectedID] = useState<number>();
  const [selectedCustomer, setSelectedCustomer] = useState<string>();

  const [filters, setFilters] = useState<Filters>({
    status: null,
    query: "",
  });

  const handleSelectAllItems = (event: ChangeEvent<HTMLInputElement>): void => {
    setItems(
      (event.target.checked ? itemlist.map(item => item.id) : []) as number[]
    );
  };

  const onHandleSearch = (event: ChangeEvent<HTMLInputElement>): void => {
    setFilters(filters => ({ ...filters, query: event.target.value }));
  };

  const handleSelectOneItem = (
    event: ChangeEvent<HTMLInputElement>,
    ItemId: any
  ): void => {
    if (!selectedItems.includes(ItemId)) {
      setItems(prevSelected => [...prevSelected, ItemId]);
    } else {
      setItems(prevSelected => prevSelected.filter(id => id !== ItemId));
    }
  };

  const filteredItems = useMemo(
    () => applyFilters(itemlist, filters),
    [applyFilters, filters, itemlist]
  );
  const paginatedItems = applyPagination(
    filteredItems,
    pagination.page,
    pagination.limit
  );

  const selectedSomeItems = useMemo(
    () => selectedItems.length > 0 && selectedItems.length < itemlist.length,
    [itemlist, selectedItems]
  );

  const selectedAllItems = useMemo(
    () => selectedItems.length === itemlist.length,
    [selectedItems, itemlist]
  );

  const theme = useTheme();

  const navigate = useNavigate();

  const handleClickOpen = useCallback(
    (id: any, item: any) => {
      const selectedElement = item
        ? item[tableRowColumns[0]]
        : "all selected elements";
      setSelectedCustomer(selectedElement);
      setSelectedID(id);
      setOpen(true);
    },
    [tableRowColumns]
  );

  const handleAction = useCallback(async () => {
    await onDeleteItem(selectedID as number);
    setOpen(false);
  }, [selectedID]);

  const handleClose = useCallback(() => {
    setOpen(false);
  }, []);

  const AddItemAction = useCallback((): void => {
    onhandleForm ? onhandleForm("", {}) : navigate(sharedData.addRoute);
  }, [navigate]);

  return (
    <CardStyled>
      <Modal
        open={open}
        handleClose={handleClose}
        handleAction={handleAction}
        title={"Delete Item"}
        contentText={`Are you sure you want to remove ${selectedCustomer}`}
      />
      {!Boolean(noHeader) && (
        <Box p={1}>
          <BulkActions
            noAdd={noAdd}
            AddItemAction={AddItemAction}
            onHandleSearch={onHandleSearch}
            title={sharedData.title}
            selectedItems={selectedItems}
            handleClickOpen={handleClickOpen}
          />
        </Box>
      )}
      <Divider />
      <TableContainer sx={{ flex: 1 }}>
        <Table stickyHeader aria-label="sticky table">
          <TableHead>
            <TableRow>
              <TableCell padding="checkbox">
                <Box display="flex" alignItems="center">
                  <Checkbox
                    color="primary"
                    checked={selectedAllItems}
                    indeterminate={selectedSomeItems}
                    onChange={handleSelectAllItems}
                  />
                  {Boolean(selectedItems?.length > 0) && (
                    <IconCustomButton
                      onClick={() => handleClickOpen(selectedItems, null)}
                    >
                      <DeleteForeverIcon />
                    </IconCustomButton>
                  )}
                </Box>
              </TableCell>
              {tableRowColumns.map((value, index) => {
                console.log("index", index, value);
                return (
                  <TableCell key={index}>
                    {index === 6 ? "Payment Term" : value}
                  </TableCell>
                );
              })}
              <TableCell align="center">Actions</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {paginatedItems.map((item, index) => {
              const isItemSelected = selectedItems.includes(item.id as number);
              return (
                <TableRow hover key={index} selected={isItemSelected}>
                  <TableCell
                    padding="checkbox"
                    onClick={event =>
                      event.detail === 2 && EditItem(item.id, item)
                    }
                  >
                    <Checkbox
                      color="primary"
                      checked={isItemSelected}
                      onChange={(event: ChangeEvent<HTMLInputElement>) =>
                        handleSelectOneItem(event, item["id"])
                      }
                      value={isItemSelected}
                    />
                  </TableCell>
                  {tableRowColumns.map((key, index) => {
                    return (
                      <TableCell
                        key={index}
                        onClick={event =>
                          event.detail === 2 && EditItem(item["id"], item)
                        }
                      >
                        <Typography
                          variant="body1"
                          color="text.primary"
                          gutterBottom
                          noWrap
                        >
                          {
                            (typeof item[key] === "boolean" ? (
                              item[key] ? (
                                <CheckIcon sx={{ color: "rgb(121 220 159)" }} />
                              ) : (
                                ""
                              )
                            ) : (
                              item[key]
                            )) as ReactNode
                          }
                        </Typography>
                      </TableCell>
                    );
                  })}
                  <TableCell align="center">
                    <Box
                      display={"flex"}
                      justifyContent={!noDelete ? "center" : "space-between"}
                      alignItems={"center"}
                    >
                      {isDownload && downloadService && item?.invoicefilename && (
                        <Tooltip
                          onClick={() =>
                            downloadService(
                              item.id as number,
                              item.invoicefilename as string
                            )
                          }
                          title="Download"
                          arrow
                        >
                          <IconButton color="primary" size="small">
                            <FileDownloadIcon fontSize="small" />
                          </IconButton>
                        </Tooltip>
                      )}
                      <Tooltip title="Edit" arrow>
                        <IconButton
                          onClick={() =>
                            onhandleForm
                              ? onhandleForm(item.id, item)
                              : EditItem(item.id, item)
                          }
                          sx={{
                            "&:hover": {
                              background: theme.colors.primary.lighter,
                            },
                            color: theme.palette.primary.main,
                          }}
                          color="inherit"
                          size="small"
                        >
                          <EditTwoToneIcon fontSize="small" />
                        </IconButton>
                      </Tooltip>
                      {!noDelete && (
                        <Tooltip
                          onClick={() => handleClickOpen(item.id, item)}
                          title="Delete"
                          arrow
                        >
                          <IconButton
                            sx={{
                              "&:hover": {
                                background: theme.colors.error.lighter,
                              },
                              color: theme.palette.error.main,
                            }}
                            color="inherit"
                            size="small"
                          >
                            <DeleteTwoToneIcon fontSize="small" />
                          </IconButton>
                        </Tooltip>
                      )}
                    </Box>
                  </TableCell>
                </TableRow>
              );
            })}
          </TableBody>
        </Table>
      </TableContainer>
      <Box>
        <TablePagination
          component="div"
          count={totalRows}
          onPageChange={handlePageChange}
          onRowsPerPageChange={handleLimitChange}
          page={pagination.page}
          rowsPerPage={pagination.limit}
          rowsPerPageOptions={[10, 50, 100, 500]}
          showFirstButton={true}
          showLastButton={true}
          labelDisplayedRows={({ page }) => {
            return `Page: ${page}`;
          }}
          backIconButtonProps={{
            color: "secondary",
          }}
        />
      </Box>
    </CardStyled>
  );
};

const CardStyled = styled(Card)(
  () => `
    && {
      height: 100%;
      display: flex;
      flex-direction: column;
      box-shadow: unset;
      border-radius:0;
    }
`
);

const TableCell = styled(StyledTableCell)(({ theme }) => ({
  [`&.${tableCellClasses.head}`]: {
    backgroundColor: "#1CB7EC",
    color: theme.palette.common.white,
    paddingTop: 0,
    paddingBottom: 0,
    ".MuiButtonBase-root": {
      color: theme.palette.common.white,
    },
  },
  [`&.${tableCellClasses.body}`]: {
    fontSize: theme.typography.pxToRem(12),
    paddingTop: 0,
    paddingBottom: 0,
  },
}));

RecentOrdersTable.propTypes = {
  itemlist: PropTypes.array.isRequired,
};

RecentOrdersTable.defaultProps = {
  itemlist: [],
};

export default RecentOrdersTable;
