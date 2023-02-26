import { createContext } from "react";

let CartsContext = createContext([
  {
    cartMeta: {
      restaurant_details: {},
    },
    cartItems: {},
  },
]);

CartsContext.displayName = "CartsContext";

export default CartsContext;
