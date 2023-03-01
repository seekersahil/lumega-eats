import { createContext } from "react";

let WishlistContext = createContext([
  {
    wishlistMeta: {
      restaurant_details: {},
    },
    wishlistItems: {},
  },
]);

WishlistContext.displayName = "WishlistContext";

export default WishlistContext;
