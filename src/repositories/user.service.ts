import axios from "axios";
import authHeader from "./auth-header";
import { API_URL } from "~/config/axios";

export const getAll = ({ page, limit }: { page: number; limit: number }) => {
  return axios.post(
    API_URL + "/User/search",
    {
      pageSize: limit,
      pageNumber: page,
    },
    { headers: authHeader() }
  );
};

export const Create = (data: any) => {
  return axios.post(API_URL + "/User/Create", data, {
    headers: authHeader(),
  });
};

export const Modify = (id: string, data: any) => {
  return axios.put(API_URL + `/User/update?id=${id}`, data, {
    headers: authHeader(),
  });
};

export const Get = (id: string) => {
  return axios.get(API_URL + `/User/${id}`, {
    headers: authHeader(),
  });
};
export const GetTableStructure = () => {
  return axios.get(API_URL + `/User/DisplayFieldAlias`, {
    headers: authHeader(),
  });
};

export const Delete = (id: number) => {
  return axios.delete(API_URL + `/User/${id}`, {
    headers: authHeader(),
  });
};
export const CustomerList = () => {
  return axios.get(API_URL + `/DDLList/CustomerList`, {
    headers: authHeader(),
  });
};