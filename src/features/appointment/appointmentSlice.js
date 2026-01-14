import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import API from "../../api/api";

// Async Thunks
export const fetchAppointments = createAsyncThunk(
  "appointment/fetchAll",
  async ({ userId, userRole }, { rejectWithValue }) => {
    try {
      let url = "/appointment";
      if (userRole === "doctor") {
        url += `?doctor=${userId}`;
      } else if (userRole === "patient") {
        url += `?patient=${userId}`;
      }
      const { data } = await API.get(url);
      return data.appointments;
    } catch (err) {
      return rejectWithValue(err.response?.data?.message || "Failed to fetch appointments");
    }
  }
);

export const getAppointment = createAsyncThunk(
  "appointment/getOne",
  async (id, { rejectWithValue }) => {
    try {
      const { data } = await API.get(`/appointment/${id}`);
      return data.appointment;
    } catch (err) {
      return rejectWithValue(err.response?.data?.message || "Failed to fetch appointment");
    }
  }
);

export const createAppointment = createAsyncThunk(
  "appointment/create",
  async (appointmentData, { rejectWithValue }) => {
    try {
      const { data } = await API.post("/appointment", appointmentData);
      return data.newappointments;
    } catch (err) {
      return rejectWithValue(err.response?.data?.message || "Failed to create appointment");
    }
  }
);

export const updateAppointment = createAsyncThunk(
  "appointment/update",
  async ({ id, appointmentData }, { rejectWithValue }) => {
    try {
      const { data } = await API.put(`/appointment/${id}`, appointmentData);
      return data.appointment;
    } catch (err) {
      return rejectWithValue(err.response?.data?.message || "Failed to update appointment");
    }
  }
);

export const deleteAppointment = createAsyncThunk(
  "appointment/delete",
  async (id, { rejectWithValue }) => {
    try {
      await API.delete(`/appointment/${id}`);
      return id;
    } catch (err) {
      return rejectWithValue(err.response?.data?.message || "Failed to delete appointment");
    }
  }
);

// Appointment Slice
const appointmentSlice = createSlice({
  name: "appointment",
  initialState: {
    appointments: [],
    appointment: null,
    isLoading: false,
    isError: false,
    message: "",
  },
  reducers: {
    resetAppointmentState: (state) => {
      state.isLoading = false;
      state.isError = false;
      state.message = "";
      state.appointment = null;
    },
  },
  extraReducers: (builder) => {
    builder
      // Fetch Appointments
      .addCase(fetchAppointments.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(fetchAppointments.fulfilled, (state, action) => {
        state.isLoading = false;
        state.appointments = action.payload;
      })
      .addCase(fetchAppointments.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.message = action.payload;
      })
      // Get Single Appointment
      .addCase(getAppointment.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(getAppointment.fulfilled, (state, action) => {
        state.isLoading = false;
        state.appointment = action.payload;
      })
      .addCase(getAppointment.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.message = action.payload;
      })
      // Create Appointment
      .addCase(createAppointment.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(createAppointment.fulfilled, (state, action) => {
        state.isLoading = false;
        state.appointments.push(action.payload);
      })
      .addCase(createAppointment.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.message = action.payload;
      })
      // Update Appointment
      .addCase(updateAppointment.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(updateAppointment.fulfilled, (state, action) => {
        state.isLoading = false;
        const index = state.appointments.findIndex((a) => a._id === action.payload._id);
        if (index !== -1) {
          state.appointments[index] = action.payload;
        }
        state.appointment = action.payload; // Update the single appointment being edited
      })
      .addCase(updateAppointment.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.message = action.payload;
      })
      // Delete Appointment
      .addCase(deleteAppointment.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(deleteAppointment.fulfilled, (state, action) => {
        state.isLoading = false;
        state.appointments = state.appointments.filter((a) => a._id !== action.payload);
      })
      .addCase(deleteAppointment.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.message = action.payload;
      });
  },
});

export const { resetAppointmentState } = appointmentSlice.actions;
export default appointmentSlice.reducer;
