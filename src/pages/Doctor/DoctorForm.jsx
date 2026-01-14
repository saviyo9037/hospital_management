import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import { createDoctor, updateDoctor, getDoctor, resetDoctorState } from "../../features/doctor/doctorSlice";

export const DoctorForm = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const isEdit = !!id;

  const { doctor, isLoading, isError, message } = useSelector((state) => state.doctor);

  const [form, setForm] = useState({
    name: "",
    email: "",
    password: "", // Only for create, not for update
  });

  useEffect(() => {
    if (isEdit) {
      dispatch(getDoctor(id));
    }
    return () => {
      dispatch(resetDoctorState());
    };
  }, [id, isEdit, dispatch]);

  useEffect(() => {
    if (isEdit && doctor) {
      setForm({
        name: doctor.user?.name || "",
        email: doctor.user?.email || "",
        password: "", // Password is not pre-filled for security reasons
      });
    }
  }, [isEdit, doctor]);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (id) {
      await dispatch(updateDoctor({ id, doctorData: form }));
    } else {
      await dispatch(createDoctor(form));
    }
    navigate("/doctor");
  };

  return (
    <div className="p-6 max-w-md mx-auto bg-white rounded-lg shadow-md">
      <h1 className="text-2xl font-bold mb-4">
        {id ? "Edit Doctor" : "Create Doctor"}
      </h1>
      {isLoading && <p className="text-center text-blue-500">Loading...</p>}
      {isError && <p className="text-center text-red-500">{message}</p>}
      {!isLoading && !isError && (
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label htmlFor="name" className="block text-sm font-medium text-gray-700">Name</label>
            <input
              type="text"
              id="name"
              name="name"
              value={form.name}
              onChange={handleChange}
              className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
              required
            />
          </div>
          <div>
            <label htmlFor="email" className="block text-sm font-medium text-gray-700">Email</label>
            <input
              type="email"
              id="email"
              name="email"
              value={form.email}
              onChange={handleChange}
              className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
              required
            />
          </div>
          {!id && (
            <div>
              <label htmlFor="password" className="block text-sm font-medium text-gray-700">Password</label>
              <input
                type="password"
                id="password"
                name="password"
                value={form.password}
                onChange={handleChange}
                className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                required
              />
            </div>
          )}
          <button
            type="submit"
            className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
          >
            {id ? "Update Doctor" : "Create Doctor"}
          </button>
        </form>
      )}
    </div>
  );
};