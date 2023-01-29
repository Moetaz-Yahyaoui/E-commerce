// import * as React  from "react";
import React, { useCallback, useEffect, useMemo, useState } from "react";

import { DataGrid, GridColDef } from "@mui/x-data-grid";
import { Box } from "@mui/material";
import {
  GetCustomerOrder,
  GetTableStructure,
} from "~/repositories/order.service";
import { useNavigate } from "react-router";

interface IPagination {
  page: number;
  limit: number;
}

export default function DataTable() {
  const navigate = useNavigate();
  const [orders, setOrders] = React.useState<Array<any>>([]);
  const [totalRowsStructure, setTotalRowsStructure] = useState<Array<any>>([]);

  const GetAllCustomerOrderService = React.useRef(GetCustomerOrder);
  const GetTableStructureService = React.useRef(GetTableStructure);

  const getTableStructure = useCallback(async () => {
    await GetTableStructureService.current().then(
      (response: any) => {
        setTotalRowsStructure(response.data);
      },
      (error: any) => {
        console.log(error);
      }
    );
  }, [GetTableStructureService]);

  useEffect(() => {
    getTableStructure();
  }, [getTableStructure]);

  const getAllCustomerOrderService = React.useCallback(
    async (pagination: IPagination) => {
      await GetAllCustomerOrderService.current(pagination).then(
        (response: any) => {
          setOrders(response.data.data);
        },
        (error: any) => {
          console.log(error);
        }
      );
    },
    []
  );
  React.useEffect(() => {
    getAllCustomerOrderService({
      page: 0,
      limit: 50,
    });
  }, [getAllCustomerOrderService]);

  const dynamicColumns: GridColDef[] = useMemo(
    () =>
      totalRowsStructure?.map((item) => {
        return {
          field: item.fieldname,
          headerClassName: "super-app-theme--header",
          headerName: item.fieldalias,
          width: 130,
        };
      }),
    [totalRowsStructure]
  );

  return (
    <Box
      style={{
        height: "calc(100vh - 178px)",
        background: "#FFF",
        width: "100%",
      }}
      sx={{
        "& .super-app-theme--header": {},
      }}
    >
      <DataGrid
        rows={orders}
        columns={dynamicColumns}
        onRowDoubleClick={(params) => navigate(`/order/${params.row.id}`)}
        rowsPerPageOptions={[10, 50, 100, 500]}
        checkboxSelection
      />
    </Box>
  );
}
