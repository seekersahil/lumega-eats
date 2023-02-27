import { useState } from "react";

const useCart = () => {
  const [carts, setCarts] = useState({});
  return carts;
};
export default useCart;
