import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Appointment from './pages/Appointment';
import AdminLayout from './layout/AdminLayout';
import Dashboard from './pages/Dashboard';
import Action from './pages/Action';
import Login from './pages/Login';
import { ToastContainer } from 'react-toastify';
import PatientInfo from './pages/PatientInfo';

const App = () => {
  return (
    <>
 <ToastContainer position="top-right" autoClose={3000} />
      <Routes>
        {/* Public Route without sidebar */}
        <Route path="/" element={<Login />} />

        {/* Protected/Admin Routes with sidebar */}
        <Route element={<AdminLayout />}>
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/appointment" element={<Appointment />} />
          <Route path="/action" element={<Action />} />
          <Route path="/actionPatient" element={<PatientInfo />} />
        </Route>
      </Routes>
</>
  );
};

export default App;
