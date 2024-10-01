import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Login from './components/Login';
import Dashboard from './components/Dashboard';
import PrivateRoute from './components/PrivateRoute';
import Register from './components/Register';
import CreateOcorrencia from './components/CreateOcorrencia';

function App() {
  return (
    <Router>
      <Routes>
        {/* Rota para login */}
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/ocorrencias/create" element={<PrivateRoute><CreateOcorrencia /></PrivateRoute>} />
        {/* Rota protegida, só acessível por usuários autenticados */}
        <Route path="/dashboard" element={<PrivateRoute><Dashboard /></PrivateRoute>} />
      </Routes>
    </Router>
  );
}

export default App;
