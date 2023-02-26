import React, { useState } from "react";
import ReactDOM from "react-dom/client";
import { foodDelivery } from "./modules";
import { RouterProvider, Outlet, createBrowserRouter } from "react-router-dom";

const FoodDelivery = () => {
  const cartsData = foodDelivery.useCarts();
  const [carts, setCarts] = useState(cartsData);
  return (
    <>
      <foodDelivery.CartsContext.Provider
        value={{ carts: carts, setCarts: setCarts }}
      >
        <Outlet />
      </foodDelivery.CartsContext.Provider>
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
