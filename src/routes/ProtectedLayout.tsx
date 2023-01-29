import { Navigate } from "react-router-dom";
import { ReactNode, useContext } from "react";
import { ShopContext } from "~/contexts/ShopContext";

export const ProtectedRoute = ({
  children,
  isAllowed,
  user,
}: {
  children: ReactNode;
  isAllowed: string;
  user: any;
}): JSX.Element => {
  const { onChangeData } = useContext(ShopContext);
  if (!user) {
    onChangeData([]);
    return <Navigate to="/" />;
  }

  if (!user.modules?.includes(isAllowed)) {
    return <Navigate to="/landingPage" />;
  }

  return <>{children}</>;
};
