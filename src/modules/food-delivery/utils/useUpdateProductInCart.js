import React, { useEffect, useState } from "react";

const useUpdateProductInCart = (id, newQuantity, setCartData) => {
  setCartData((prev) => ({
    ...prev,
    cartItems: {
      ...prev.cartItems,
      [id]: {
        ...prev.cartItems[id],
        quantity: newQuantity,
      },
    },
  }));
};
export default useUpdateProductInCart;
