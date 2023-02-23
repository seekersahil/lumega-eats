import React from "react";
import ReactDOM from "react-dom/client";
import { foodDelivery, auth } from "./modules";
import { RouterProvider, Outlet, createBrowserRouter } from "react-router-dom";

const router = createBrowserRouter([
  {
    path: "/",
    component: <Outlet />,
    errorElement: <foodDelivery.Error />,
    children: foodDelivery.routes,
  },
]);

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(<RouterProvider router={router} />);
