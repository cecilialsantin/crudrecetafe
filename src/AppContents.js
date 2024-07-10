import React, { useState } from 'react';
import { useAuth } from './components/auth/authContext';
import Login from './components/auth/Login';
import Register from './components/auth/Register';
import './App.css';

function AppContent() {
  const { user } = useAuth();
  const [isLoginModalOpen, setIsLoginModalOpen] = useState(false);
  const [isRegisterModalOpen, setIsRegisterModalOpen] = useState(false);

  const handleCloseLoginModal = () => setIsLoginModalOpen(false);
  const handleCloseRegisterModal = () => setIsRegisterModalOpen(false);

  return (
    <div className="container">
      <div className="text-center my-4 bg-pink p-3 border border-3 rounded border-info">
        <h1 className="p-1 text-grey">
          <img 
            src="./logo.png" 
            alt="Logo de Recetas" 
            style={{ width: '80px', margin: '10px', borderRadius: '50%' }} 
          />
          G20_C24255 - Carga de recetas
        </h1>
      </div>
      {!user && (
        <div className="text-center p-3 bg-light border border-3 rounded border-secondary mt-4 bg-pink-light">
          <h4 className="text-dark">Si sos nuevo, podés Registrarte, si no ingresá tus datos en Login para gestionar las recetas</h4>
          <button type="button" className="btn btn-info m-2" onClick={() => setIsLoginModalOpen(true)}>
            Login
          </button>
          <button type="button" className="btn btn-secondary m-2" onClick={() => setIsRegisterModalOpen(true)}>
            Registrate
          </button>
        </div>
      )}

      {/* Modales para Login y Register */}
      <div className={`modal fade ${isLoginModalOpen ? 'show' : ''}`} id="loginModal" tabIndex="-1" aria-labelledby="loginModalLabel" aria-hidden={!isLoginModalOpen} style={{ display: isLoginModalOpen ? 'block' : 'none' }}>
        <div className="modal-dialog p-5 bg-info rounded border border-warning border-thick">
          <div className="modal-content rounded border border-warning border-thick">
            <div className="modal-header">
              <h5 className="modal-title" id="loginModalLabel">Ingresá tu usuario y contraseña</h5>
              <button type="button" className="btn-close" onClick={handleCloseLoginModal} aria-label="Close"></button>
            </div>
            <div className="modal-body">
              <Login onClose={handleCloseLoginModal} />
            </div>
          </div>
        </div>
      </div>

      <div className={`modal fade ${isRegisterModalOpen ? 'show' : ''}`} id="registerModal" tabIndex="-1" aria-labelledby="registerModalLabel" aria-hidden={!isRegisterModalOpen} style={{ display: isRegisterModalOpen ? 'block' : 'none' }}>
        <div className="modal-dialog p-5 bg-secondary rounded border border-warning border-thick">
          <div className="modal-content rounded border border-warning border-thick">
            <div className="modal-header">
              <h5 className="modal-title" id="registerModalLabel">Registrá tu Usuario y Contraseña</h5>
              <button type="button" className="btn-close" onClick={handleCloseRegisterModal} aria-label="Close"></button>
            </div>
            <div className="modal-body">
              <Register onClose={handleCloseRegisterModal} />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default AppContent;
