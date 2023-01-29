import axios from "axios";
import authHeader from "./auth-header";
import { API_URL } from "~/config/axios";

export const GetUserModuleListForSet = (id: string) => {
  return axios.get(
    API_URL + `/UserModule/GetUserModuleListForSet?foruserid=${id}`,
    {
      headers: authHeader(),
    }
  );
};
export const SaveUserModule = (id: string, data: any) => {
  return axios.post(
    API_URL + `/UserModule/SaveUserModule?foruserid=${id}`,
    data,
    {
      headers: authHeader(),
    }
  );
};
