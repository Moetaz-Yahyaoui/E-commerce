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
import { tableCellClasses } from "@mui/material/TableCell";

import { ServiceStatus } from "~/types/patienTable";
import { IMainTable } from "~/types";
import AddIcon from "@mui/icons-material/Add";
import BulkActions from "./BulkActions";
import { useNavigate } from "react-router-dom";
import Modal from "@components/Modal/BasicModal";

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
  noHeader?: boolean;
  onhandleForm?: (id: any, item: Record<string, any>) => void;
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
  sharedData,
  totalRows,
  EditItem,
  noHeader,
  onhandleForm,
}) => {
  const [selectedItems, setItems] = useState<number[]>([]);
  const [open, setOpen] = useState<boolean>(false);
  const [selectedID, setSelectedID] = useState<number>();
  const [selectedCustomer, setSelectedCustomer] = useState<string>();
  // const selectedBulkActions = useMemo(
  //   () => selectedItems.length > 0,
  //   [selectedItems]
  // );
  const [filters, setFilters] = useState<Filters>({
    status: null,
    query: "",
  });

  const onHandleSearch = (event: ChangeEvent<HTMLInputElement>): void => {
    setFilters(filters => ({ ...filters, query: event.target.value }));
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

  const theme = useTheme();

  const navigate = useNavigate();

  const handleAction = useCallback(async () => {
    await onDeleteItem(selectedID as number);
    setOpen(false);
  }, []);

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
            AddItemAction={AddItemAction}
            onHandleSearch={onHandleSearch}
            title={sharedData.title}
          />
        </Box>
      )}
      <Divider />
      <TableContainer sx={{ flex: 1 }}>
        <Table stickyHeader aria-label="sticky table">
          <TableHead>
            <TableRow>
              {tableRowColumns.map((value, index) => {
                return <TableCell key={index}>{value as ReactNode}</TableCell>;
              })}
              <TableCell align="center">Select</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {paginatedItems.map((item, index) => {
              const isItemSelected = selectedItems.includes(item.id as number);
              return (
                <TableRow hover key={index} selected={isItemSelected}>
                  {tableRowColumns.map((key, index) => {
                    return (
                      <TableCell
                        key={index}
                        onClick={() => EditItem(item["id"], item)}
                      >
                        <Typography
                          variant="body1"
                          color="text.primary"
                          gutterBottom
                          noWrap
                        >
                          {item[key] as ReactNode}
                        </Typography>
                      </TableCell>
                    );
                  })}
                  <TableCell align="center">
                    <Tooltip title="Select Cutomer" arrow>
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
                        <AddIcon fontSize="small" />
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
