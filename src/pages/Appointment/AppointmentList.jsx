import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchAppointments, deleteAppointment } from "../../features/appointment/appointmentSlice";
import { Link } from "react-router-dom";

export const AppointmentList = () => {
  const dispatch = useDispatch();
  const { appointments, loading, error } = useSelector((state) => state.appointment);
  const { user } = useSelector((state) => state.auth); // Get logged-in user

  useEffect(() => {
    if (user) { // Only fetch if user is logged in
      dispatch(fetchAppointments({ userId: user._id, userRole: user.role }));
    }
  }, [dispatch, user]); // Add user to dependency array

  const handleDelete = (id) => {
    // Modern confirm (still sync, but better than alert)
    if (window.confirm("Are you sure you want to delete this appointment?")) {
      dispatch(deleteAppointment(id));
    }
  };

  if (loading) {
    return (
      <div className="p-6 text-center">
        <div className="inline-block animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600"></div>
        <p className="mt-2 text-gray-600">Loading appointments...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="p-6 max-w-7xl mx-auto">
        <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-lg">
          <strong>Error:</strong> {error}
        </div>
      </div>
    );
  }

  if (appointments.length === 0) {
    return (
      <div className="p-6 max-w-7xl mx-auto text-center">
        <p className="text-gray-500 mb-4">No appointments found.</p>
        <Link
          to="/appointment/create"
          className="bg-blue-600 text-white px-5 py-2 rounded-lg hover:bg-blue-700 inline-block"
        >
          + Create First Appointment
        </Link>
      </div>
    );
  }

  return (
    <div className="p-6 bg-white rounded-lg shadow-md">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-3xl font-bold text-gray-800">Appointments</h1>
        <Link
          to="/appointment/create"
          className="bg-blue-600 text-white px-5 py-2 rounded-lg hover:bg-blue-700 transition-colors duration-300 shadow-md"
        >
          + New Appointment
        </Link>
      </div>

      <div className="bg-white shadow-lg rounded-lg overflow-hidden border border-gray-200">
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Patient
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Doctor
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Date
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Reason
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Status
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
            {appointments.map((a) => (
              <tr key={a._id} className="hover:bg-gray-50">
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{a.patient?.user?.name || "N/A"}</td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{a.doctor?.user?.name || "N/A"}</td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{new Date(a.date).toLocaleDateString()}</td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{a.reason}</td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                  <span
                    className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${
                      a.status === "confirmed"
                        ? "bg-green-100 text-green-800"
                        : a.status === "pending"
                        ? "bg-yellow-100 text-yellow-800"
                        : "bg-red-100 text-red-800"
                    }`}
                  >
                    {a.status}
                  </span>
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                  <Link
                    to={`/appointment/edit/${a._id}`}
                    className="text-indigo-600 hover:text-indigo-900 mr-3"
                  >
                    Edit
                  </Link>
                  <button
                    onClick={() => handleDelete(a._id)}
                    className="text-red-600 hover:text-red-900"
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};