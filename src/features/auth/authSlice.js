import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import API from "../../api/api";

export const login = createAsyncThunk("auth/login", async ({ email, password }, { rejectWithValue }) => {
  try {
    const { data } = await API.post("/auth/login", { email, password });
    localStorage.setItem("token", data.token);
    const payload = JSON.parse(atob(data.token.split(".")[1]));
    return { id: payload.id, email: payload.email, role: payload.role };
  } catch (err) {
    return rejectWithValue(err.response?.data?.message || "Login failed");
  }
});

export const register = createAsyncThunk("auth/register", async (form, { rejectWithValue }) => {
  try {
    const { data } = await API.post("/auth/register", form);
    localStorage.setItem("token", data.token);
    const payload = JSON.parse(atob(data.token.split(".")[1]));
    return { id: payload.id, email: payload.email, role: payload.role };
  } catch (err) {
    return rejectWithValue(err.response?.data?.message || "Register failed");
  }
});

const authSlice = createSlice({
  name: "auth",
  initialState: { user: null, loading: false, error: null },
  reducers: {
    logout: (state) => {
      localStorage.removeItem("token");
      state.user = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(login.pending, (state) => { state.loading = true; state.error = null; })
      .addCase(login.fulfilled, (state, action) => { state.loading = false; state.user = action.payload; })
      .addCase(login.rejected, (state, action) => { state.loading = false; state.error = action.payload; })
      .addCase(register.pending, (state) => { state.loading = true; state.error = null; })
      .addCase(register.fulfilled, (state, action) => { state.loading = false; state.user = action.payload; })
      .addCase(register.rejected, (state, action) => { state.loading = false; state.error = action.payload; });
  },
});

export const { logout } = authSlice.actions;
export default authSlice.reducer;