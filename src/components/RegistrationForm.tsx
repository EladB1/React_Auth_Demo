import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const RegistrationForm = () => {
    const navigate = useNavigate();
    const [registrationError, setRegistrationError] = useState<string|null>(null);
    const [httpStatus, setHttpStatus] = useState<number|null>(null);
    const [successful, setSuccessful] = useState<boolean>(false);

    const resetState = () => {
        if (registrationError !== null)
            setRegistrationError(null); // clear out error on submit
        if (httpStatus !== null)
            setHttpStatus(null);
    };

    const register = async (event: any) => {
        event.preventDefault();
        resetState();
        const username = event.target.elements[0].value;
        const password = event.target.elements[1].value;
        const confirm = event.target.elements[2].value;
        const url = 'http://localhost:8080/signup';
        if (password !== confirm) {
            setRegistrationError('Passwords do not match.');
            return;
        }
        // TODO: add required length and characters for password
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
                    setRegistrationError(data.error);
                else
                    setRegistrationError(data.Error);
            })
            .catch(err => setRegistrationError(err));  
    };

    if (successful) {
        setTimeout(() => navigate('/login'), 2000);
    }

    return (
        <div className="container">
            <div className="row">
                <h2 className="display-2 text-center">Signup</h2>
            </div>
            <div className="row">
                <form className="form-group w-50 bg-secondary p-3 mx-auto" onSubmit={register}>
                    <input className="form-control mb-1" type="text" placeholder="Username" required/>
                    <input className="form-control mb-1" type="password" placeholder="Password" required/>
                    <input className="form-control mb-1" type="password" placeholder="Confirm Password" required/>
                    <input className="btn btn-dark" type="submit" value="Signup" />
                </form>
            </div>
            <div className="row">
                <p className="text-danger">{registrationError ? registrationError : ''}</p>
            </div>
            <div className="row">
                <p className="text-success">{successful ? 'Account successfully created!' : ''}</p>
            </div>
        </div>
    );
};

export default RegistrationForm;