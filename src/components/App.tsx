import React from 'react';
import '../App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Routes, Route } from 'react-router-dom';

import Homepage from './Homepage';
import Login from './Login';
import RegistrationForm from './RegistrationForm';
import AuthProvider from './AuthProvider';
import AuthRoute from './AuthRoute';
import Sample from './Sample';
import Nav from './Nav';

const App = () => {
    const date: Date = new Date();
    return (
        <AuthProvider>
            <Nav />
            <Routes>
                <Route path='/' element={<Homepage />} />
                <Route path='/login' element={<Login />} />
                <Route path='/signup' element={<RegistrationForm />} />
                <Route path='/sample' element={
                    <AuthRoute>
                        <Sample />
                    </AuthRoute>
                } />
            </Routes>
                <footer className="bg-dark text-white position-fixed bottom-0 container-fluid">
                    <p>&copy; company.com, {date.getFullYear()}</p>
                </footer>
        </AuthProvider>
    );
}

export default App;
