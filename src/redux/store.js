import { configureStore, createSlice } from "@reduxjs/toolkit";
import { fetchJobs } from "../utils/apis/fetchJobs";

const initialState = {
  jdList: [],
  totalCount: 0,
};

const jdSlice = createSlice({
  name: "jobDescriptions",
  initialState,
  reducers: {
    addJD: (state, action) => {
      state.jdList = action.payload;
    },
    updateTotalCount: (state, action) => {
      state.totalCount = action.payload;
    },
    filterByExperience: (state, action) => {
      console.log(action.payload);
      state.jdList = state.jdList.filter((jd) => jd.minExp === action.payload);
    },
  },
});

export const { addJD, updateTotalCount, filterByExperience } = jdSlice.actions;

export default configureStore({
  reducer: jdSlice.reducer,
});
