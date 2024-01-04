import React from 'react';
import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom';
import { AuthProvider, useAuth } from './components/AuthContext';
import Dashboard from './pages/Dashboard';
import Welcome from './pages/Welcome';
import Login from './components/login';
import PrivateRoute from './components/PrivateRoute';
import { ToastContainer } from 'react-toastify';
function ProtectedRoutes() {
  const { isAuthenticated } = useAuth();

  return (
    <Routes>
      <Route path="/*" element={<Welcome />} />
      <Route path="/login" element={<Login />} />
      <Route path="/dashboard/*" element={
          <PrivateRoute allowedRoles={['Admin', 'Trabajador']} element={<Dashboard />} />
        } />
    </Routes>
  );
}

function App() {
  return (
    <AuthProvider>
      <ToastContainer 
          position="top-right"
          autoClose={3000}
          hideProgressBar
          newestOnTop={false}
          closeOnClick
          rtl={false}
          pauseOnFocusLoss
          draggable
          pauseOnHover
          style={{ width: "auto", fontSize: "14px" }}
        />

      <Router>
        <ProtectedRoutes />
      </Router>
    </AuthProvider>
  );
}

export default App;
