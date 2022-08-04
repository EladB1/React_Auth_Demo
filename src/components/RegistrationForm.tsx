import { useState, useReducer } from 'react';
import { useNavigate } from 'react-router-dom';

import Alert from './Alert';

const RegistrationForm = () => {
    const reducer = (state: any, action: any) => {
        switch(action.type) {
            case 'append':
                return [...state, action.error];
            case 'reset':
                return [];
            default:
                throw new Error();
        }
    };

    const navigate = useNavigate();
    const [registrationError, dispatch] = useReducer(reducer, []);
    const [httpStatus, setHttpStatus] = useState<number|null>(null);
    const [successful, setSuccessful] = useState<boolean>(false);

    const resetState = () => {
        dispatch({type: 'reset'});
        if (httpStatus !== null)
            setHttpStatus(null);
    };

    const addValidationError = (error: string) => {
        dispatch({type: 'append', error: error});
    };

    const validateUsername = (username: string): boolean => {
        let valid = true;
        if (username.length < 5 || username.length > 20) {
            addValidationError('Username must be between 5 and 20 characters in length');
            valid = false;
        }
        const regex = /^[A-Za-z][A-Za-z0-9-_@]+$/;
        const msg = 'Username must start with a letter and can contain letters, numbers, \'-\', \'_\', and \'@\'';
        if (!regex.test(username)) {
            addValidationError(msg);
            valid = false;
        }
        return valid;
    };

    const validatePassword = (password: string): boolean => {
        let valid = true;
        if (password.length < 6 || password.length > 32) {
            addValidationError('Password must be between 6 and 32 characters in length');
            valid = false;
        }
        
        const re_upper = /.*[A-Z].*/;
        const re_lower = /.*[a-z].*/;
        const re_number = /.*[0-9].*/;
        const re_special = /.*[&*^-_@!?%#$+=,.|;:~`].*/;
        if (!re_upper.test(password)) {
            addValidationError('Password must contain at least one uppercase');
            valid = false;
        }
        if (!re_lower.test(password)) {
            addValidationError('Password must contain at least one lowercase');
            valid = false;
        }
        if (!re_number.test(password)) {
            addValidationError('Password must contain at least one number');
            valid = false;
        }
        if (!re_special.test(password)) {
            addValidationError('Password must contain at least one special character');
            valid = false;
        }
        return valid;
    }

    const register = async (event: any) => {
        event.preventDefault();
        resetState();
        const username = event.target.elements[0].value;
        const password = event.target.elements[1].value;
        const confirm = event.target.elements[2].value;
        const url = 'http://localhost:8080/signup';
        if (password !== confirm) {
            addValidationError('Passwords do not match.');
            return;
        }
        if (!validateUsername(username) || !validatePassword(password))
            return;
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
                setHttpStatus(response.status);
                return response.json();
            })
            .then(data => {
                if (!data.Error && !data.error)
                    setSuccessful(true);
                else if (data.error)
                    addValidationError(data.error);
                else
                addValidationError(data.Error);
            })
            .catch(err => addValidationError(err));  
    };

    if (successful) {
        setTimeout(() => navigate('/login'), 2000);
    }

    return (
        <div className="container">
            <div className="row">
                <h2 className="display-2 text-center">Signup</h2>
            </div>
            <div className="row p-3 mx-auto">
                <form className="form-group w-50 h-50 bg-secondary p-3 mx-auto" onSubmit={register}>
                    <input className="form-control mb-1" type="text" placeholder="Username" required/>
                    <input className="form-control mb-1" type="password" placeholder="Password" required/>
                    <input className="form-control mb-1" type="password" placeholder="Confirm Password" required/>
                    <input className="btn btn-dark" type="submit" value="Signup" />
                </form>
            </div>
            <div className="row">
                <div className="mx-auto w-50 mb-5">
                    {registrationError.length === 0 ? '' : <Alert alertType="Error" details={<ul>
                        {registrationError.map((error, index) =>
                            <li key={index}>{error}</li>)}
                        </ul>} />
                    }
                    <div className="text-success">{successful ? <Alert alertType="Success" details='Account successfully created!' /> : ''}</div>
                </div>
            </div>
        </div>
    );
};

export default RegistrationForm;