import { IObjectKeys } from "./shared";
export interface IProduct {
  id: string;
  cover: string;
  name: string;
  price: number;
  priceSale: string;
  colors: string[];
  status: string | undefined;
  purchasecost: string;
  customerprice: number;
  quantity: number;
}

export interface IDefaultValuesProducts {
  ProductCategoryID: number;
  name: string;
  Sales_Description: string;
  SKU: string;
  Type: number;
  SalesPriceRate: string;
  IncomeAccount: number;
  ExpenseAccount: number;
  InventoryAssetAccount: number;
  PurchaseCost: number;
  QuantityAsOfDate: Date;
  ListPrice: number;
  GP_1: number;
  Discount_10: number;
  GP_2: number;
  Discount_20: number;
  GP_3: number;
}

export interface IPropsproductForm {
  element: any | null;
  id?: string;
  onHandleAddUpdate: () => void;
  onClose: () => void;
  listForienKey: { [key: string]: any };
}

export interface IPagination {
  page: number;
  limit: number;
}

export interface IProducts extends IObjectKeys {
  Discount_10: number;
  Discount_20: number;
  ExpenseAccount: number;
  GP_1: number;
  GP_2: number;
  GP_3: number;
  Id: number;
  IncomeAccount: number;
  InventoryAssetAccount: number;
  IsDeleted: boolean;
  ListPrice: number;
  name: string;
  ProductCategoryID: number;
  PurchaseCost: number;
  QuantityAsOfDate: Date;
  SKU: string;
  SalesPriceRate: any;
  Sales_Description: string;
  Type: number;
}
