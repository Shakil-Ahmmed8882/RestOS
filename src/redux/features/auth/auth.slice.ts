// src/store/authSlice.js
import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { RootState } from "../../store";

// User interface
interface User {
  userId: string;
  name: string;
  email: string,
  role: string,
}

// AuthState interface
interface AuthState {
  user: User | null;
  token: string | null;
}

// Define the initial state with proper type
const initialState: AuthState = {
  user: null,
  token: null,
};

// Create the authSlice
const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    setUser: (state, action: PayloadAction<AuthState>) => {
      const { user, token } = action.payload;
      state.user = user;
      state.token = token;
    },
    logout: (state) => {
      state.user = null;
      state.token = null;
    },
  },
});

// Export actions
export const { setUser, logout } = authSlice.actions;

// Selector to get user from state
export const selectUser = (state: RootState) => state.auth.user;

// Export the reducer
export default authSlice.reducer;
