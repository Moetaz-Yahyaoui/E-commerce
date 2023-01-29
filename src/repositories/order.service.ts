import axios from "axios";
import authHeader from "./auth-header";
import { API_URL } from "~/config/axios";

export const getAllOrders = ({ page, limit }: { page: any; limit: any }) => {
  return axios.post(
    API_URL + `/Order/search`,
    {
      pageSize: limit,
      pageNumber: page,
    },
    { headers: authHeader() }
  );
};

export const Delete = (id: number) => {
  return axios.delete(API_URL + `/Order/?id=${id}`, {
    headers: authHeader(),
  });
};

export const GetTableStructure = () => {
  return axios.get(API_URL + `/Order/DisplayFieldAliasOrderAll`, {
    headers: authHeader(),
  });
};

export const Create = (data: any) => {
  return axios.post(API_URL + "/Order/Create", data, {
    headers: authHeader(),
  });
};

export const Modify = (id: string, data: any) => {
  return axios.put(API_URL + `/Order/Update?orderid=${id}`, data, {
    headers: authHeader(),
  });
};
export const MakeOrderPayment = (data: any) => {
  return axios.put(API_URL + `/Order/MakeOrderPayment`, data, {
    headers: authHeader(),
  });
};
export const confirmOrder = (id: string) => {
  return axios.put(
    API_URL + `/Order/ConfirmOrder?id=${id}`,
    {},
    {
      headers: authHeader(),
    }
  );
};

export const UpdateOrderStatus = (data: any) => {
  return axios.put(API_URL + `/Order/UpdateOrderStatus`, data, {
    headers: authHeader(),
  });
};

export const Get = (id: string) => {
  return axios.get(API_URL + `/Order/${id}`, {
    headers: authHeader(),
  });
};

export const GetCustomerOrder = ({
  page,
  limit,
}: {
  page: number;
  limit: number;
}) => {
  return axios.post(
    API_URL + "/CustomerOrder/search",
    {
      pageSize: limit,
      pageNumber: page + 1,
    },
    { headers: authHeader() }
  );
};
export const Download = (id: number, filename: string) => {
  return axios.get(
    API_URL +
      `/OrderInvoice/DownloadOrderInvoice?_orderid=${id}&_filename=${filename}`,
    {
      responseType: "blob",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/pdf",
        ...authHeader(),
      },
    }
  );
};

export const GetOrderById = (id: string) => {
  return axios.get(API_URL + `/CustomerOrder/${id}`, {
    headers: authHeader(),
  });
};
