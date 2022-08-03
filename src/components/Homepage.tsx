import { useAuth } from '../hooks/useAuth';
import { Link } from 'react-router-dom';

const Homepage = () => {
    const { token, user, onLogout } = useAuth();
    return (
        <div className="container">
            <div className="row">
                <p className="display-1">Homepage</p>
                <p>Welcome...{user ? user : ''}</p>
            </div>
        </div>
    );
};

export default Homepage;