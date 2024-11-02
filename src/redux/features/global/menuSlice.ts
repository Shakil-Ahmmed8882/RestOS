// src/store/menuSlice.js
import { createSlice } from '@reduxjs/toolkit';

const menuSlice = createSlice({
  name: 'menu',
  initialState: {
    dashboardMenuOpen: false,
  },
  reducers: {
    toggleMenu: (state) => {
      state.dashboardMenuOpen = !state.dashboardMenuOpen;
    },
    openMenu: (state) => {
      state.dashboardMenuOpen = true;
    },
    closeMenu: (state) => {
      state.dashboardMenuOpen = false;
    },
  },
});

export const { toggleMenu, openMenu, closeMenu } = menuSlice.actions;
export default menuSlice.reducer;
