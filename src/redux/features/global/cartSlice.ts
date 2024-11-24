


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
  totalPrice: number; 
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
      const { _id, quantity = 1, price } = action.payload;
      const existingItemIndex = state.cartItems.findIndex((item) => item._id === _id);
      if (existingItemIndex !== -1) {
        // Update quantity and total price if the item already exists
        state.cartItems[existingItemIndex].quantity += quantity;
          state.cartItems[existingItemIndex].totalPrice +=
          state.cartItems[existingItemIndex].quantity * state.cartItems[existingItemIndex].price;
      } else {
        // Add a new item and calculate total price
        state.cartItems.push({ 
          ...action.payload, 
          quantity, 
          totalPrice: quantity * price 
        });
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
    updateItemQuantity: (state, action: PayloadAction<{ _id: string; quantity: number,price:number }>) => {
      const { _id, quantity,price } = action.payload;
      const item = state.cartItems.find((item) => item._id === _id);
      if (item) {
        if (quantity > 0) {
          // Update the quantity of the item in the cart
          item.quantity = quantity;
          item.totalPrice += price;
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
