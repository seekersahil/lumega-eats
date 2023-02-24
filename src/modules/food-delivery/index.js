import { useState } from "react";
import { Home, Error, RestaurantMenu, Cart } from "./pages";
import { CartContext, useCart } from "./utils";
import { Outlet, useOutletContext } from "react-router-dom";
const routes = [
  {
    path: "/",
    element: <Home />,
  },
  {
    path: "/restaurant/:city/:restaurant/:id",
    element: <RestaurantMenu />,
  },
  {
    path: "/cart",
    element: <Cart />,
  },
];
const App = () => {
  const cart = useCart();
  const [cartData, setCartData] = useState(cart);
  return (
    <>
      <CartContext.Provider
        value={{ cartData: cartData, setCartData: setCartData }}
      >
        <Outlet />
      </CartContext.Provider>
    </>
  );
};

export default { routes, Error, App, CartContext, useCart };
