import React from "react";
import { Routes, Route } from "react-router-dom";
import ChangePasswordPage from "~/pages/changePassword";
import OrderPage from "~/pages/OrderPage/OrderList";
import { withFallback } from "./withFallback";

const MainLayout = withFallback(
  React.lazy(() => import("~/layouts/LandingPageLAyout"))
);
const RegisterLayouts = withFallback(
  React.lazy(() => import("~/layouts/RegisterLayouts"))
);

const CheckoutPage = withFallback(
  React.lazy(() => import("~/pages/CheckoutPage/index"))
);
const HomePage = withFallback(React.lazy(() => import("~/pages/HomePage")));

const LoginPage = withFallback(React.lazy(() => import("~/pages/Login/index")));
const ProductPage = withFallback(
  React.lazy(() => import("~/pages/ProductPage/index"))
);
const OrderDetailPage = withFallback(
  React.lazy(() => import("~/pages/OrderDetails"))
);
const ForgotPage = withFallback(
  React.lazy(() => import("~/pages/ForgotPassword"))
);
const ProductDetailsPage = withFallback(
  React.lazy(() => import("~/pages/ProductPage/ProductDetails"))
);
const AboutUsPage = withFallback(
  React.lazy(() => import("~/pages/AboutUsPage/index"))
);

const RenderRouter: React.FC = () => {
  return (
    <Routes>
      <Route element={<RegisterLayouts />}>
        <Route path="/login" element={<LoginPage />} />
      </Route>
      <Route element={<RegisterLayouts />}>
        <Route path="/forgotPassword" element={<ForgotPage />} />
      </Route>
      <Route element={<MainLayout />}>
        <Route path="/" element={<HomePage />} />
        <Route path="/change-password" element={<ChangePasswordPage />} />
        <Route path="/product" element={<ProductPage />} />
        <Route path="/Checkout" element={<CheckoutPage />} />
        <Route path="/order" element={<OrderPage />} />
        <Route path="/order/:id" element={<OrderDetailPage />} />

        <Route path="/about-us" element={<AboutUsPage />} />
        <Route
          path="/product/product-details/:id"
          element={<ProductDetailsPage />}
        />
      </Route>
    </Routes>
  );
};

export default RenderRouter;
