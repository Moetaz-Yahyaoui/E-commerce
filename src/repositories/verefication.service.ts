import axios from "axios";
import { API_URL } from "~/config/axios";
import authHeader from "./auth-header";

export const ChangeService = (newPassword: string, oldPassword: string) => {
  return axios
    .post(
      API_URL + "/Account/ChangePassword",
      {
        newPassword,
        oldPassword,
      },
      { headers: authHeader() }
    )
    .then(response => {
      if (response.data.accessToken) {
        sessionStorage.setItem("user", JSON.stringify(response.data));
      }

      return response.data;
    });
};

export const verificationService = (email: string, type: string) => {
  return axios
    .post(
      API_URL + "/Account/VerifyEmailCustomer",
      {
        email,
        type,
      },
      { headers: authHeader() }
    )
    .then(response => {
      if (response.data.accessToken) {
        sessionStorage.setItem("user", JSON.stringify(response.data));
      }

      return response.data;
    });
};

export const ResetPwd = (newPassword: string, password: string) => {
  return axios
    .post(
      API_URL + "/Account/VerifyResetPwd",
      {
        newPassword,
        password,
      },
      { headers: authHeader() }
    )
    .then(response => {
      if (response.data.token) {
        sessionStorage.setItem("user", JSON.stringify(response.data));
      }

      return response.data;
    });
};
export const OTPPost = (email: string, logincode: string) => {
  return axios
    .post(
      API_URL + "/Account/VerifyLoginCode",
      {
        email,
        logincode,
      },
      { headers: authHeader() }
    )
    .then(response => {
      if (response.data.token) {
        sessionStorage.setItem("user", JSON.stringify(response.data));
      }

      return response.data;
    });
};
