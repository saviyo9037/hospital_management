import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate, useParams } from 'react-router-dom';
import { createAppointment, getAppointment, updateAppointment, resetAppointmentState } from '../../features/appointment/appointmentSlice';
import { fetchDoctors } from '../../features/doctor/doctorSlice';
import { fetchPatients } from '../../features/patient/patientSlice';

const AppointmentForm = () => {
  const [formData, setFormData] = useState({
    patient: '',
    doctor: '',
    date: '',
    reason: '',
    status: 'pending',
  });

  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { id } = useParams();

  const { appointment, isLoading, isError, message } = useSelector((state) => state.appointment);
  const { doctors } = useSelector((state) => state.doctor);
  const { patients } = useSelector((state) => state.patient);
  const { user } = useSelector((state) => state.auth);

  useEffect(() => {
    dispatch(fetchDoctors());
    dispatch(fetchPatients());

    if (id) {
      dispatch(getAppointment(id));
    } else if (user && user.role === 'patient') {
      setFormData((prevFormData) => ({
        ...prevFormData,
        patient: user._id,
      }));
    }

    return () => {
      dispatch(resetAppointmentState());
    };
  }, [id, dispatch, user]);

  useEffect(() => {
    if (id && appointment) {
      setFormData({
        patient: appointment.patient?._id || '',
        doctor: appointment.doctor?._id || '',
        date: appointment.date ? new Date(appointment.date).toISOString().split('T')[0] : '',
        reason: appointment.reason || '',
        status: appointment.status || 'pending',
      });
    }
  }, [id, appointment]);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (id) {
      dispatch(updateAppointment({ id, appointmentData: formData }));
    } else {
      dispatch(createAppointment(formData));
    }
    navigate('/appointment');
  };

  if (isLoading) {
    return <h2 className="text-center text-xl mt-8">Loading...</h2>;
  }

  if (isError) {
    return <h3 className="text-center text-xl mt-8 text-red-500">Error: {message}</h3>;
  }

  return (
    <div className="min-h-screen bg-gray-100 flex items-center justify-center p-4">
      <div className="bg-white p-8 rounded-lg shadow-xl w-full max-w-2xl">
        <h1 className="text-3xl font-bold text-gray-800 mb-6 text-center">
          {id ? 'Edit Appointment' : 'Create New Appointment'}
        </h1>
        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label className="block text-gray-700 text-sm font-semibold mb-2" htmlFor="patient">
                Patient:
              </label>
              <select
                name="patient"
                id="patient"
                value={formData.patient}
                onChange={handleChange}
                className="block w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 sm:text-sm bg-white text-gray-900"
                required
              >
                <option value="">Select Patient</option>
                {patients.map((p) => (
                  <option key={p._id} value={p._id}>
                    {p.user.name}
                  </option>
                ))}
              </select>
            </div>
            <div>
              <label className="block text-gray-700 text-sm font-semibold mb-2" htmlFor="doctor">
                Doctor:
              </label>
              <select
                name="doctor"
                id="doctor"
                value={formData.doctor}
                onChange={handleChange}
                className="block w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 sm:text-sm bg-white text-gray-900"
                required
              >
                <option value="">Select Doctor</option>
                {doctors.map((d) => {
                  return (
                    <option key={d._id} value={d._id}>
                      {d.user.name}
                    </option>
                  );
                })}
              </select>
            </div>
          </div>
          <div>
            <label className="block text-gray-700 text-sm font-semibold mb-2" htmlFor="date">
              Date:
            </label>
            <input
              type="date"
              name="date"
              id="date"
              value={formData.date}
              onChange={handleChange}
              className="block w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 sm:text-sm bg-white text-gray-900"
              required
            />
          </div>
          <div>
            <label className="block text-gray-700 text-sm font-semibold mb-2" htmlFor="reason">
              Reason:
            </label>
            <textarea
              name="reason"
              id="reason"
              value={formData.reason}
              onChange={handleChange}
              className="block w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 sm:text-sm bg-white text-gray-900"
              rows="3"
              required
            ></textarea>
          </div>
          <div>
            <label className="block text-gray-700 text-sm font-semibold mb-2" htmlFor="status">
              Status:
            </label>
            <select
              name="status"
              id="status"
              value={formData.status}
              onChange={handleChange}
              className="block w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 sm:text-sm bg-white text-gray-900"
            >
              <option value="pending">Pending</option>
              <option value="confirmed">Confirmed</option>
              <option value="cancelled">Cancelled</option>
            </select>
          </div>
          <button
            type="submit"
            className="w-full bg-blue-600 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 transition-colors"
          >
            {id ? 'Update Appointment' : 'Create Appointment'}
          </button>
        </form>
      </div>
    </div>
  );
};

export default AppointmentForm;