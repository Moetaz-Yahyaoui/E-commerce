import { IObjectKeys } from "./shared";
export interface ICompany extends IObjectKeys {
  name: string;
  phone: string;
  email: string;
  address1: string;
  address2: string;
  city: string;
  state: string;
  country: string;
  comments: string;
  tags: string;
  id: number;
  createdBy: number;
  createdUtc: Date;
  modifiedUtc: Date;
  modifiedBy: number;
}

export interface IPropscompanyForm {
  company: IDefaultCompanyValues | null;
  id?: string;
  onClose: () => void;
  listForienKey: { [key: string]: any };
  onHandleAddUpdate: () => void;
}
export interface IDefaultCompanyValues {
  name: string;
  phone: string;
  email: string;
  address1: string;
  address2: string;
  city: string;
  state: string;
  country: string;
  comments: string;
  tags: string;
}
