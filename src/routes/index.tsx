import React from "react";
import { Routes, Route } from "react-router-dom";
import Layout from "~/layouts";
import EcommerceShop from "~/pages/ProductPage/index";

const RenderRouter: React.FC = () => {
  return (
    <Routes>
      <Route element={<Layout />}>
        <Route path="/" element={<EcommerceShop />} />
      </Route>
    </Routes>
  );
};

export default RenderRouter;
