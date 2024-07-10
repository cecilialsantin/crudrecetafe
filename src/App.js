
import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { AuthProvider } from './components/auth/authContext';
import AppContent from './AppContents';
import FormularioReceta from './components/FormularioReceta';

function App() {
  return (
    <AuthProvider>
      <Router>
        <Routes>
          <Route path="/" element={<AppContent />} />
          <Route path="/recetas" element={<FormularioReceta />} />
        </Routes>
      </Router>
    </AuthProvider>
  );
}

export default App;
