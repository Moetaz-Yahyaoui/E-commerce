/* eslint-disable react-hooks/rules-of-hooks */
import React, { FC, useCallback, useContext } from "react";
// material
import { Box, Grid } from "@mui/material";
import AddShoppingCartIcon from "@mui/icons-material/AddShoppingCart";
import { DataGrid, GridColDef, GridRenderCellParams } from "@mui/x-data-grid";
import { ShopContext } from "~/contexts/ShopContext";
import { useNavigate } from "react-router";

// ----------------------------------------------------------------------

interface ProductProps {
  allProducts: Array<any>;
  selectedProducts: Array<any>;
  onSelect: (item: any, quantity: number) => void;
}
const ProductGrid: FC<ProductProps> = ({
  allProducts,
  selectedProducts,
  onSelect,
  ...other
}) => {
  const navigate = useNavigate();

  const handleSelectOneItem = useCallback(
    (item: any): void => {
      navigate(`/product/product-details/${item.sku}`, {
        state: item,
      });
    },
    [navigate]
  );

  const columns: GridColDef[] = [
    {
      field: "mainname",
      headerName: "Product Name",
      width: 400,
      editable: true,
    },
    {
      field: "sku",
      headerName: "sku",
      width: 270,
      align: "center",
      headerAlign: "center",
      editable: true,
    },
    {
      field: "quantity",
      headerName: "Total Quantity",
      sortable: false,
      width: 300,
      align: "center",
      headerAlign: "center",
      renderCell: (params: GridRenderCellParams) => {
        const { products } = useContext(ShopContext);

        const productQuantity = React.useMemo(() => {
          const filtred = products?.filter(
            (item: any) => item.sku === params.row.sku
          );
          if (filtred?.length > 0) return filtred;
        }, [params.row.sku, products]);

        const handleSum = React.useMemo(() => {
          let total = 0;
          // eslint-disable-next-line array-callback-return
          productQuantity?.map((product: any) => {
            total = total + product.quantity;
          });
          if (total) {
            return total;
          } else {
            return 0;
          }
        }, [productQuantity]);

        return handleSum;
      },
    },
    {
      field: "XXX",
      headerName: "Selected",
      sortable: false,
      width: 300,
      align: "center",
      headerAlign: "center",
      renderCell: (params: GridRenderCellParams) => (
        <Box
          sx={{
            cursor: "pointer",
            background: selectedProducts?.includes(params.row.sku)
              ? "#dfd28b"
              : "#FFF",
            padding: "5px",
            display: "flex",
            borderRadius: "8px",
          }}
        >
          <Grid
            item
            xs={12}
            sm={6}
            md={3}
            onClick={() => handleSelectOneItem(params.row)}
          >
            <AddShoppingCartIcon />
          </Grid>
        </Box>
      ),
    },
  ];
  return (
    <Box
      sx={{
        minHeight: 400,
        maxHeight: 800,
        height: "100%",
        width: "100%",
        background: "#FFF",
      }}
    >
      <DataGrid
        rows={allProducts}
        getRowId={row => row.sku}
        columns={columns}
        rowsPerPageOptions={[10, 50, 100, 500]}
      />
    </Box>
  );
};
export default ProductGrid;
