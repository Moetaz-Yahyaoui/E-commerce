import {
  FC,
  ChangeEvent,
  useState,
  useMemo,
  ReactNode,
  useCallback,
  useEffect,
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
import EditTwoToneIcon from "@mui/icons-material/EditTwoTone";

import { tableCellClasses } from "@mui/material/TableCell";
import { ServiceStatus } from "~/types/patienTable";
import { IMainTable } from "~/types";
import Modal from "@components/Modal/BasicModal";
import DeleteTwoToneIcon from "@mui/icons-material/DeleteTwoTone";
import FileDownloadIcon from "@mui/icons-material/FileDownload";
interface IPagination {
  page: number;
  limit: number;
}

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
  onhandleForm?: (id: any, item: Record<string, any>) => void;
  query: string;
  downloadService?: (id: number) => Promise<void>;
  isDownlad?: boolean;
}

interface Filters {
  status?: ServiceStatus | null;
  query?: string | undefined;
}

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
  totalRows,
  EditItem,
  onhandleForm,
  query,
  downloadService,
  isDownlad,
}) => {
  const [selectedItems, setItems] = useState<number[]>([]);
  const [open, setOpen] = useState<boolean>(false);
  const [selectedID, setSelectedID] = useState<number>();
  const [selectedElements, setSelectedElements] = useState<string>();
  const [filters, setFilters] = useState<Filters>({
    status: null,
    query: "",
  });

  const handleSelectAllItems = (event: ChangeEvent<HTMLInputElement>): void => {
    setItems(
      (event.target.checked ? itemlist.map(item => item.id) : []) as number[]
    );
  };

  useEffect(() => {
    setFilters(filters => ({ ...filters, query: query }));
  }, [query]);

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

  const handleAction = useCallback(async () => {
    await onDeleteItem(selectedID as number);
    setOpen(false);
  }, [selectedID]);

  const handleClose = useCallback(() => {
    setOpen(false);
  }, []);

  const handleClickOpen = useCallback(
    (id: any, item: any) => {
      const selectedElement = item
        ? item[tableRowColumns[0]]
        : "all selected elements";
      setSelectedElements(selectedElement);
      setSelectedID(id);
      setOpen(true);
    },
    [tableRowColumns]
  );

  return (
    <CardStyled>
      <Modal
        open={open}
        handleClose={handleClose}
        handleAction={handleAction}
        title={"Delete Item"}
        contentText={`Are you sure you want to remove ${selectedElements}`}
      />
      <Divider />
      <TableContainer sx={{ flex: 1 }}>
        <Table stickyHeader aria-label="sticky table">
          <TableHead>
            <TableRow>
              <TableCell padding="checkbox">
                <Checkbox
                  color="primary"
                  checked={selectedAllItems}
                  indeterminate={selectedSomeItems}
                  onChange={handleSelectAllItems}
                />
              </TableCell>
              {tableRowColumns.map((value, index) => {
                return <TableCell key={index}>{value as ReactNode}</TableCell>;
              })}
              <TableCell align="right">Actions</TableCell>
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
                            (typeof item[key] === "boolean"
                              ? item[key]
                                ? key
                                : ""
                              : item[key]) as ReactNode
                          }
                        </Typography>
                      </TableCell>
                    );
                  })}

                  <TableCell align="right">
                    {isDownlad && downloadService && (
                      <Tooltip
                        onClick={() => downloadService(item.id as number)}
                        title="Download"
                        arrow
                      >
                        <IconButton color="primary" size="small">
                          <FileDownloadIcon fontSize="small" />
                        </IconButton>
                      </Tooltip>
                    )}
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
                    <Tooltip
                      onClick={() => handleClickOpen(item.id, item)}
                      title="Delete"
                      arrow
                    >
                      <IconButton
                        sx={{
                          "&:hover": { background: theme.colors.error.lighter },
                          color: theme.palette.error.main,
                        }}
                        color="inherit"
                        size="small"
                      >
                        <DeleteTwoToneIcon fontSize="small" />
                      </IconButton>
                    </Tooltip>
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
