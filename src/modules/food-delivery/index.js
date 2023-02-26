import { Home, Error, RestaurantMenu, Carts } from "./pages";
import { CartsContext, useCarts } from "./utils";
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
];

export default {
  routes,
  Error,
  CartsContext,
  useCarts,
};
