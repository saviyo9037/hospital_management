import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import API from "../../api/api";

export const fetchBills = createAsyncThunk("billing/fetchAll", async () => {
  const { data } = await API.get("/billing");
  return data.bills;
});

export const createBill = createAsyncThunk("billing/create", async (form) => {
  const { data } = await API.post("/billing", form);
  return data.bill;
});

export const updateBill = createAsyncThunk("billing/update", async ({ id, form }) => {
  const { data } = await API.put(`/billing/${id}`, form);
  return data.bill;
});

export const deleteBill = createAsyncThunk("billing/delete", async (id) => {
  await API.delete(`/billing/${id}`);
  return id;
});

const billingSlice = createSlice({
  name: "billing",
  initialState: { bills: [], loading: false, error: null },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchBills.pending, (state) => { state.loading = true; })
      .addCase(fetchBills.fulfilled, (state, action) => { state.loading = false; state.bills = action.payload; })
      .addCase(createBill.fulfilled, (state, action) => { state.bills.push(action.payload); })
      .addCase(updateBill.fulfilled, (state, action) => {
        const i = state.bills.findIndex(b => b._id === action.payload._id);
        if (i > -1) state.bills[i] = action.payload;
      })
      .addCase(deleteBill.fulfilled, (state, action) => {
        state.bills = state.bills.filter(b => b._id !== action.payload);
      });
  },
});

export default billingSlice.reducer;