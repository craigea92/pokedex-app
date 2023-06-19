import { createSlice } from "@reduxjs/toolkit";
import { AppTypeInitialState } from "../../utils/Types";
import { pokemonTabs } from "../../utils/Constants";

// Define the initial state for the app slice
const initialState: AppTypeInitialState = {
  toasts: [],
  userInfo: undefined,
  currentPokemonTab: pokemonTabs.description,
};

// Create a slice for the app
export const AppSlice = createSlice({
  name: "app",
  initialState,
  reducers: {
    // Reducer for setting a toast message
    setToast: (state, action) => {
      const toasts = [...state.toasts];
      toasts.push(action.payload);
      state.toasts = toasts;
    },
    // Reducer for clearing all toasts
    clearToasts: (state) => {
      state.toasts = [];
    },
    // Reducer for setting the user status
    setUserStatus: (state, action) => {
      state.userInfo = action.payload;
    },
    // Reducer for setting the current Pokemon tab
    setPokemonTab: (state, action) => {
      state.currentPokemonTab=action.payload;
    }
  },
});

// Extract the action creators from the app slice
export const { setToast, clearToasts, setUserStatus, setPokemonTab } = AppSlice.actions;
