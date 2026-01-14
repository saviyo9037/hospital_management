import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { createPatient, updatePatient, getPatient, resetPatientState } from "../../features/patient/patientSlice";
import { useParams, useNavigate } from "react-router-dom";

export const PatientForm = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const isEdit = !!id;

  const { patient, isLoading, isError, message } = useSelector((state) => state.patient);

  const [form, setForm] = useState({ userId: "", age: "", gender: "", Number: "" });

  useEffect(() => {
    if (isEdit) {
      dispatch(getPatient(id));
    }
    return () => {
      dispatch(resetPatientState());
    };
  }, [id, isEdit, dispatch]);

  useEffect(() => {
    if (isEdit && patient) {
      setForm({
        userId: patient.user?._id || "",
        age: patient.age || "",
        gender: patient.gender || "",
        Number: patient.Number || "",
      });
    }
  }, [isEdit, patient]);

  const handleSubmit = (e) => {
    e.preventDefault();
    const action = isEdit
      ? dispatch(updatePatient({ id, patientData: form }))
      : dispatch(createPatient(form));
    action.then(() => navigate("/patient"));
  };

  if (isLoading) {
    return <p className="p-6 text-center">Loading...</p>;
  }

  if (isError) {
    return <p className="p-6 text-red-500 text-center">Error: {message}</p>;
  }

  return (
    <div className="p-6 max-w-md mx-auto bg-white rounded-xl shadow-lg">
      <h1 className="text-2xl font-bold mb-6">{isEdit ? "Edit" : "Create"} Patient</h1>
      {!isLoading && !isError && (
        <form onSubmit={handleSubmit} className="space-y-4">
          <input
            placeholder="User ID"
            required
            className="w-full p-3 border rounded-lg"
            value={form.userId}
            onChange={(e) => setForm({ ...form, userId: e.target.value })}
            disabled={isEdit}
          />
          <input
            type="number"
            placeholder="Age"
            required
            className="w-full p-3 border rounded-lg"
            value={form.age}
            onChange={(e) => setForm({ ...form, age: e.target.value })}
          />
          <select
            required
            className="w-full p-3 border rounded-lg"
            value={form.gender}
            onChange={(e) => setForm({ ...form, gender: e.target.value })}
          >
            <option value="">Gender</option>
            <option value="male">Male</option>
            <option value="female">Female</option>
            <option value="other">Other</option>
          </select>
          <input
            placeholder="Phone"
            required
            className="w-full p-3 border rounded-lg"
            value={form.Number}
            onChange={(e) => setForm({ ...form, Number: e.target.value })}
          />
          <button
            type="submit"
            className="w-full bg-blue-600 text-white p-3 rounded-lg hover:bg-blue-700"
          >
            {isEdit ? "Update" : "Create"}
          </button>
        </form>
      )}
    </div>
  );
};