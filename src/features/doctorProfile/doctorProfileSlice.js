import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import API from "../../api/api";

// Async Thunks
export const createDoctorProfile = createAsyncThunk(
  "doctorProfile/create",
  async (profileData, { rejectWithValue }) => {
    try {
      const { data } = await API.post("/doctor-profile", profileData);
      return data.doctorProfile;
    } catch (err) {
      return rejectWithValue(err.response?.data?.message || "Failed to create doctor profile");
    }
  }
);

export const getDoctorProfile = createAsyncThunk(
  "doctorProfile/getOne",
  async (_, { rejectWithValue }) => {
    try {
      const { data } = await API.get("/doctor-profile");
      return data.doctorProfile;
    } catch (err) {
      return rejectWithValue(err.response?.data?.message || "Failed to fetch doctor profile");
    }
  }
);

export const updateDoctorProfile = createAsyncThunk(
  "doctorProfile/update",
  async (profileData, { rejectWithValue }) => {
    try {
      const { data } = await API.put("/doctor-profile", profileData);
      return data.doctorProfile;
    } catch (err) {
      return rejectWithValue(err.response?.data?.message || "Failed to update doctor profile");
    }
  }
);

export const deleteDoctorProfile = createAsyncThunk(
  "doctorProfile/delete",
  async (_, { rejectWithValue }) => {
    try {
      await API.delete("/doctor-profile");
      return true;
    } catch (err) {
      return rejectWithValue(err.response?.data?.message || "Failed to delete doctor profile");
    }
  }
);

// Doctor Profile Slice
const doctorProfileSlice = createSlice({
  name: "doctorProfile",
  initialState: {
    doctorProfile: null,
    isLoading: false,
    isError: false,
    message: "",
  },
  reducers: {
    resetDoctorProfileState: (state) => {
      state.isLoading = false;
      state.isError = false;
      state.message = "";
      state.doctorProfile = null;
    },
  },
  extraReducers: (builder) => {
    builder
      // Create Doctor Profile
      .addCase(createDoctorProfile.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(createDoctorProfile.fulfilled, (state, action) => {
        state.isLoading = false;
        state.doctorProfile = action.payload;
      })
      .addCase(createDoctorProfile.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.message = action.payload;
      })
      // Get Doctor Profile
      .addCase(getDoctorProfile.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(getDoctorProfile.fulfilled, (state, action) => {
        state.isLoading = false;
        state.doctorProfile = action.payload;
      })
      .addCase(getDoctorProfile.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.message = action.payload;
      })
      // Update Doctor Profile
      .addCase(updateDoctorProfile.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(updateDoctorProfile.fulfilled, (state, action) => {
        state.isLoading = false;
        state.doctorProfile = action.payload;
      })
      .addCase(updateDoctorProfile.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.message = action.payload;
      })
      // Delete Doctor Profile
      .addCase(deleteDoctorProfile.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(deleteDoctorProfile.fulfilled, (state) => {
        state.isLoading = false;
        state.doctorProfile = null;
      })
      .addCase(deleteDoctorProfile.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.message = action.payload;
      });
  },
});

export const { resetDoctorProfileState } = doctorProfileSlice.actions;
export default doctorProfileSlice.reducer;