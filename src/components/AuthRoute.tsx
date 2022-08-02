import { Navigate } from 'react-router-dom';

import { useAuth } from '../hooks/useAuth';

const AuthRoute = ({children}: any) => {
    const { token } = useAuth();

    if (!token)
        return <Navigate to='/' />;
    return children;
};

export default AuthRoute;