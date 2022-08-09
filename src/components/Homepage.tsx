import { useEffect, useState } from 'react';

import { useAuth } from '../hooks/useAuth';

const Homepage = () => {
    const [content, setContent] = useState('You are not logged in');
    const { user } = useAuth();

    let options: any = {
        credentials: 'include',
        method: 'GET',
        headers: {

        },
    };

    useEffect(() => {
        if (!user && content !== 'You are not logged in') {
            setContent('You are not logged in'); // clear content on logout
            return;
        }
        fetch('http://localhost:8080/', options)
            .then(response => response.text())
            .then(data => {
                let regex = /.*error.*/;
                if (!regex.test(data))
                    setContent(data);
                else
                    setContent('You are not logged in');
            })
            .catch(err => {
                console.log(err);
                setContent('You are not logged in');
            });
    }, [user]);

    return (
        <div className="container">
            <div className="row">
                <p className="display-1">Homepage</p>
                <p>Welcome...{user ? user : ''}</p>
            </div>
            <div className="row border bg-light p-3 pb-0">
                <pre>{content}</pre>
            </div>
        </div>
    );
};

export default Homepage;