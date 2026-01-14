import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import {
  createPatientProfile,
  getPatientProfile,
  updatePatientProfile,
  resetPatientProfileState,
} from "../../features/patientProfile/patientProfileSlice";
import bgImage from "../../assets/patient-bg.png";

const PatientProfileForm = () => {
  const [formData, setFormData] = useState({
    bio: "",
    medicalHistory: "",
    allergies: "",
    emergencyContact: {
      name: "",
      phone: "",
    },
  });

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { patientProfile, isLoading, isError, message } = useSelector(
    (state) => state.patientProfile
  );

  useEffect(() => {
    dispatch(getPatientProfile());
    return () => {
      dispatch(resetPatientProfileState());
    };
  }, [dispatch]);

  useEffect(() => {
    if (patientProfile) {
      setFormData({
        bio: patientProfile.bio || "",
        medicalHistory: patientProfile.medicalHistory || "",
        allergies: patientProfile.allergies || "",
        emergencyContact: {
          name: patientProfile.emergencyContact?.name || "",
          phone: patientProfile.emergencyContact?.phone || "",
        },
      });
    }
  }, [patientProfile]);

  const handleChange = (e) => {
    if (e.target.name.startsWith("emergencyContact.")) {
      const field = e.target.name.split(".")[1];
      setFormData({
        ...formData,
        emergencyContact: {
          ...formData.emergencyContact,
          [field]: e.target.value,
        },
      });
    } else {
      setFormData({
        ...formData,
        [e.target.name]: e.target.value,
      });
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (patientProfile) {
      dispatch(updatePatientProfile(formData));
    } else {
      dispatch(createPatientProfile(formData));
    }
    navigate("/patient-profile");
  };

  if (isLoading) {
    return (
      <h2 className="text-center text-xl mt-20 text-white">Loading...</h2>
    );
  }

  if (isError) {
    return (
      <h3 className="text-center text-xl mt-20 text-red-300">
        Error: {message}
      </h3>
    );
  }

  return (
    <div
      className="relative min-h-screen flex items-center justify-center px-4 bg-cover bg-center"
      style={{ backgroundImage: `url(${bgImage})` }}
    >
      {/* Overlay */}
      <div className="absolute inset-0 bg-black/40"></div>

      {/* Card */}
      <div className="relative z-10 w-full max-w-2xl bg-white/20 backdrop-blur-md rounded-2xl shadow-2xl border border-white/30 p-8">
        <h1 className="text-3xl font-bold text-center mb-6 text-white">
          {patientProfile ? "Edit Patient Profile" : "Create Patient Profile"}
        </h1>

        <form onSubmit={handleSubmit} className="space-y-5">
          <FormTextarea
            label="Bio"
            name="bio"
            value={formData.bio}
            onChange={handleChange}
          />

          <FormTextarea
            label="Medical History"
            name="medicalHistory"
            value={formData.medicalHistory}
            onChange={handleChange}
          />

          <FormInput
            label="Allergies"
            name="allergies"
            value={formData.allergies}
            onChange={handleChange}
          />

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <FormInput
              label="Emergency Contact Name"
              name="emergencyContact.name"
              value={formData.emergencyContact.name}
              onChange={handleChange}
            />
            <FormInput
              label="Emergency Contact Phone"
              name="emergencyContact.phone"
              value={formData.emergencyContact.phone}
              onChange={handleChange}
            />
          </div>

          <button
            type="submit"
            className="w-full bg-blue-600 hover:bg-blue-700 transition text-white font-semibold py-3 rounded-lg shadow-md"
          >
            {patientProfile
              ? "Update Patient Profile"
              : "Create Patient Profile"}
          </button>
        </form>
      </div>
    </div>
  );
};

/* Reusable Inputs */
const FormInput = ({ label, ...props }) => (
  <div>
    <label className="block text-white/90 mb-1 text-sm font-medium">
      {label}
    </label>
    <input
      {...props}
      className="w-full p-3 rounded-lg bg-white text-gray-900 focus:ring-2 focus:ring-blue-400 outline-none"
    />
  </div>
);

const FormTextarea = ({ label, ...props }) => (
  <div>
    <label className="block text-white/90 mb-1 text-sm font-medium">
      {label}
    </label>
    <textarea
      {...props}
      rows="4"
      className="w-full p-3 rounded-lg bg-white text-gray-900 focus:ring-2 focus:ring-blue-400 outline-none"
    />
  </div>
);

export default PatientProfileForm;
