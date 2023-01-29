import { useAuth } from "~/contexts/authContext";
import { RouteProps } from "react-router";
import { Navigate, Route } from "react-router-dom";
import React, { useContext } from "react";
import { ShopContext } from "~/contexts/ShopContext";

export const PrivateRoute: React.FC<RouteProps> = (props) => {
  const { user } = useAuth();
  const { onChangeData } = useContext(ShopContext);

  if (!user) {
    onChangeData([]);
    return <Navigate to="/" />;
  }

  return <Route {...props} />;
};
