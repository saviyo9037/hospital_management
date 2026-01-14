import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import {
  createDoctorProfile,
  getDoctorProfile,
  updateDoctorProfile,
  resetDoctorProfileState,
} from "../../features/doctorProfile/doctorProfileSlice";
import bgImage from "../../assets/doctor-bg.png";

const DoctorProfileForm = () => {
  const [formData, setFormData] = useState({
    bio: "",
    clinicAddress: "",
    officeHours: "",
    medicalLicense: "",
    specialization: "",
    address: "",
    experience: "",
  });

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { doctorProfile, isLoading, isError, message } = useSelector(
    (state) => state.doctorProfile
  );

  useEffect(() => {
    dispatch(getDoctorProfile());
    return () => {
      dispatch(resetDoctorProfileState());
    };
  }, [dispatch]);

  useEffect(() => {
    if (doctorProfile) {
      setFormData({
        bio: doctorProfile.bio || "",
        clinicAddress: doctorProfile.clinicAddress || "",
        officeHours: doctorProfile.officeHours || "",
        medicalLicense: doctorProfile.medicalLicense || "",
        specialization: doctorProfile.specialization || "",
        address: doctorProfile.address || "",
        experience: doctorProfile.experience || "",
      });
    }
  }, [doctorProfile]);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (doctorProfile) {
      dispatch(updateDoctorProfile(formData));
    } else {
      dispatch(createDoctorProfile(formData));
    }
    navigate("/doctor-profile");
  };

  if (isLoading) {
    return (
      <h2 className="text-center text-xl mt-20 text-white">Loading...</h2>
    );
  }

  if (isError) {
    return (
      <div className="text-center text-xl mt-20 text-red-300">
        <h3>Error: {message}</h3>
        {message === "Doctor not found for this user" && (
          <p className="mt-2 text-white/80">
            Please ask an administrator to create a Doctor entry for your
            account.
          </p>
        )}
      </div>
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
      <div className="relative z-10 w-full max-w-3xl bg-white/20 backdrop-blur-md rounded-2xl shadow-2xl border border-white/30 p-8">
        <h1 className="text-3xl font-bold text-center mb-6 text-white">
          {doctorProfile ? "Edit Doctor Profile" : "Create Doctor Profile"}
        </h1>

        <form onSubmit={handleSubmit} className="space-y-5">
          <FormTextarea
            label="Bio"
            name="bio"
            value={formData.bio}
            onChange={handleChange}
          />

          <FormInput
            label="Clinic Address"
            name="clinicAddress"
            value={formData.clinicAddress}
            onChange={handleChange}
          />

          <FormInput
            label="Office Hours"
            name="officeHours"
            value={formData.officeHours}
            onChange={handleChange}
          />

          <FormInput
            label="Medical License"
            name="medicalLicense"
            value={formData.medicalLicense}
            onChange={handleChange}
          />

          <FormInput
            label="Specialization"
            name="specialization"
            value={formData.specialization}
            onChange={handleChange}
            required
          />

          <FormInput
            label="Address"
            name="address"
            value={formData.address}
            onChange={handleChange}
          />

          <FormInput
            label="Experience (Years)"
            type="number"
            name="experience"
            value={formData.experience}
            onChange={handleChange}
            required
          />

          <button
            type="submit"
            className="w-full bg-blue-600 hover:bg-blue-700 transition text-white font-semibold py-3 rounded-lg shadow-md"
          >
            {doctorProfile
              ? "Update Doctor Profile"
              : "Create Doctor Profile"}
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

export default DoctorProfileForm;
