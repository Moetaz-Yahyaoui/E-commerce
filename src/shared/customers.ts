import { IDefaultCompanyValues } from "~/types";
export const FormInputCustomerList = [
  { name: "name", type: "" },
  { name: "phone", type: "" },
  { name: "email", type: "" },
  // { name: "address1", type: "" },
  // { name: "address2", type: "" },
  { name: "city", type: "" },
  { name: "state", type: "" },
  // { name: "country", type: "" },
  // { name: "comments", type: "" },
  // { name: "tags", type: "" },
];
export const DEFAULT_VALUES: IDefaultCompanyValues = {
  name: "",
  phone: "",
  email: "",
  address1: "",
  address2: "",
  city: "",
  state: "",
  country: "",
  comments: "",
  tags: "",
};

export const TABLE_CUSTOMERS_STRUCTURE: Array<string> = [
  "name",
  "phone",
  "email",
  "city",
  "state",
];

export const CUSTOMER_SHARED_DATA: Record<string, any> = {
  addRoute: "/customers/add-customer",
  title: "Customers List",
};
