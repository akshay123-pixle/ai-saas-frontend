// store/bgRemoval.js
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

export const removeBg = createAsyncThunk(
  "data/removeBg",
  async ({ userId, image }, { rejectWithValue }) => {
    try {
      const formData = new FormData();
      formData.append("userId", userId);
      formData.append("image", image);

      const response = await axios.post(
        `${import.meta.env.VITE_BACKEND_API}/ai/remove-background`,
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );

      return response.data;
    } catch (error) {
      return rejectWithValue(error.response?.data || { message: error.message });
    }
  }
);

const bgRemovalSlice = createSlice({
  name: "bgRemoval",
  initialState: {
    bgData: {},
    loading: false,
    error: null,
  },
  extraReducers: (builder) => {
    builder
      .addCase(removeBg.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(removeBg.fulfilled, (state, action) => {
        state.loading = false;
        state.bgData = action.payload;
      })
      .addCase(removeBg.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload?.message || "Failed to remove background";
      });
  },
});

export default bgRemovalSlice.reducer;
