import { createContext, useState } from 'react';
import { useLocalStorage } from '../hooks/useLocalStorage';

import { jwtdecode } from '../utils/JWTDecode';
export const AuthContext = createContext<any>('');

const AuthProvider = ({ children }: any) => {
    const [user, setUser] = useLocalStorage('user', null);
    const [httpStatus, setHttpStatus] = useState<number|null>(null);
    const [error, setError] = useState<any>(null);
    const BASE_URL = 'http://localhost:8080';
    let header: object, payload: any, signature: string;



    const handleLogin = async (username: string, password: string) => {
        const url: string = `${BASE_URL}/token`;
        const options: any = {
            credentials: 'include',
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
                setHttpStatus(response.status);
                if (httpStatus !== 200)
                    console.log(httpStatus);
                return response.json();
            })
            .then(data => {
                if (data.error)
                    setError(data.error)
                else {
                    // /token endpoint returns the token on successful login; use that to configure the auto logout
                    [header, payload, signature] = jwtdecode(data.token);
                    setUser(username);
                }
            })
            .catch(err => setError(err));
            if (payload)
                autoLogout(payload);
            
    };

    const autoLogout = async (payload: any) => {
        const diff = payload.exp - payload.iat;
        await setTimeout(() => {
            setUser(null);
            
        }, diff * 1000);
    };  

    const handleLogout = async () => {
        const options: any = {
            credentials: 'include',
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                //'Authorization': `Bearer ${token}`
            },
            body: JSON.stringify({})
        };
        const url = `${BASE_URL}/logout/`;
        await fetch(url, options)
            .then(response => {
                setHttpStatus(response.status);
            })
            .catch(err => console.error(error));
        setUser(null);
    };
    const clearLoginError = () => {
        setError(null);
    };


    const value = {
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