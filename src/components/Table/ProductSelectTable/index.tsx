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
import { tableCellClasses } from "@mui/material/TableCell";

import { makeStyles } from "@mui/styles";

import { ServiceStatus } from "~/types/patienTable";
import { IMainTable } from "~/types";
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
  handleSelectProducts: (data: any, all?: boolean) => void;
  productsSelected: Array<any>;
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

const useStyles = makeStyles({
  customTableContainer: {
    overflowX: "initial",
  },
});

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
  handleSelectProducts,
  productsSelected,
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

  // const handleSelectAllItems = (event: ChangeEvent<HTMLInputElement>): void => {
  //   setItems(
  //     (event.target.checked ? itemlist.map(item => item.id) : []) as number[]
  //   );
  //   handleSelectProducts(itemlist.map(item => item, true));
  // };

  const onHandleSearch = (event: ChangeEvent<HTMLInputElement>): void => {
    setFilters(filters => ({ ...filters, query: event.target.value }));
  };

  const handleSelectOneItem = (
    event: ChangeEvent<HTMLInputElement>,
    ItemId: any,
    item: any
  ): void => {
    if (!selectedItems.includes(ItemId)) {
      setItems(prevSelected => [...prevSelected, ItemId]);
    } else {
      setItems(prevSelected => prevSelected.filter(id => id !== ItemId));
    }
    handleSelectProducts(item);
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

  useEffect(() => {
    if (selectedItems?.length === 0) setItems(productsSelected.map(p => p.id));
  }, [productsSelected]);

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
              <TableCell padding="checkbox">
                {/* <Checkbox
                  color="primary"
                  checked={selectedAllItems}
                  indeterminate={selectedSomeItems}
                  onChange={handleSelectAllItems}
                /> */}
              </TableCell>
              {tableRowColumns.map((value, index) => {
                return <TableCell key={index}>{value as ReactNode}</TableCell>;
              })}
            </TableRow>
          </TableHead>
          <TableBody>
            {paginatedItems.map((item, index) => {
              const isItemSelected = selectedItems.includes(item.id as number);
              return (
                <TableRow hover key={index} selected={isItemSelected}>
                  <TableCell
                    padding="checkbox"
                    onClick={() => EditItem(item.id, item)}
                  >
                    <Checkbox
                      color="primary"
                      checked={isItemSelected}
                      onChange={(event: ChangeEvent<HTMLInputElement>) =>
                        handleSelectOneItem(event, item["id"], item)
                      }
                      value={isItemSelected}
                    />
                  </TableCell>
                  {Object.keys(item)
                    .filter(key => {
                      return tableRowColumns.indexOf(key) > -1;
                    })
                    .map((key, index) => {
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
