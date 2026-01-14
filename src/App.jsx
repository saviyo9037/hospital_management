import { BrowserRouter, Routes, Route } from "react-router-dom";
import { Provider } from "react-redux";
import { store } from "./store/store";
import { Navbar } from "./components/Navbar";
import { ProtectedRoute } from "./components/ProtectedRoute";

// Pages
import AuthPage from "./pages/AuthPage";
import { Dashboard } from "./pages/Dashboard";
import Home from "./pages/Home";
import { PatientForm } from "./pages/Patient/PatientForm";
import { DoctorList } from "./pages/Doctor/DoctorList";
import { DoctorForm } from "./pages/Doctor/DoctorForm";
import { AppointmentList } from "./pages/Appointment/AppointmentList";
import AppointmentForm from "./pages/Appointment/AppointmentForm";
import { BillingList } from "./pages/Billing/BillingList";
import { PatientList } from "./pages/Patient/PatientList";
import BillingForm from "./pages/Billing/BillingForm";
import DoctorProfilePage from "./pages/DoctorProfile/DoctorProfilePage";
import DoctorProfileForm from "./pages/DoctorProfile/DoctorProfileForm";
import PatientProfilePage from "./pages/PatientProfile/PatientProfilePage";
import PatientProfileForm from "./pages/PatientProfile/PatientProfileForm";

function App() {
  return (
    <Provider store={store}>
      <BrowserRouter>
        <Navbar />
        <div className="min-h-screen bg-background">
          <Routes>
          <Route path="/auth" element={<AuthPage />} />
          <Route path="/" element={<Home />} />

          <Route element={<ProtectedRoute />}>
            <Route path="/dashboard" element={<Dashboard />} />

            {/* Patient */}
            <Route path="/patient" element={<PatientList />} />
            <Route path="/patient/create" element={<PatientForm />} />
            <Route path="/patient/edit/:id" element={<PatientForm />} />

            {/* Doctor */}
            <Route path="/doctor" element={<DoctorList />} />
            <Route path="/doctor/create" element={<DoctorForm />} />
            <Route path="/doctor/edit/:id" element={<DoctorForm />} />

            {/* Appointment */}
            <Route element={<ProtectedRoute allowedRoles={['patient']} />}>
              <Route path="/appointment" element={<AppointmentList/>} />
              <Route path="/appointment/create" element={<AppointmentForm/>} />
              <Route path="/appointment/edit/:id" element={<AppointmentForm />} />
            </Route>

            {/* Billing */}
            <Route element={<ProtectedRoute allowedRoles={['patient']} />}>
              <Route path="/billing" element={<BillingList />} />
              <Route path="/billing/create" element={<BillingForm/>} />
            </Route>

            {/* Doctor Profile */}
            <Route path="/doctor-profile" element={<DoctorProfilePage />} />
            <Route path="/doctor-profile/create" element={<DoctorProfileForm />} />
            <Route path="/doctor-profile/edit" element={<DoctorProfileForm />} />

            {/* Patient Profile */}
            <Route element={<ProtectedRoute allowedRoles={['patient']} />}>
              <Route path="/patient-profile" element={<PatientProfilePage />} />
              <Route path="/patient-profile/create" element={<PatientProfileForm />} />
              <Route path="/patient-profile/edit" element={<PatientProfileForm />} />
            </Route>
          </Route>

          <Route path="*" element={<div className="p-10 text-center text-2xl">404 - Not Found</div>} />
        </Routes>
        </div>
      </BrowserRouter>
    </Provider>
  );
}

export default App;