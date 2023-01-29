import axios from "axios";
import authHeader from "./auth-header";
import { API_URL } from "~/config/axios";

export const getAll = ({ page, limit }: { page: number; limit: number }) => {
  return axios.post(
    API_URL + "/ProductCategory/search",
    {
      pageSize: limit,
      pageNumber: page,
    },
    { headers: authHeader() }
  );
};

export const GetAllCategoies = () => {
  return axios.get(API_URL + `/CustomerOrder/ProductCategoryList`, {
    headers: authHeader(),
  });
};

export const GetAllSubCategoies = () => {
  return axios.get(API_URL + `/CustomerOrder/ProductSubCategoryList`, {
    headers: authHeader(),
  });
};

export const Create = (data: any) => {
  return axios.post(API_URL + "/ProductCategory/Create", data, {
    headers: authHeader(),
  });
};

export const Modify = (id: string, data: any) => {
  return axios.put(API_URL + `/ProductCategory/update?id=${id}`, data, {
    headers: authHeader(),
  });
};

export const Get = (id: string) => {
  return axios.get(API_URL + `/ProductCategory/${id}`, {
    headers: authHeader(),
  });
};
export const GetTableStructure = () => {
  return axios.get(API_URL + `/ProductCategory/DisplayFieldAlias`, {
    headers: authHeader(),
  });
};

export const Delete = (id: number) => {
  return axios.delete(API_URL + `/ProductCategory/${id}`, {
    headers: authHeader(),
  });
};
