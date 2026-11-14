
import { configureStore } from "@reduxjs/toolkit";
import favoriteReducer from "../features/favoriteSlice";

// Load previously saved favorites
let savedFavorites = [];

try {
  const storedData = localStorage.getItem("favorites");

  if (storedData) {
    savedFavorites = JSON.parse(storedData);
  }
} catch (error) {
  console.error("Error loading favorites:", error);
}

// Create Redux store
const store = configureStore({
  reducer: {
    favorites: favoriteReducer,
  },

  preloadedState: {
    favorites: savedFavorites,
  },
});

// Automatically save favorites whenever they change
store.subscribe(() => {
  localStorage.setItem(
    "favorites",
    JSON.stringify(store.getState().favorites)
  );
});

export default store;
