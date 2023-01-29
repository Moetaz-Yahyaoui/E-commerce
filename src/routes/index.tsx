import React from "react";
import { Routes, Route } from "react-router-dom";
import { withFallback } from "./withFallback";

const MainLayout = withFallback(React.lazy(() => import("~/layouts")));

const ProductPage = withFallback(
  React.lazy(() => import("~/pages/ProductPage/index"))
);

const RenderRouter: React.FC = () => {
  return (
    <Routes>
      <Route element={<MainLayout />}>
        <Route path="/" element={<ProductPage />} />
      </Route>
    </Routes>
  );
};

export default RenderRouter;
