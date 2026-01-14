import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import API from "../../api/api";

// Async Thunks
export const fetchDoctors = createAsyncThunk(
  "doctor/fetchAll",
  async (_, { rejectWithValue }) => {
    try {
      const { data } = await API.get("/doctor");
      return data.doctors;
    } catch (err) {
      return rejectWithValue(err.response?.data?.message || "Failed to fetch doctors");
    }
  }
);

export const getDoctor = createAsyncThunk(
  "doctor/getOne",
  async (id, { rejectWithValue }) => {
    try {
      const { data } = await API.get(`/doctor/${id}`);
      return data.doctor;
    } catch (err) {
      return rejectWithValue(err.response?.data?.message || "Failed to fetch doctor");
    }
  }
);

export const createDoctor = createAsyncThunk(
  "doctor/create",
  async (doctorData, { rejectWithValue }) => {
    try {
      const { data } = await API.post("/doctor", doctorData);
      return data.doctor;
    } catch (err) {
      return rejectWithValue(err.response?.data?.message || "Failed to create doctor");
    }
  }
);

export const updateDoctor = createAsyncThunk(
  "doctor/update",
  async ({ id, doctorData }, { rejectWithValue }) => {
    try {
      const { data } = await API.put(`/doctor/${id}`, doctorData);
      return data.doctor;
    } catch (err) {
      return rejectWithValue(err.response?.data?.message || "Failed to update doctor");
    }
  }
);

export const deleteDoctor = createAsyncThunk(
  "doctor/delete",
  async (id, { rejectWithValue }) => {
    try {
      await API.delete(`/doctor/${id}`);
      return id;
    } catch (err) {
      return rejectWithValue(err.response?.data?.message || "Failed to delete doctor");
    }
  }
);

// Doctor Slice
const doctorSlice = createSlice({
  name: "doctor",
  initialState: {
    doctors: [],
    doctor: null,
    isLoading: false,
    isError: false,
    message: "",
  },
  reducers: {
    resetDoctorState: (state) => {
      state.isLoading = false;
      state.isError = false;
      state.message = "";
      state.doctor = null;
    },
  },
  extraReducers: (builder) => {
    builder
      // Fetch Doctors
      .addCase(fetchDoctors.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(fetchDoctors.fulfilled, (state, action) => {
        state.isLoading = false;
        state.doctors = action.payload;
      })
      .addCase(fetchDoctors.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.message = action.payload;
      })
      // Get Single Doctor
      .addCase(getDoctor.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(getDoctor.fulfilled, (state, action) => {
        state.isLoading = false;
        state.doctor = action.payload;
      })
      .addCase(getDoctor.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.message = action.payload;
      })
      // Create Doctor
      .addCase(createDoctor.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(createDoctor.fulfilled, (state, action) => {
        state.isLoading = false;
        state.doctors.push(action.payload);
      })
      .addCase(createDoctor.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.message = action.payload;
      })
      // Update Doctor
      .addCase(updateDoctor.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(updateDoctor.fulfilled, (state, action) => {
        state.isLoading = false;
        const index = state.doctors.findIndex((d) => d._id === action.payload._id);
        if (index !== -1) {
          state.doctors[index] = action.payload;
        }
        state.doctor = action.payload; // Update the single doctor being edited
      })
      .addCase(updateDoctor.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.message = action.payload;
      })
      // Delete Doctor
      .addCase(deleteDoctor.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(deleteDoctor.fulfilled, (state, action) => {
        state.isLoading = false;
        state.doctors = state.doctors.filter((d) => d._id !== action.payload);
      })
      .addCase(deleteDoctor.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.message = action.payload;
      });
  },
});

export const { resetDoctorState } = doctorSlice.actions;
export default doctorSlice.reducer;