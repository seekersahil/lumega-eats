import React, { useState } from "react";
import ReactDOM from "react-dom/client";
import { foodDelivery } from "./modules";
import { RouterProvider, Outlet, createBrowserRouter } from "react-router-dom";
import { Provider } from "react-redux";

const FoodDelivery = () => {
  const cartsData = foodDelivery.useCarts();
  const [carts, setCarts] = useState(cartsData);
  const wishlistData = foodDelivery.useWishlist();
  const [wishlist, setWishlist] = useState(wishlistData);
  return (
    <>
      <Provider store={foodDelivery.store}>
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
      </Provider>
    </>
  );
};
const router = createBrowserRouter(
  [
    {
      path: "/",
      element: <FoodDelivery />,
      errorElement: (
        <Provider store={foodDelivery.store}>
          <foodDelivery.Error />
        </Provider>
      ),
      children: foodDelivery.routes,
    },
  ],
  {
    basename: "/projects/lumega-eats/",
  }
);

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(<RouterProvider router={router} />);
