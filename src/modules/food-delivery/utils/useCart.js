import React, { useEffect, useState } from "react";

const useCart = (
  cartData = {
    cartMeta: {
      restaurant_details: {
        name: "Smile Bakers",
        area_name: "Vivek Nagar",
        cloudinary_image_id: "egwrpfliu1uijil8uesf",
      },
    },
    cartItems: {
      38286711: {
        quantity: 2,
        items: [
          {
            menu_item_id: 38286711,
            name: "Aloo Patty ",
            effective_item_price: 15,
            isVeg: 1,
          },
        ],
        itemId: 38286711,
      },
      38286716: {
        quantity: 1,
        items: [
          {
            menu_item_id: 38286716,
            name: "Cheese Sandwich",
            effective_item_price: 30,
            isVeg: 1,
          },
        ],
        itemId: 38286716,
      },
    },
  },
  id = 0,
  newQuantity = 1
) => {
  const [cart, setCart] = useState(cartData);

  useEffect(() => {
    if (newQuantity > 0) {
      setCart((prev) => ({
        ...prev,
        cartItems: {
          ...prev.cartItems,
          [id]: {
            ...prev.cartItems[id],
            quantity: newQuantity,
          },
        },
      }));
    } else {
      const {
        [id]: {},
        ...rest
      } = cart.cartItems;
      setCart((prev) => ({
        ...prev,
        cartItems: {
          ...rest,
        },
      }));
    }
  }, [cartData, id, newQuantity]);

  return cart;
};
export default useCart;
