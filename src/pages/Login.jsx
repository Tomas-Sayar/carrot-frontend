import React, { useState } from 'react';
import './Auth.css';

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log('Logging in with:', email, password);
  };

  return (
    <div className="auth-page container section-padding">
      <div className="auth-card">
        <h1>Welcome Back</h1>
        <p>Log in to your Carrot account to manage your plant family.</p>
        
        <form onSubmit={handleSubmit} className="auth-form">
          <div className="form-group">
            <label htmlFor="email">Email Address</label>
            <input 
              type="email" 
              id="email" 
              value={email} 
              onChange={(e) => setEmail(e.target.value)} 
              required 
            />
          </div>
          <div className="form-group">
            <label htmlFor="password">Password</label>
            <input 
              type="password" 
              id="password" 
              value={password} 
              onChange={(e) => setPassword(e.target.value)} 
              required 
            />
          </div>
          <button type="submit" className="btn btn-primary btn-block">Log In</button>
        </form>
        
        <div className="auth-footer">
          <p>Don't have an account? <a href="/register">Sign Up</a></p>
          <a href="#" className="forgot-password">Forgot password?</a>
        </div>
      </div>
    </div>
  );
};

export default Login;
