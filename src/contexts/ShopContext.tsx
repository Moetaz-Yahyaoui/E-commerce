import React, {
  FC,
  useState,
  createContext,
  ReactNode,
  useCallback,
} from "react";

type ShopContextProps = {
  products: any[];
  order: OrderType;
  onChangeOrder: (data: any) => void;
  onChangeData: (data: any) => void;
};

export const ShopContext = createContext<ShopContextProps>(
  {} as ShopContextProps
);

interface ShopProviderProps {
  children?: ReactNode;
}

interface OrderType {
  ordernumber: string;
  customerid: number;
  billto_id: number;
  shipto_id: number;
  shiptypeid: number;
  salesrepid: number;
  totalamount: number;
  discount: number;
  shippingamount: number;
  taxamount: number;
  netamount: number;
  orderdocid: string;
}

export const defaultOrder: OrderType = {
  ordernumber: "",
  customerid: 0,
  billto_id: 0,
  shipto_id: 0,
  shiptypeid: 0,
  salesrepid: 0,
  totalamount: 0,
  discount: 0,
  shippingamount: 0,
  taxamount: 0,
  netamount: 0,
  orderdocid: "",
};

export const ShopProvider: FC<ShopProviderProps> = ({ children }) => {
  const [products, setProduct] = useState<any[]>([]);
  const [order, setOrder] = useState<OrderType>(defaultOrder);

  const onChangeOrder = useCallback((data: any) => {
    setOrder(data);
  }, []);

  const onChangeData = useCallback((data: any) => {
    setProduct(data);
  }, []);

  return (
    <ShopContext.Provider
      value={{
        products,
        order,
        onChangeOrder,
        onChangeData,
      }}
    >
      {children}
    </ShopContext.Provider>
  );
};
