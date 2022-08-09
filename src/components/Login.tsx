import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../hooks/useAuth';

const Login = () => {
    const navigate = useNavigate();
    const { user,  error, onLogin, clearError } = useAuth();
    useEffect(() => {
        if (user)
            navigate('/');
    }, [user, navigate]);

    useEffect(() => {
        // bug fix for login error that stays in place when navigating away and back from page
        clearError();
    }, []);
    
    const handleSubmit = async (event: any) => {
        event.preventDefault();
        await onLogin(event.target.elements[0].value, event.target.elements[1].value);
        if (error)
            clearError();
    };

    return (
        <div className="container">
            <div className="row mb-5">
                <h2 className="display-2 text-center">Login</h2>
            </div>
            <div className="row">
                <form className="form-group mx-auto border bg-light w-50 p-5" onSubmit={handleSubmit}>
                    <input className="form-control mb-1" type="text" placeholder="Username" required />
                    <input className="form-control mb-1" type="password" placeholder="Password" required />
                    <input className="btn btn-primary" type="submit" value="Login"/>
                    {
                        error === null ? <></> :
                        <span className="fw-light text-danger help-block m-2">{error}</span>
                    }
                </form>
            </div>
        </div>
    );
};

export default Login;