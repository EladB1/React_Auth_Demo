import { Link } from 'react-router-dom';

import { useAuth } from '../hooks/useAuth';

const Nav = () => {
    const { /*token,*/ user, onLogout } = useAuth();

    return (
        <div className="container-fluid">
            <nav className="navbar navbar-dark bg-dark p-2 text-white">
                <Link to="/" className="navbar-brand nav-item">App</Link>
                    <Link to="/" className="nav-link">Home</Link>
                    {/*token === null*/ user === undefined ? <></> : 
                        <Link to="/sample" className="nav-link">Sample</Link>
                    }
                {/*token === null*/ user === undefined ? <div className="nav-item">
                    <Link to="/login" className="btn btn-primary m-1">Login</Link>
                    <Link to="/signup" className="btn btn-success m-1">Signup</Link>
                </div> :
                    <button className="btn btn-danger m-1" onClick={onLogout}>Logout</button>
                }
            </nav>
        </div>
    );
};

export default Nav;