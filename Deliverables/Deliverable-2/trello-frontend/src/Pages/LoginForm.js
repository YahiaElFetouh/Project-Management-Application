import React, { useState } from 'react';
import axios from 'axios';
import qs from 'qs'; 
import '../layouts/LoginForm.css'
const LoginForm = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

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
      </div>
       </div>
      
    </form>
    
  );
};
//This comment you can ignore

export default LoginForm;
