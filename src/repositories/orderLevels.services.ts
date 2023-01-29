import axios from "axios";
import authHeader from "./auth-header";
import { API_URL } from "~/config/axios";

export const getSearchPendingPackaging = ({
  page,
  limit,
}: {
  page: number;
  limit: number;
}) => {
  return axios.post(
    API_URL + "/OrderLevel/SearchPendingPackaging",
    {
      pageSize: limit,
      pageNumber: page,
    },
    { headers: authHeader() }
  );
};

export const Get = (id: string) => {
  return axios.get(
    API_URL + `/OrderLevel/GetPendingPacakgingOrderDataFromId?orderid=${id}`,
    {
      headers: authHeader(),
    }
  );
};
export const GetShipping = (id: string) => {
  return axios.get(
    API_URL + `/OrderLevel/GetPendingShippingOrderDataFromId?orderid=${id}`,
    {
      headers: authHeader(),
    }
  );
};
export const GetDelivery = (id: string) => {
  return axios.get(
    API_URL +
      `
​/OrderLevel​/GetPendingDeliveryOrderDataFromId?orderid=${id}`,
    {
      headers: authHeader(),
    }
  );
};

export const getSearchPendingShipping = ({
  page,
  limit,
}: {
  page: number;
  limit: number;
}) => {
  return axios.post(
    API_URL + "/OrderLevel/SearchPendingShipping",
    {
      pageSize: limit,
      pageNumber: page,
    },
    { headers: authHeader() }
  );
};

export const getSearchPendingDelivery = ({
  page,
  limit,
}: {
  page: number;
  limit: number;
}) => {
  return axios.post(
    API_URL + "/OrderLevel/SearchPendingDelivery",
    {
      pageSize: limit,
      pageNumber: page,
    },
    { headers: authHeader() }
  );
};

export const GetPendingShippingByID = (id: string, ordershippingid: string) => {
  return axios.get(
    API_URL +
      `/OrderLevel/GetPendingShippingOrderDataFromId?orderid=${id}&ordershippingid=${ordershippingid}`,
    {
      headers: authHeader(),
    }
  );
};
export const GetDeliveryOrderByID = (id: string, ordershippingid: string) => {
  return axios.get(
    API_URL +
      `/OrderLevel/GetPendingDeliveryOrderDataFromId?orderid=${id}&ordershippingid=${ordershippingid}`,
    {
      headers: authHeader(),
    }
  );
};

export const GetTableStructurePackaging = () => {
  return axios.get(API_URL + `/OrderLevel/DisplayFieldAliasPendingPackaging`, {
    headers: authHeader(),
  });
};
export const GetTableStructureShipping = () => {
  return axios.get(
    API_URL + `/OrderLevel/DisplayFieldAliasSearchPendingShipping`,
    {
      headers: authHeader(),
    }
  );
};
export const GetTableStructureDelivery = () => {
  return axios.get(
    API_URL + `/OrderLevel/DisplayFieldAliasSearchPendingDelivery`,
    {
      headers: authHeader(),
    }
  );
};

export const GenerateOrderPackageDone = (data: any) => {
  return axios.post(API_URL + `/OrderLevel/GenerateOrderPackageDone`, data, {
    headers: authHeader(),
  });
};
