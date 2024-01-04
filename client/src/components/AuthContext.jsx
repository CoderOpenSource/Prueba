import React, { createContext, useContext, useState, useEffect } from 'react';

const BASE_URL = 'http://137.184.190.92/users';

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [user, setUser] = useState(null);
  const [role, setRole] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [authToken, setAuthToken] = useState(null);

  useEffect(() => {
    const token = localStorage.getItem('authToken');
    const storedRole = localStorage.getItem('userRole');
    const storedUser = JSON.parse(localStorage.getItem('userData'));

    if (token) {
      setAuthToken(token);
      setIsAuthenticated(true);
      setRole(storedRole);
      setUser(storedUser);
    }

    setIsLoading(false);
  }, []);

  const login = (token, userData, userRole) => {
  localStorage.setItem('authToken', token);
  localStorage.setItem('userData', JSON.stringify(userData));
  localStorage.setItem('userRole', userRole);
  setAuthToken(token);
  setIsAuthenticated(true);
  setUser(userData);
  setRole(userRole);
};

  const logout = async () => {
    console.log('Executing logout...');

   const token = localStorage.getItem('authToken');
    console.log(token);
    try {
      const response = await fetch(`${BASE_URL}/logout/`, {
    method: 'POST',
    headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`
    },
});

      if (!response.ok) {
        const errorData = await response.json();
        console.error('Logout error', errorData);
        throw new Error(errorData.message || 'Logout failed!');
      }

      localStorage.removeItem('authToken');
      localStorage.removeItem('userRole');
      localStorage.removeItem('userData');
      setIsAuthenticated(false);
      setUser(null);
      setRole(null);
      setAuthToken(null);
    } catch (error) {
      console.error('An error occurred during logout:', error.message);
      // Aquí podrías mostrar una notificación al usuario si algo va mal
    }
  };

  return (
    <AuthContext.Provider value={{ isAuthenticated, user, role, login, logout, isLoading, authToken }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);

