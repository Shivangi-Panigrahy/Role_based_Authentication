import React, { useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { getCurrentUser } from './features/auth/authAPI';

import CustomerRegister from './components/Auth/CustomerRegister';
import AdminRegister from './components/Auth/AdminRegister';
import AdminLogin from './components/Auth/AdminLogin';
import VerifyEmail from './components/Auth/VerifyEmail';
import AdminDashboard from './components/Auth/AdminDashboard';

function App() {
  const dispatch = useDispatch();
  const { isAuthenticated, user } = useSelector(state => state.auth);

  useEffect(() => {
    if (localStorage.getItem('token')) {
      dispatch(getCurrentUser());
    }
  }, [dispatch]);

  return (
    <Router>
      <Routes>
        <Route path="/customer-register" element={<CustomerRegister />} />
        <Route path="/admin-register" element={<AdminRegister />} />
        <Route path="/admin-login" element={<AdminLogin />} />
        <Route path="/verify-email/:token" element={<VerifyEmail />} />
        
        <Route 
          path="/admin-dashboard" 
          element={
            isAuthenticated && user?.role === 'admin' ? 
            <AdminDashboard /> : 
            <Navigate to="/admin-login" />
          } 
        />
        
        <Route 
          path="/" 
          element={
            isAuthenticated ? 
              (user?.role === 'admin' ? 
                <Navigate to="/admin-dashboard" /> : 
                <Navigate to="/customer-register" />) : 
              <Navigate to="/customer-register" />
          } 
        />
      </Routes>
    </Router>
  );
}

export default App;