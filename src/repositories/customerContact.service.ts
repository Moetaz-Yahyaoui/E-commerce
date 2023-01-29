import axios from "axios";
import authHeader from "./auth-header";
import { API_URL } from "~/config/axios";

export const getAllCustomerContact = ({
  page,
  limit,
}: {
  page: number;
  limit: number;
}) => {
  return axios.post(
    API_URL + "/CustomerContact/search",
    {
      pageSize: limit,
      pageNumber: page,
    },
    { headers: authHeader() }
  );
};

export const getAllCustomerContactById = (id: string) => {
  return axios.post(
    API_URL + `/CustomerContact/search?customerid=${id}`,
    {
      pageSize: 50,
      pageNumber: 1,
    },
    { headers: authHeader() }
  );
};

export const getAllPatientsByCustomerId = (id: string) => {
  return axios.post(
    API_URL + `/CustomerContact/searchpatient?customerid=${id}`,
    {
      pageSize: 200,
      pageNumber: 1,
    },
    { headers: authHeader() }
  );
};
export const getAllPatientsList = () => {
  return axios.get(API_URL + `/CustomerOrder/PatientShippedToList`, {
    headers: authHeader(),
  });
};

export const Create = (data: any) => {
  return axios.post(API_URL + "/CustomerContact/create", data, {
    headers: authHeader(),
  });
};

export const CreatePatientContact = (data: any) => {
  return axios.post(API_URL + "/CustomerContact/CreatePatientContact", data, {
    headers: authHeader(),
  });
};
export const CreatePatient = (data: any) => {
  return axios.post(API_URL + "/CustomerContact/CreatePatientContact", data, {
    headers: authHeader(),
  });
};
export const Modify = (id: string, data: any) => {
  return axios.put(
    API_URL + `/CustomerContact/UpdatePatientContact?id=${id}`,
    data,
    {
      headers: authHeader(),
    }
  );
};
export const ModifyPatient = (id: string, data: any) => {
  return axios.put(
    API_URL + `/CustomerContact/UpdatePatientContact?id=${id}`,
    data,
    {
      headers: authHeader(),
    }
  );
};
export const Get = (id: string) => {
  return axios.get(API_URL + `/CustomerContact/${id}`, {
    headers: authHeader(),
  });
};
export const GetShippedToList = (id: string) => {
  return axios.get(
    API_URL + `/CustomerContact/ShippedToList?customerid=${id}`,
    {
      headers: authHeader(),
    }
  );
};

export const BilledToList = (id: string) => {
  return axios.get(API_URL + `/CustomerContact/BilledToList?customerid=${id}`, {
    headers: authHeader(),
  });
};

export const GetTableStructure = () => {
  return axios.get(API_URL + `/CustomerContact/DisplayFieldAlias`, {
    headers: authHeader(),
  });
};

export const Delete = (id: number) => {
  return axios.delete(API_URL + `/CustomerContact/${id}`, {
    headers: authHeader(),
  });
};
