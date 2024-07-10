import React from 'react';
import { useAuth } from './authContext';
import { useNavigate } from 'react-router-dom';

function Logout() {
  const { logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate('/'); // Redirige a la página de inicio después del logout
  };

  return (
    <button onClick={handleLogout} className="btn btn-sm btn-secondary">
      Salir
    </button>
  );
}

export default Logout;
