import React from 'react';
import { Outlet, Navigate } from 'react-router-dom';

const PrivateRoute: React.FC = () => {
  const user = localStorage.getItem('correo');
  let auth: { token: boolean };

  if (user === null) {
    auth = { token: false };
  } else {
    auth = { token: true };
  }

  return auth.token ? <Outlet /> : <Navigate to="/login" />;
};

export default PrivateRoute;