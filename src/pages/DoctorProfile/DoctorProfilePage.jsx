import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { getDoctorProfile } from "../../features/doctorProfile/doctorProfileSlice";
import bgImage from "../../assets/doctor-bg.png";

const DoctorProfilePage = () => {
  const dispatch = useDispatch();
  const { doctorProfile, isLoading, isError, message } = useSelector(
    (state) => state.doctorProfile
  );

  useEffect(() => {
    dispatch(getDoctorProfile());
  }, [dispatch]);

  if (isLoading) {
    return (
      <h2 className="text-center text-xl mt-20 text-white">
        Loading Doctor Profile...
      </h2>
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

      {/* Content */}
      <div className="relative z-10 w-full max-w-xl">
        <h1 className="text-3xl font-bold mb-6 text-center text-white">
          Doctor Profile
        </h1>

        {doctorProfile ? (
          <div className="bg-white/20 backdrop-blur-md p-8 rounded-2xl shadow-2xl border border-white/30">
            <ProfileItem
              label="Name"
              value={doctorProfile.doctor.user.name}
            />
            <ProfileItem
              label="Email"
              value={doctorProfile.doctor.user.email}
            />

            {doctorProfile.specialization && (
              <ProfileItem
                label="Specialization"
                value={doctorProfile.specialization}
              />
            )}

            {doctorProfile.address && (
              <ProfileItem
                label="Address"
                value={doctorProfile.address}
              />
            )}

            {doctorProfile.experience && (
              <ProfileItem
                label="Experience"
                value={`${doctorProfile.experience} years`}
              />
            )}

            {doctorProfile.bio && (
              <ProfileItem label="Bio" value={doctorProfile.bio} />
            )}

            {doctorProfile.clinicAddress && (
              <ProfileItem
                label="Clinic Address"
                value={doctorProfile.clinicAddress}
              />
            )}

            {doctorProfile.officeHours && (
              <ProfileItem
                label="Office Hours"
                value={doctorProfile.officeHours}
              />
            )}

            {doctorProfile.medicalLicense && (
              <ProfileItem
                label="Medical License"
                value={doctorProfile.medicalLicense}
              />
            )}

            <Link
              to="/doctor-profile/edit"
              className="block w-full text-center mt-6 bg-blue-600 hover:bg-blue-700 transition text-white font-semibold py-3 rounded-lg shadow-md"
            >
              Edit Profile
            </Link>
          </div>
        ) : (
          <div className="bg-white/20 backdrop-blur-md p-8 rounded-2xl shadow-2xl border border-white/30 text-center">
            <p className="text-xl mb-6 text-white">
              No doctor profile found.
            </p>
            <Link
              to="/doctor-profile/create"
              className="bg-green-600 hover:bg-green-700 text-white font-semibold py-3 px-6 rounded-lg shadow-md"
            >
              Create Profile
            </Link>
          </div>
        )}
      </div>
    </div>
  );
};

/* Reusable profile row */
const ProfileItem = ({ label, value }) => (
  <div className="mb-4">
    <p className="text-white/80 font-semibold">{label}:</p>
    <p className="text-white text-lg">{value}</p>
  </div>
);

export default DoctorProfilePage;
