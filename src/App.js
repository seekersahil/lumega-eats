import React, { useState, useEffect } from "react";
import ReactDOM from "react-dom/client";
import { foodDelivery, auth } from "./modules";
import { RouterProvider, Outlet, createBrowserRouter } from "react-router-dom";

const FoodDelivery = () => {
  const cart = foodDelivery.useCart();
  const [cartData, setCartData] = useState(cart);
  return (
    <>
      <foodDelivery.CartContext.Provider
        value={{ cartData: cartData, setCartData: setCartData }}
      >
        <Outlet />
      </foodDelivery.CartContext.Provider>
    </>
  );
};
const router = createBrowserRouter([
  {
    path: "/",
    element: <FoodDelivery />,
    errorElement: <foodDelivery.Error />,
    children: foodDelivery.routes,
  },
]);

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(<RouterProvider router={router} />);
