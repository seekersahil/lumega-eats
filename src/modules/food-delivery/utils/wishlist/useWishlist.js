import { useState } from "react";

const useWishlist = () => {
  const [wishlist, setWishlist] = useState({});
  return wishlist;
};
export default useWishlist;
