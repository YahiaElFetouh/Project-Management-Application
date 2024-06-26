import React, { useState } from 'react';
import axios from 'axios';
import qs from 'qs';
import '../layouts/LoginForm.css'
import SignUp from './SignUp';
import ForgotPassword from './ForgotPassword';
const LoginForm = () => {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [showSignUp, setShowSignUp] = useState(false);
    const [showForgotPassword, setShowForgotPassword] = useState(false);

    const handleForgotPasswordClick = () => {
        setShowForgotPassword(true);
    };

    const handleLogin = () => {
        setShowForgotPassword(false);
    };

    if (showForgotPassword) {
        return <ForgotPassword handleLogin={handleLogin} />;
    }

    const handleSignUpClick = () => {
        setShowSignUp(true);
    };

    const handleSignUp = () => {
        setShowSignUp(false);
    };

    if (showSignUp) {
        return <SignUp handleSignUp={handleSignUp} />;
    }

    const handleUsernameChange = (e) => {
        setUsername(e.target.value);
    };

    const handlePasswordChange = (e) => {
        setPassword(e.target.value);
    };

    const handleSubmit = (e) => {
        e.preventDefault();

        console.log('username:', username);
        console.log('password:', password);
        const data = qs.stringify({
            email: username,
            password: password
        });


        axios.post('http://127.0.0.1:8080/UserSignIn/login', data)
            .then(response => {
                const data = response.data;
                if (data.code === 200) {
                    alert("Login Successful, Welcome!")

                }else{
                    alert("Username or Password invalid!")
                }
            })
            .catch(error => {
                console.log('loginfail', error);
                alert("Error");

            });
    };

    return (
        <form onSubmit={handleSubmit}>
            <div class="login-container">
                <div class="login-form">
                    <label for="username"></label>
                    <input
                        type="text"
                        id="username"
                        value={username}
                        placeholder='email'
                        onChange={handleUsernameChange}
                    />

                    <label for="password"></label>
                    <input
                        type="password"
                        id="password"
                        value={password}
                        placeholder='password'
                        onChange={handlePasswordChange}
                    />

                    <button type="submit">Login</button>
                    <p>
                        <button onClick={handleSignUpClick}>New User?</button>
                    </p>
                    <p>
                        <button onClick={handleForgotPasswordClick}>Forgot Password?</button>
                    </p>
                </div>
            </div>

        </form>

    );
};
//This comment you can ignore


export default LoginForm;
