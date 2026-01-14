import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { login, register } from "../features/auth/authSlice";
import { useNavigate } from "react-router-dom";
import { getDoctorProfile } from "../features/doctorProfile/doctorProfileSlice";
import { getPatientProfile } from "../features/patientProfile/patientProfileSlice";
import bgImage from "../assets/auth.png";

const AuthPage = () => {
  const [isLogin, setIsLogin] = useState(true);
  const [form, setForm] = useState({
    name: "",
    email: "",
    password: "",
    role: "",
  });

  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { loading, error } = useSelector((state) => state.auth);

  const handleSubmit = async (e) => {
    e.preventDefault();

    const actionResult = await (isLogin
      ? dispatch(login({ email: form.email, password: form.password }))
      : dispatch(register(form)));

    if (!actionResult.error) {
      const user = actionResult.payload;

      if (user?.role === "doctor") {
        const res = await dispatch(getDoctorProfile());
        if (res.error) navigate("/doctor-profile/create");
      }

      if (user?.role === "patient") {
        const res = await dispatch(getPatientProfile());
        if (res.error) navigate("/patient-profile/create");
      }

      navigate("/dashboard");
    }
  };

  return (
    <div
      className="relative min-h-screen flex items-center justify-center p-4 bg-cover bg-center"
      style={{ backgroundImage: `url(${bgImage})` }}
    >
      {/* Overlay */}
      <div className="absolute inset-0 bg-black/40"></div>

      {/* Card */}
      <div className="relative z-10 w-full max-w-md rounded-2xl bg-white/20 backdrop-blur-md p-8 shadow-2xl border border-white/30">
        <h2 className="text-3xl font-bold text-center mb-6 text-white">
          {isLogin ? "Login" : "Register"}
        </h2>

        {error && (
          <p className="text-red-200 text-center mb-4 bg-red-700/60 p-2 rounded-md">
            {error}
          </p>
        )}

        <form onSubmit={handleSubmit} className="space-y-5">
          {!isLogin && (
            <>
              <input
                placeholder="Full Name"
                required
                className="w-full p-3 rounded-lg bg-white text-black focus:ring-2 focus:ring-blue-300 outline-none"
                value={form.name}
                onChange={(e) =>
                  setForm({ ...form, name: e.target.value })
                }
              />

              <select
                required
                className="w-full p-3 rounded-lg bg-white text-black focus:ring-2 focus:ring-blue-300 outline-none"
                value={form.role}
                onChange={(e) =>
                  setForm({ ...form, role: e.target.value })
                }
              >
                <option value="">Select Role</option>
                <option value="patient">Patient</option>
                <option value="doctor">Doctor</option>
              </select>
            </>
          )}

          <input
            type="email"
            placeholder="Email"
            required
            className="w-full p-3 rounded-lg bg-white text-black focus:ring-2 focus:ring-blue-300 outline-none"
            value={form.email}
            onChange={(e) =>
              setForm({ ...form, email: e.target.value })
            }
            autoComplete="email"
          />

          <input
            type="password"
            placeholder="Password"
            required
            className="w-full p-3 rounded-lg bg-white text-black focus:ring-2 focus:ring-blue-300 outline-none"
            value={form.password}
            onChange={(e) =>
              setForm({ ...form, password: e.target.value })
            }
            autoComplete={isLogin ? "current-password" : "new-password"}
          />

          <button
            type="submit"
            disabled={loading}
            className="w-full bg-blue-700 text-white p-3 rounded-lg font-semibold hover:bg-blue-800 transition disabled:opacity-50"
          >
            {loading ? "Loading..." : isLogin ? "Login" : "Register"}
          </button>
        </form>

        <p className="mt-6 text-center text-white/90 text-sm">
          {isLogin ? "Don't have an account? " : "Already have an account? "}
          <button
            type="button"
            className="text-blue-300 font-semibold hover:underline"
            onClick={() => setIsLogin(!isLogin)}
          >
            {isLogin ? "Register" : "Login"}
          </button>
        </p>
      </div>
    </div>
  );
};

export default AuthPage;
