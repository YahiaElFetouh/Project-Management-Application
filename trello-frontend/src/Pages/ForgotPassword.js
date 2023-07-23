import React, { useState } from 'react';

function ForgotPassword({ handleLogin }) {
  const [email, setEmail] = useState('');
  const [securityAnswer, setSecurityAnswer] = useState('');
  const [newPassword, setNewPassword] = useState('');

  const handleSecurityAnswerChange = (e) => {
    setSecurityAnswer(e.target.value);
  };

  const handleNewPasswordChange = (e) => {
    setNewPassword(e.target.value);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log('Forgot password submitted:', email, securityAnswer, newPassword);
    // Clear the form fields
    setEmail('');
    setSecurityAnswer('');
    setNewPassword('');

    // Call the handleLogin function to switch back to the Login form
    handleLogin();
  };

  return (
    <div>
      <h2>Forgot Password</h2>
      <form onSubmit={handleSubmit}>
        <label>
          Security Answer:
          <input type="text" value={securityAnswer} onChange={handleSecurityAnswerChange} />
        </label>
        <label>
          New Password:
          <input type="password" value={newPassword} onChange={handleNewPasswordChange} />
        </label>
        <button type="submit">Submit</button>
      </form>
    </div>
  );
}

export default ForgotPassword;

