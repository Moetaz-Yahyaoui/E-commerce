import axios from "axios";
import authHeader from "./auth-header";
import { API_URL } from "~/config/axios";

export const getAllCustomerDocumentById = ({ id }: { id: string }) => {
  return axios.post(
    API_URL + `/CustomerDocument/search?customerid=${id}`,
    {
      pageSize: 500,
      pageNumber: 1,
    },
    { headers: authHeader() }
  );
};

export const Create = (data: any) => {
  const formData = new FormData();
  formData.append("Attachment", data.Attachment);
  formData.append("notes", data.notes);
  formData.append("doctypeid", data.doctypeid);
  formData.append("customerid", data.customerid);
  return axios.post(API_URL + "/CustomerDocument/UploadFile", formData, {
    headers: {
      Accept: "application/json",
      "Content-Type": "application/pdf",
      ...authHeader(),
    },
  });
};

export const Modify = (id: string, data: any) => {
  return axios.put(API_URL + `/CustomerContact/update?id=${id}`, data, {
    headers: authHeader(),
  });
};

export const Get = (id: string) => {
  return axios.get(API_URL + `/CustomerDocument/${id}`, {
    headers: authHeader(),
  });
};
export const GetTableStructure = () => {
  return axios.get(API_URL + `/CustomerDocument/DisplayFieldAlias`, {
    headers: authHeader(),
  });
};

export const Delete = (id: number) => {
  return axios.delete(API_URL + `/CustomerDocument/${id}`, {
    headers: authHeader(),
  });
};

export const Download = (id: number) => {
  return axios.get(API_URL + `/CustomerDocument/Download?id=${id}`, {
    responseType: "blob",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/pdf",
      ...authHeader(),
    },
  });
};
