import { IDefaultValuesProducts } from "~/types";
export const FormInputProductList = [
  { name: "name", label: "Name*" },
  { name: "sku", label: "SKU*" },
  { name: "manufacturer", label: "Manufacturer*" },
  { name: "purchasecost", label: "Purchase Cost($)*" },
  { name: "customerprice", label: "customerprice*" },
  // { name: "minimumqty", type: "" },
  // { name: "maximumqty", type: "" },
];

export const DEFAULT_PRODUCT_VALUES: Record<string, any> = {
  name: "",
  sku: "",
  manufacturer: "",
  purchasecost: 0,
  customerprice: 0,
  // minimumqty: 0,
  // maximumqty: 0,
  productcategoryid: 1,
  type: 1,
  vendorid: 1,
  istaxable: true,
};

export const TABLE_PRODUCTSS_STRUCTURE: Array<string> = [
  "name",
  "sku",
  "type",
  "listprice",
];

export const PRODUCT_SHARED_DATA: Record<string, string> = {
  addRoute: "/products/add-product",
  title: "Product List",
};
