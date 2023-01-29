import axios from "axios";
import authHeader from "./auth-header";
import { API_URL } from "~/config/axios";

export const getSalesRepList = () => {
  return axios.get(API_URL + `/CustomerOrder/SalesRepList`, {
    headers: authHeader(),
  });
};

export const getShippingList = () => {
  return axios.get(API_URL + `/CustomerOrder/ShippedToList`, {
    headers: authHeader(),
  });
};

export const getBillingList = () => {
  return axios.get(API_URL + `/CustomerOrder/BilledToList`, {
    headers: authHeader(),
  });
};

export const getCustomerCart = () => {
  return axios.get(API_URL + `/CustomerOrder/GetCustomerCartData`, {
    headers: authHeader(),
  });
};

export const UpdateCustomerCart = (data: any) => {
  return axios.post(API_URL + "/CustomerOrder/CustomerCartUpdate", data, {
    headers: authHeader(),
  });
};

export const deleteCustomerCartProduct = (data: any) => {
  return axios.post(
    API_URL + "/CustomerOrder/DeleteCustomerCartProduct",
    data,
    {
      headers: authHeader(),
    }
  );
};

export const deleteAllCustomerCartProduct = () => {
  return axios.post(API_URL + "/CustomerOrder/DeleteAllCustomerCartProduct", {
    headers: authHeader(),
  });
};
