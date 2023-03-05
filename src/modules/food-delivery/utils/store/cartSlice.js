import { createSlice } from "@reduxjs/toolkit";

const cartSlice = createSlice({
  name: "cart",
  initialState: {},
  reducers: {
    addItem: (state, action) => {
      const { item, restaurant } = action.payload;
      if (!state.hasOwnProperty(restaurant.id)) {
        state = {
          [restaurant.id]: {
            cartMeta: {
              restaurant_details: {
                ...restaurant,
              },
            },
            cartItems: {},
          },
        };
      }
      return {
        [restaurant.id]: {
          ...state[restaurant.id],
          cartItems: {
            ...state[restaurant.id]?.cartItems,
            [item.id]: {
              quantity: 1,
              items: [
                {
                  ...item,
                },
              ],
              itemId: item.id,
            },
          },
        },
      };
    },
    updateItem: (state, action) => {
      const { item, restaurant, newQuantity } = action.payload;
      const { id } = item;
      const index = restaurant?.id;

      if (newQuantity > 0) {
        return {
          [index]: {
            ...state[index],
            cartItems: {
              ...state[index]?.cartItems,
              [id]: {
                ...state[index]?.cartItems[id],
                quantity: newQuantity,
              },
            },
          },
        };
      } else {
        const {
          [id]: {},
          ...rest
        } = state[index]?.cartItems;
        if (JSON.stringify(rest) === "{}") {
          return {
            1: {
              cartMeta: {
                restaurant_details: {},
              },
              cartItems: {},
            },
          };
        } else {
          return {
            [index]: {
              ...state[index],
              cartItems: {
                ...rest,
              },
            },
          };
        }
      }
    },
    clearCart: () => {
      return {
        1: {
          cartMeta: {
            restaurant_details: {},
          },
          cartItems: {},
        },
      };
    },
  },
});

export const { addItem, updateItem, clearCart } = cartSlice.actions;

export default cartSlice.reducer;
