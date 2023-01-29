import axios from "axios";
import authHeader from "./auth-header";
import { API_URL } from "~/config/axios";
export const GetAllCustomerList = ({ id }: { id: string }) => {
  return axios.get(
    API_URL + `/DDLList/CustomerList`,

    { headers: authHeader() }
  );
};

export const GetAll = () => {
  return axios.get(
    API_URL + `/DDLList/Dashboard`,

    { headers: authHeader() }
  );
};
export const GetAllState = () => {
  return axios.get(
    API_URL + `/DDLList/StateList`,

    { headers: authHeader() }
  );
};
