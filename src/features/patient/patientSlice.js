import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import API from "../../api/api";

// Async Thunks
export const fetchPatients = createAsyncThunk(
  "patient/fetchAll",
  async (_, { rejectWithValue }) => {
    try {
      const { data } = await API.get("/patient");
      return data.fetch;
    } catch (err) {
      return rejectWithValue(err.response?.data?.message || "Failed to fetch patients");
    }
  }
);

export const getPatient = createAsyncThunk(
  "patient/getOne",
  async (id, { rejectWithValue }) => {
    try {
      const { data } = await API.get(`/patient/${id}`);
      return data.patientfound;
    } catch (err) {
      return rejectWithValue(err.response?.data?.message || "Failed to fetch patient");
    }
  }
);

export const createPatient = createAsyncThunk(
  "patient/create",
  async (patientData, { rejectWithValue }) => {
    try {
      const { data } = await API.post("/patient", patientData);
      return data.patient;
    } catch (err) {
      return rejectWithValue(err.response?.data?.message || "Failed to create patient");
    }
  }
);

export const updatePatient = createAsyncThunk(
  "patient/update",
  async ({ id, patientData }, { rejectWithValue }) => {
    try {
      const { data } = await API.put(`/patient/${id}`, patientData);
      return data.patient;
    } catch (err) {
      return rejectWithValue(err.response?.data?.message || "Failed to update patient");
    }
  }
);

export const deletePatient = createAsyncThunk(
  "patient/delete",
  async (id, { rejectWithValue }) => {
    try {
      await API.delete(`/patient/${id}`);
      return id;
    } catch (err) {
      return rejectWithValue(err.response?.data?.message || "Failed to delete patient");
    }
  }
);

// Patient Slice
const patientSlice = createSlice({
  name: "patient",
  initialState: {
    patients: [],
    patient: null,
    isLoading: false,
    isError: false,
    message: "",
  },
  reducers: {
    resetPatientState: (state) => {
      state.isLoading = false;
      state.isError = false;
      state.message = "";
      state.patient = null;
    },
  },
  extraReducers: (builder) => {
    builder
      // Fetch Patients
      .addCase(fetchPatients.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(fetchPatients.fulfilled, (state, action) => {
        state.isLoading = false;
        state.patients = action.payload;
      })
      .addCase(fetchPatients.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.message = action.payload;
      })
      // Get Single Patient
      .addCase(getPatient.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(getPatient.fulfilled, (state, action) => {
        state.isLoading = false;
        state.patient = action.payload;
      })
      .addCase(getPatient.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.message = action.payload;
      })
      // Create Patient
      .addCase(createPatient.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(createPatient.fulfilled, (state, action) => {
        state.isLoading = false;
        state.patients.push(action.payload);
      })
      .addCase(createPatient.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.message = action.payload;
      })
      // Update Patient
      .addCase(updatePatient.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(updatePatient.fulfilled, (state, action) => {
        state.isLoading = false;
        const index = state.patients.findIndex((p) => p._id === action.payload._id);
        if (index !== -1) {
          state.patients[index] = action.payload;
        }
        state.patient = action.payload; // Update the single patient being edited
      })
      .addCase(updatePatient.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.message = action.payload;
      })
      // Delete Patient
      .addCase(deletePatient.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(deletePatient.fulfilled, (state, action) => {
        state.isLoading = false;
        state.patients = state.patients.filter((p) => p._id !== action.payload);
      })
      .addCase(deletePatient.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.message = action.payload;
      });
  },
});

export const { resetPatientState } = patientSlice.actions;
export default patientSlice.reducer;
