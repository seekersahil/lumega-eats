import { createContext } from "react";

let CartContext = createContext({
  cartData: {
    cartMeta: {
      restaurant_details: {},
    },
    cartItems: {},
  },
});

CartContext.displayName = "CartContext";

export default CartContext;
