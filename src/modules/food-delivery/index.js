import { Home, Error, RestaurantMenu, Carts, Wishlist, Search } from "./pages";
import {
  CartsContext,
  useCarts,
  WishlistContext,
  useWishlist,
  store,
} from "./utils";
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
    path: "/restaurant/:id",
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
  {
    path: "/restaurant-search",
    element: <Search />,
  },
];

export default {
  routes,
  Error,
  CartsContext,
  useCarts,
  WishlistContext,
  useWishlist,
  store,
};
