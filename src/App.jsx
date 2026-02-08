import React from "react";
import { Routes, Route } from "react-router-dom";

import Menubar from "./components/Menubar";
import MobileNavbar from "./components/MobileNavbar";
import Footer from "./components/Footer";

import EzploreFruit from "./pages/ExploreFruit/EzploreFruit";
import Contact from "./pages/ExploreFruit/Contact";
import Home from "./pages/ExploreFruit/Home";
import AnimatedHome from "./pages/Home/AnimatedHome";
import FruitDetails from "./fruitdetails/FruitDetails";
import Cart from "./Cart";
import Checkout from "./Checkout";

import Login from "./components/Login/Login";
import Register from "./components/Register";
import OrderSuccess from "./OrderSuccess";
import MyOrders from "./MyOrders";
import NotFound from "./NotFound";
import ProtectedRoute from "./components/ProtectedRoute";

const Layout = ({ children }) => (
  <div className="layout-wrapper">
    <div className="desktop-only">
      <Menubar />
    </div>
    <div className="mobile-only">
      <MobileNavbar />
    </div>

    <div className="content-wrapper">
      {children}
    </div>

    <Footer />
  </div>
);

const App = () => {
  return (
    <Routes>

      {/* 🌐 PUBLIC ROUTES */}
      <Route path="/login" element={<Login />} />
      <Route path="/register" element={<Register />} />

      {/* 🔐 PROTECTED ROUTES */}
      <Route element={<ProtectedRoute />}>
        <Route
          path="/"
          element={<AnimatedHome />}
        />

        <Route
          path="/explore"
          element={
            <Layout>
              <EzploreFruit />
            </Layout>
          }
        />

        <Route
          path="/contactus"
          element={
            <Layout>
              <Contact />
            </Layout>
          }
        />

        <Route
          path="/fruit/:id"
          element={
            <Layout>
              <FruitDetails />
            </Layout>
          }
        />

        <Route
          path="/cart"
          element={
            <Layout>
              <Cart />
            </Layout>
          }
        />

        <Route
          path="/checkout"
          element={
            <Layout>
              <Checkout />
            </Layout>
          }
        />

        <Route
          path="/order-success"
          element={
            <Layout>
              <OrderSuccess />
            </Layout>
          }
        />

        <Route
          path="/my-orders"
          element={
            <Layout>
              <MyOrders />
            </Layout>
          }
        />
      </Route>

      {/* 🚫 404 */}
      <Route path="*" element={<NotFound />} />

    </Routes>
  );
};

export default App;
