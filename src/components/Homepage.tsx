import { useAuth } from '../hooks/useAuth';
import { Link } from 'react-router-dom';

const Homepage = () => {
    const { token, onLogout } = useAuth();
    return (
        <div className="container">
            <div className="row position-absolute end-0 p-5">
                {token === null ? <div className="">
                    <Link to="/login" className="btn btn-primary m-1">Login</Link>
                    <Link to="/signup" className="btn btn-success m-1">Signup</Link>
                </div> :
                    <button className="btn btn-danger m-1" onClick={onLogout}>Logout</button>
                }
            </div>
            <div className="row">
                <p className="display-1">Homepage</p>
                <p>Welcome...</p>
            </div>
        </div>
    );
};

export default Homepage;