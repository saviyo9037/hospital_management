import { configureStore } from "@reduxjs/toolkit";
import authReducer from "../features/auth/authSlice";
import patientReducer from "../features/patient/patientSlice";
import doctorReducer from "../features/doctor/doctorSlice";
import appointmentReducer from "../features/appointment/appointmentSlice";
import billingReducer from "../features/billing/billingSlice";
import doctorProfileReducer from "../features/doctorProfile/doctorProfileSlice";
import patientProfileReducer from "../features/patientProfile/patientProfileSlice";

export const store = configureStore({
  reducer: {
    auth: authReducer,
    patient: patientReducer,
    doctor: doctorReducer,
    appointment: appointmentReducer,
    billing: billingReducer,
    doctorProfile: doctorProfileReducer,
    patientProfile: patientProfileReducer,
  },
});