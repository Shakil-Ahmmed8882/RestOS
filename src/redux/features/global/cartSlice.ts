// // src/store/cartSlice.ts
// import { createSlice, PayloadAction } from "@reduxjs/toolkit";
// import { RootState } from "../../store";

// // Define a type for cart item
// interface CartItem {
//   _id: string; 
//   foodName: string; 
//   status: string; 
//   foodImage: string; 
//   foodCategory: string; 
//   price: number; 
//   orders: number; 
//   quantity: number; 
//   made_by: string; 
//   food_origin: string; 
//   description: string; 
//   reviews: any[]; 
//   count: number; 
// }

// // Define a type for the cart state
// interface CartState {
//   cartItems: CartItem[]; // List of items in the cart
// }

// // Initial state
// const initialState: CartState = {
//   cartItems: [],
// };

// // Create the cart slice
// const cartSlice = createSlice({
//   name: "cart",
//   initialState,
//   reducers: {
//     addToCart: (state, action: PayloadAction<Omit<CartItem, "quantity"> & { count?: number }>) => {
//       const { _id, count = 1 } = action.payload;
//       const existingItemIndex = state.cartItems.findIndex((item) => item._id === _id);

//       if (existingItemIndex !== -1) {
//         // If item exists, increase its count
//         state.cartItems[existingItemIndex].count += count;
//       } else {
//         // Add a new item to the cart
//         state.cartItems.push({ ...action.payload, count, quantity });
//       }
//     },
//     removeFromCart: (state, action: PayloadAction<{ _id: string }>) => {
//       // Remove item from the cart
//       state.cartItems = state.cartItems.filter((item) => item._id !== action.payload._id);
//     },
//     clearCart: (state) => {
//       // Clear the cart
//       state.cartItems = [];
//     },
//     updateItemCount: (state, action: PayloadAction<{ _id: string; count: number }>) => {
//       const { _id, count } = action.payload;
//       const item = state.cartItems.find((item) => item._id === _id);

//       if (item) {
//         if (count > 0) {
//           // Update item count
//           item.count = count;
//         } else {
//           // Remove item if count is zero or less
//           state.cartItems = state.cartItems.filter((item) => item._id !== _id);
//         }
//       }
//     },
//   },
// });

// // Selectors

// // Selector to calculate the total count of all items in the cart
// export const selectCartCount = (state: RootState): number => {
//   return state.cart.cartItems.reduce((total, item) => total + item.count, 0);
// };

// // Selector to calculate the total price of the cart
// export const selectCartTotalPrice = (state: RootState): number => {
//   return state.cart.cartItems.reduce((total, item) => total + item.price * item.count, 0);
// };

// // Selector to retrieve all cart items
// export const selectCartItems = (state: RootState): CartItem[] => {
//   return state.cart.cartItems;
// };

// // Export actions and reducer
// export const { addToCart, removeFromCart, clearCart, updateItemCount } = cartSlice.actions;

// export default cartSlice.reducer;



// src/store/cartSlice.ts
import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { RootState } from "../../store";

// Define a type for cart item
interface CartItem {
  _id: string;
  foodName: string;
  status: string;
  foodImage: string;
  foodCategory: string;
  price: number; 
  orders: number;
  quantity: number; 
  made_by: string;
  food_origin: string;
  description: string;
  reviews: any[];
}

// Define a type for the cart state
interface CartState {
  cartItems: CartItem[]; // Array to store items in the cart
}

// Initial state
const initialState: CartState = {
  cartItems: [],
};

// Create the cart slice
const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    addToCart: (
      state,
      action: PayloadAction<Omit<CartItem, "quantity"> & { quantity?: number }>
    ) => {
      const { _id, quantity = 1 } = action.payload;
      const existingItemIndex = state.cartItems.findIndex((item) => item._id === _id);

      if (existingItemIndex !== -1) {
        // If item exists, increase its quantity in the cart
        state.cartItems[existingItemIndex].quantity += quantity;
      } else {
        // Add a new item to the cart with the specified quantity
        state.cartItems.push({ ...action.payload, quantity });
      }
    },
    removeFromCart: (state, action: PayloadAction<{ _id: string }>) => {
      // Remove item from the cart
      state.cartItems = state.cartItems.filter((item) => item._id !== action.payload._id);
    },
    clearCart: (state) => {
      // Clear the entire cart
      state.cartItems = [];
    },
    updateItemQuantity: (state, action: PayloadAction<{ _id: string; quantity: number }>) => {
      const { _id, quantity } = action.payload;
      const item = state.cartItems.find((item) => item._id === _id);

      if (item) {
        if (quantity > 0) {
          // Update the quantity of the item in the cart
          item.quantity = quantity;
        } else {
          // Remove item from the cart if quantity is zero or less
          state.cartItems = state.cartItems.filter((item) => item._id !== _id);
        }
      }
    },
  },
});

// Selectors

// Selector to calculate the total quantity of all items in the cart
export const selectCartQuantity = (state: RootState): number => {
  return state.cart.cartItems.reduce((total, item) => total + item.quantity, 0);
};

// Selector to calculate the total price of the cart
// This now calculates based on how many the user has added to the cart, not stock quantity
export const selectCartTotalPrice = (state: RootState): number => {
  return state.cart.cartItems.reduce((total, item) => total + item.price * item.quantity, 0);
};

// Selector to retrieve all cart items
export const selectCartItems = (state: RootState): CartItem[] => {
  return state.cart.cartItems;
};

// Export actions and reducer
export const { addToCart, removeFromCart, clearCart, updateItemQuantity } = cartSlice.actions;

export default cartSlice.reducer;
