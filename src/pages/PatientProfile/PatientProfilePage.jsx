import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { getPatientProfile } from "../../features/patientProfile/patientProfileSlice";
import bgImage from "../../assets/patient-profile-bg.png";

const PatientProfilePage = () => {
  const dispatch = useDispatch();
  const { patientProfile, isLoading, isError, message } = useSelector(
    (state) => state.patientProfile
  );

  useEffect(() => {
    dispatch(getPatientProfile());
  }, [dispatch]);

  if (isLoading) {
    return (
      <h2 className="text-center text-xl mt-20 text-white">
        Loading Patient Profile...
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
          Patient Profile
        </h1>

        {patientProfile ? (
          <div className="bg-white/20 backdrop-blur-md p-8 rounded-2xl shadow-2xl border border-white/30">
            <ProfileItem
              label="Name"
              value={patientProfile.patient.user?.name}
            />
            <ProfileItem
              label="Email"
              value={patientProfile.patient.user?.email}
            />
            <ProfileItem
              label="Age"
              value={patientProfile.patient.age}
            />
            <ProfileItem
              label="Gender"
              value={patientProfile.patient.gender}
            />
            <ProfileItem
              label="Phone"
              value={patientProfile.patient.Number}
            />

            {patientProfile.bio && (
              <ProfileItem label="Bio" value={patientProfile.bio} />
            )}

            {patientProfile.medicalHistory && (
              <ProfileItem
                label="Medical History"
                value={patientProfile.medicalHistory}
              />
            )}

            {patientProfile.allergies && (
              <ProfileItem
                label="Allergies"
                value={patientProfile.allergies}
              />
            )}

            {patientProfile.emergencyContact?.name && (
              <ProfileItem
                label="Emergency Contact"
                value={`${patientProfile.emergencyContact.name} (${patientProfile.emergencyContact.phone})`}
              />
            )}

            <Link
              to="/patient-profile/edit"
              className="block w-full text-center mt-6 bg-blue-600 hover:bg-blue-700 transition text-white font-semibold py-3 rounded-lg shadow-md"
            >
              Edit Profile
            </Link>
          </div>
        ) : (
          <div className="bg-white/20 backdrop-blur-md p-8 rounded-2xl shadow-2xl border border-white/30 text-center">
            <p className="text-xl mb-6 text-white">
              No patient profile found.
            </p>
            <Link
              to="/patient-profile/create"
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

/* Reusable Profile Row */
const ProfileItem = ({ label, value }) => (
  <div className="mb-4">
    <p className="text-white/80 font-semibold">{label}:</p>
    <p className="text-white text-lg">{value}</p>
  </div>
);

export default PatientProfilePage;
