import React from 'react';
import { AppointmentList } from './AppointmentList';

const Appointment = () => {
  return (
    <div className="min-h-screen bg-gray-100">
      <div className="max-w-7xl mx-auto py-6 sm:px-6 lg:px-8">
        <h1 className="text-3xl font-bold text-gray-900 mb-6">Appointment Management</h1>
        <AppointmentList />
      </div>
    </div>
  );
};

export default Appointment;