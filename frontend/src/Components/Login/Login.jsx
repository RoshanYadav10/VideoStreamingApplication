import React, { useState } from 'react'; 
import axios from 'axios';
import './Login.css';

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.post('http://localhost:5000/api/login', {
        email,
        password,
      });

      // Save the JWT to localStorage
      localStorage.setItem('jwtToken', response.data.token);

      // Redirect to home
      window.location.href = '/';
    } catch (error) {
      console.error('Error during login:', error.response?.data || error.message);
      alert('Invalid login credentials');
    }
  };

  const redirectToRegister = () => {
    window.location.href = '/register';
  };

  const handleForgotPassword = () => {
    window.location.href = '/forgot-password';
  };

  return (
    <div className="login-container">
      <h2>Login</h2>
      <form onSubmit={handleSubmit}>
        <input
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />
        <div className="password-container">
          <input
            type={showPassword ? 'text' : 'password'}
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
          <button
            type="button"
            className="show-password-btn"
            onClick={() => setShowPassword(!showPassword)}
          >
            {showPassword ? 'Hide' : 'Show'}
          </button>
        </div>
        <button type="submit">Login</button>
      </form>
      {/* <button className="forgot-password-btn" onClick={handleForgotPassword}>
        Forgot Password?
      </button> */}
      <button className="register-btn" onClick={redirectToRegister}>
        New User? Register
      </button>
    </div>
  );
};

export default Login;
