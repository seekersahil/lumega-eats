import React, { useState } from "react";

const useCart = () => {
  const [cart, setCart] = useState({
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
  });

  return cart;
};
export default useCart;
