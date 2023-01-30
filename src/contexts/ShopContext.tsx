import React, {
  FC,
  useState,
  createContext,
  ReactNode,
  useCallback,
} from "react";

type ShopContextProps = {
  products: any[];
  onChangeData: (data: any) => void;
};

export const ShopContext = createContext<ShopContextProps>(
  {} as ShopContextProps
);

interface ShopProviderProps {
  children?: ReactNode;
}

export const ShopProvider: FC<ShopProviderProps> = ({ children }) => {
  const [products, setProduct] = useState<any[]>([]);

  const onChangeData = useCallback((data: any) => {
    setProduct(data);
  }, []);

  return (
    <ShopContext.Provider
      value={{
        products,
        onChangeData,
      }}
    >
      {children}
    </ShopContext.Provider>
  );
};
