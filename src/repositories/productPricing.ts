import axios from "axios";
import authHeader from "./auth-header";
import { API_URL } from "~/config/axios";

export const getAllCustomerProductPricing = (
  page: any,
  limit: any,
  id: any
) => {
  return axios.post(
    API_URL + `/CustomerProductPricing/search?customerid=${id}`,
    {
      pageSize: limit,
      pageNumber: page,
    },
    { headers: authHeader() }
  );
};
export const getAllProductListForCustomer = (id: any) => {
  return axios.get(
    API_URL + `/CustomerProductPricing/ProductListForCustomer?customerid=${id}`,
    { headers: authHeader() }
  );
};

export const GetProductSKUDetails = (data: any) => {
  return axios.post(
    API_URL + "/CustomerProductPricing/GetProductSKUDetails",
    data,
    {
      headers: authHeader(),
    }
  );
};

export const Modify = (id: string, data: any) => {
  return axios.put(API_URL + `/CustomerProductPricing/update?id=${id}`, data, {
    headers: authHeader(),
  });
};

export const GetTableStructure = () => {
  return axios.get(API_URL + `/CustomerProductPricing/DisplayFieldAlias`, {
    headers: authHeader(),
  });
};

export const Get = (id: string) => {
  return axios.get(API_URL + `/CustomerProductPricing/${id}`, {
    headers: authHeader(),
  });
};
export const GetAllProduct = (id: any) => {
  return axios.get(
    API_URL +
      `/CustomerProductPricing/ProductListForCustomerClient?customerid=${id}`,
    {
      headers: authHeader(),
    }
  );
};

export const Create = (data: any) => {
  return axios.post(API_URL + "/CustomerProductPricing/Create", data, {
    headers: authHeader(),
  });
};

export const Delete = (id: number) => {
  return axios.delete(API_URL + `/CustomerProductPricing/${id}`, {
    headers: authHeader(),
  });
};
