import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import API from "../../api/api";

// Async Thunks
export const createPatientProfile = createAsyncThunk(
  "patientProfile/create",
  async (profileData, { rejectWithValue }) => {
    try {
      const { data } = await API.post("/patient-profile", profileData);
      return data.patientProfile;
    } catch (err) {
      return rejectWithValue(err.response?.data?.message || "Failed to create patient profile");
    }
  }
);

export const getPatientProfile = createAsyncThunk(
  "patientProfile/getOne",
  async (_, { rejectWithValue }) => {
    try {
      const { data } = await API.get("/patient-profile");
      return data.patientProfile;
    } catch (err) {
      return rejectWithValue(err.response?.data?.message || "Failed to fetch patient profile");
    }
  }
);

export const updatePatientProfile = createAsyncThunk(
  "patientProfile/update",
  async (profileData, { rejectWithValue }) => {
    try {
      const { data } = await API.put("/patient-profile", profileData);
      return data.patientProfile;
    } catch (err) {
      return rejectWithValue(err.response?.data?.message || "Failed to update patient profile");
    }
  }
);

export const deletePatientProfile = createAsyncThunk(
  "patientProfile/delete",
  async (_, { rejectWithValue }) => {
    try {
      await API.delete("/patient-profile");
      return true;
    } catch (err) {
      return rejectWithValue(err.response?.data?.message || "Failed to delete patient profile");
    }
  }
);

// Patient Profile Slice
const patientProfileSlice = createSlice({
  name: "patientProfile",
  initialState: {
    patientProfile: null,
    isLoading: false,
    isError: false,
    message: "",
  },
  reducers: {
    resetPatientProfileState: (state) => {
      state.isLoading = false;
      state.isError = false;
      state.message = "";
      state.patientProfile = null;
    },
  },
  extraReducers: (builder) => {
    builder
      // Create Patient Profile
      .addCase(createPatientProfile.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(createPatientProfile.fulfilled, (state, action) => {
        state.isLoading = false;
        state.patientProfile = action.payload;
      })
      .addCase(createPatientProfile.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.message = action.payload;
      })
      // Get Patient Profile
      .addCase(getPatientProfile.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(getPatientProfile.fulfilled, (state, action) => {
        state.isLoading = false;
        state.patientProfile = action.payload;
      })
      .addCase(getPatientProfile.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.message = action.payload;
      })
      // Update Patient Profile
      .addCase(updatePatientProfile.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(updatePatientProfile.fulfilled, (state, action) => {
        state.isLoading = false;
        state.patientProfile = action.payload;
      })
      .addCase(updatePatientProfile.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.message = action.payload;
      })
      // Delete Patient Profile
      .addCase(deletePatientProfile.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(deletePatientProfile.fulfilled, (state) => {
        state.isLoading = false;
        state.patientProfile = null;
      })
      .addCase(deletePatientProfile.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.message = action.payload;
      });
  },
});

export const { resetPatientProfileState } = patientProfileSlice.actions;
export default patientProfileSlice.reducer;
