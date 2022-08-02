import { createContext, useState } from 'react';

import { jwtdecode } from '../utils/JWTDecode';
export const AuthContext = createContext<any>('');

const AuthProvider = ({ children }: any) => {
    const [token, setToken] = useState<string|null|void>(null);
    const [user, setUser] = useState<string|undefined>(undefined);
    const [httpStatus, setHttpStatus] = useState<number|null>(null);
    const [error, setError] = useState<any>(null);
    const BASE_URL = 'http://localhost:8080';

    const handleLogin = async (username: string, password: string) => {
        const url: string = `${BASE_URL}/token`;
        const options: any = {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                username: username,
                password: password
            })
        };
        await fetch(url, options)
            .then(response => {
                if (response.status === 400)
                    setHttpStatus(response.status);
                else
                    setHttpStatus(response.status);
                console.log(`HTTP status: ${httpStatus}`);
                return response.json();
            })
            .then(data => {
                if (data.error)
                    setError(data.error)
                else {
                    setToken(data.token);
                    const [header, payload, signature] = jwtdecode(data.token);
                    console.log(header);
                    console.log(signature);
                    setUser(payload.username);
                }
            })
            .catch(err => setError(err));
    };

    const handleLogout = async () => {
        const options: any = {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`
            },
            body: JSON.stringify({})
        };
        const url = `${BASE_URL}/logout/`;
        await fetch(url, options)
            .then(response => {
                setHttpStatus(response.status);
                return response.json();
            })
            .then(data => console.log(data))
            .catch(err => console.error(error));
        setToken(null);
        setUser(undefined);
    };
    const clearLoginError = () => {
        setError(null);
    };


    const value = {
        token,
        user,
        error,
        onLogin: handleLogin,
        onLogout: handleLogout,
        clearError: clearLoginError
    };

    return (
        <AuthContext.Provider value={value}>
            {children}
        </AuthContext.Provider>
    );
};

export default AuthProvider;