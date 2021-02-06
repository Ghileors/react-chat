import React, { useContext } from 'react';
import { useHistory } from 'react-router-dom'
import { AuthContext } from '../context/AuthContext';

export default function Header() {
    const history = useHistory();
    const auth = useContext(AuthContext);

    const logoutHandler = event => {
        event.preventDefault();
        auth.logout();
        history.push('/')
    };

    return (
        <header className="chat-header">
            <h1>Chat</h1>
            <a href="/" className="btn" onClick={logoutHandler}>Logout</a>
        </header>
    );
};
