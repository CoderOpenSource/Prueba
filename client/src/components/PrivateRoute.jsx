import React from 'react';
import { Navigate } from 'react-router-dom';
import { useAuth } from './AuthContext';

function PrivateRoute({ element, allowedRoles = [] }) {
  const { isAuthenticated, role, isLoading } = useAuth();

  // Comprobar primero si todavía está cargando.
  if (isLoading) {
    return <div>Cargando...</div>; // O tu componente de carga preferido
  }

  // Si no está autenticado, redirige al login
  console.log(isAuthenticated);
  if (!isAuthenticated) {
    return <Navigate to="/login" replace />;
  }

  // Si está autenticado y su rol es Cliente, redirige a welcome
  if (role === 'Cliente') {
    return <Navigate to="/" replace />;
  }

  // Si está autenticado y tiene un rol permitido, se le permite el acceso
  if (allowedRoles.length === 0 || allowedRoles.includes(role)) {
    return element;
  }

  // En el caso improbable de que el rol no coincida con ninguna de las condiciones anteriores, redirige al inicio
  return <Navigate to="/" replace />;
}

export default PrivateRoute;
