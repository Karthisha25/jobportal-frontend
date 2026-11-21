
import { createSlice } from "@reduxjs/toolkit";

const getJobId = (job) => job?._id || job?.id;

const favoriteSlice = createSlice({
  name: "favorites",
  initialState: [],
  reducers: {
    addFavorite: (state, action) => {
      const newJob = action.payload;
      const newId = getJobId(newJob);

      const exists = state.some(
        (job) => getJobId(job) === newId
      );

      if (!exists) {
        state.push(newJob);
      }
    },

    removeFavorite: (state, action) => {
      return state.filter(
        (job) => getJobId(job) !== action.payload
      );
    },

    toggleFavorite: (state, action) => {
      const newJob = action.payload;
      const newId = getJobId(newJob);

      const exists = state.some(
        (job) => getJobId(job) === newId
      );

      if (exists) {
        return state.filter(
          (job) => getJobId(job) !== newId
        );
      }

      state.push(newJob);
    }
  }
});

export const {
  addFavorite,
  removeFavorite,
  toggleFavorite
} = favoriteSlice.actions;

export default favoriteSlice.reducer;
