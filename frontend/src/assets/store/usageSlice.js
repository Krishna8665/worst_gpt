import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

export const fetchUsage = createAsyncThunk("usage/fetchUsage", async (_, thunkAPI) => {
  try {
    const token = localStorage.getItem("authToken");
    const res = await axios.get("/api/usage", {
      headers: { Authorization: `Bearer ${token}` },
    });
    return res.data;
  } catch (err) {
    return thunkAPI.rejectWithValue(err.response?.data?.message || "Error fetching usage");
  }
});

const usageSlice = createSlice({
  name: "usage",
  initialState: {
    credits: 0,
    isPremium: false,
    status: "idle",
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchUsage.pending, (state) => {
        state.status = "loading";
      })
      .addCase(fetchUsage.fulfilled, (state, action) => {
        state.credits = action.payload.credits;
        state.isPremium = action.payload.isPremium;
        state.status = "succeeded";
      })
      .addCase(fetchUsage.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.payload;
      });
  },
});

export default usageSlice.reducer;
