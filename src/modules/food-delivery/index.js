import { Home, Error, RestaurantMenu, Carts, Wishlist } from "./pages";
import { CartsContext, useCarts, WishlistContext, useWishlist } from "./utils";
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
    element: <Carts />,
  },
  {
    path: "/wishlist",
    element: <Wishlist />,
  },
];

export default {
  routes,
  Error,
  CartsContext,
  useCarts,
  WishlistContext,
  useWishlist,
};
