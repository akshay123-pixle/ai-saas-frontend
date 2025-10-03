import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

// Async thunk to get payment link
export const fetchPaymentLink = createAsyncThunk(
  "payment/fetchPaymentLink",
  async ({ userId }) => {
    const response = await axios.post(
      `${import.meta.env.VITE_PRODUCTION_API}/api/payment/create`,
      {
        unit_amount: 1000,
        serviceType: "Premium",
        userId,
      }
    );
    return response.data.url;
  }
);

const initialState = {
  payment: [],
  paymentLink: null,
  loading: false,
  error: null,
};

const paymentSlice = createSlice({
  name: "payment",
  initialState,
  reducers: {
    makePayment: (state, action) => {
      state.payment = action.payload;
    },
    clearPaymentLink: (state) => {
    state.paymentLink = null;
  },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchPaymentLink.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchPaymentLink.fulfilled, (state, action) => {
        state.loading = false;
        state.paymentLink = action.payload;
      })
      .addCase(fetchPaymentLink.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      });
  },
});

export const { makePayment } = paymentSlice.actions;
export default paymentSlice.reducer;
