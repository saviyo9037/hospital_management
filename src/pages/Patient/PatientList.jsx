import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchPatients, deletePatient } from "../../features/patient/patientSlice";
import { Link } from "react-router-dom";

export const PatientList = () => {
  const dispatch = useDispatch();
  const { patients, loading, error } = useSelector((state) => state.patient);

  useEffect(() => {
    dispatch(fetchPatients());
  }, [dispatch]);

  const handleDelete = (id) => {
    if (confirm("Delete this patient?")) {
      dispatch(deletePatient(id));
    }
  };

  if (loading) return <p className="p-6 text-center">Loading...</p>;
  if (error) return <p className="p-6 text-red-500 text-center">{error}</p>;

  return (
    <div className="p-6 max-w-7xl mx-auto">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-3xl font-bold text-gray-800">Patients</h1>
        <Link
          to="/patient/create"
          className="bg-green-600 text-white px-5 py-2 rounded-lg hover:bg-green-700"
        >
          + Add Patient
        </Link>
      </div>

      <div className="bg-white shadow overflow-hidden rounded-lg">
        <table className="min-w-full">
          <thead className="bg-gray-50">
            <tr>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Name</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Email</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Age</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Gender</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Phone</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-200">
            {patients.map((p) => (
              <tr key={p._id}>
                <td className="px-6 py-4 text-sm">{p.user?.name || "N/A"}</td>
                <td className="px-6 py-4 text-sm">{p.user?.email}</td>
                <td className="px-6 py-4 text-sm">{p.age}</td>
                <td className="px-6 py-4 text-sm">{p.gender}</td>
                <td className="px-6 py-4 text-sm">{p.Number}</td>
                <td className="px-6 py-4 text-sm">
                  <Link to={`/patient/edit/${p._id}`} className="text-indigo-600 hover:underline mr-3">
                    Edit
                  </Link>
                  <button onClick={() => handleDelete(p._id)} className="text-red-600 hover:underline">
                    Delete
                  </button>
                </td>
              </tr>
            ))}
            {patients.length === 0 && (
              <tr>
                <td colSpan="6" className="px-6 py-4 text-center text-gray-500">
                  No patients found.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};