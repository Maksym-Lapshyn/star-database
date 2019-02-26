import React from 'react';
import { Redirect } from 'react-router-dom';

export default function LoginPage({ isLoggedIn, onLogin }) {
    if (isLoggedIn) {
        return <Redirect to="/" />;
    }

    return (
        <div className="jumbotron">
            <p>Login to see secret page!</p>
            <button className="btn btn-primary" onClick={onLogin}>Login</button>
        </div>
    );
}
