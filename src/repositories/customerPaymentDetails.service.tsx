import axios from "axios";
import authHeader from "./auth-header";
import { API_URL } from "~/config/axios";

export const getAllCustomerPaymentDetails = ({
  page,
  limit,
}: {
  page: number;
  limit: number;
}) => {
  return axios.post(
    API_URL + "/CustomerPaymentDetails/search",
    {
      pageSize: limit,
      pageNumber: page,
    },
    { headers: authHeader() }
  );
};

export const getAllCustomerPaymentDetailsByID = ({ id }: { id: string }) => {
  return axios.post(
    API_URL + `/CustomerPaymentDetails/search?customerid=${id}`,
    {
      pageSize: 500,
      pageNumber: 1,
    },
    { headers: authHeader() }
  );
};

export const Create = (data: any) => {
  return axios.post(API_URL + "/CustomerPaymentDetails/create", data, {
    headers: authHeader(),
  });
};

export const Modify = (id: string, data: any) => {
  return axios.put(API_URL + `/CustomerPaymentDetails/update?id=${id}`, data, {
    headers: authHeader(),
  });
};

export const Get = (id: string) => {
  return axios.get(API_URL + `/CustomerPaymentDetails/${id}`, {
    headers: authHeader(),
  });
};
export const GetCustomerPayment = (id: string) => {
  return axios.get(
    API_URL +
      `/CustomerPaymentDetails/GetCustomerPaymentListForOrder?customerid=${id}`,
    {
      headers: authHeader(),
    }
  );
};
export const GetTableStructure = () => {
  return axios.get(API_URL + `/CustomerPaymentDetails/DisplayFieldAlias`, {
    headers: authHeader(),
  });
};

export const Delete = (id: number) => {
  return axios.delete(API_URL + `/CustomerPaymentDetails/${id}`, {
    headers: authHeader(),
  });
};
