import React, { useState } from "react";
import ReactDOM from "react-dom/client";
import { foodDelivery } from "./modules";
import { RouterProvider, Outlet, createBrowserRouter } from "react-router-dom";

const FoodDelivery = () => {
  const cartsData = foodDelivery.useCarts();
  const [carts, setCarts] = useState(cartsData);
  const wishlistData = foodDelivery.useWishlist();
  const [wishlist, setWishlist] = useState(wishlistData);
  return (
    <>
      <foodDelivery.WishlistContext.Provider
        value={{
          wishlist: wishlist,
          setWishlist: setWishlist,
        }}
      >
        <foodDelivery.CartsContext.Provider
          value={{
            carts: carts,
            setCarts: setCarts,
          }}
        >
          <Outlet />
        </foodDelivery.CartsContext.Provider>
      </foodDelivery.WishlistContext.Provider>
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
