import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../hooks/useAuth';

import Alert from './Alert';

const Login = () => {
    //const [loginError, setLoginError] = useState('');
    const navigate = useNavigate();
    const { token, error, onLogin, clearError } = useAuth();
    useEffect(() => {
        if (token)
            navigate('/');
    }, [token, navigate])
    
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
                </form>
            </div>
            <div className="row">
                <div className="mt-5 mx-auto w-25">
                    {error === null ? 
                            <></> : 
                            <Alert alertType={"Error"} details={error} />
                    }
                </div>
            </div>
        </div>
    );
};

export default Login;