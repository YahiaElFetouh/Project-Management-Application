import React, { useState } from 'react';
import axios from 'axios';
import './LoginForm.css'
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
    // 在这里处理登录逻辑，比如发送请求到服务器进行验证
    console.log('用户名:', username);
    console.log('密码:', password);
    const data = {
      username: username,
      password: password
    };
   
    // 发送POST请求到服务器
    axios.post('http://127.0.0.1:8000/login', data)
      .then(response => {

        console.log(response.data);
        alert("success");
        // 在这里可以处理登录成功的逻辑，比如重定向到其他页面
      })
      .catch(error => {
        console.log('登录失败', error);
        alert("error");
        // 在这里可以处理登录失败的逻辑，比如显示错误消息
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
          placeholder='username'
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

export default LoginForm;
