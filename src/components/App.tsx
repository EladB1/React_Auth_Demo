import React from 'react';
import '../App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Routes, Route } from 'react-router-dom';

import Homepage from './Homepage';
import Login from './Login';
import RegistrationForm from './RegistrationForm';
import AuthProvider from './AuthProvider';

const App = () => {
  return (
    <AuthProvider>
      <Routes>
          <Route path='/' element={<Homepage />} />
          <Route path='/login' element={<Login />} />
          <Route path='/signup' element={<RegistrationForm />} />
      </Routes>
    </AuthProvider>
  );
}

export default App;
