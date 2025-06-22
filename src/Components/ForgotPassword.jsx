import '../Stylying/loginscreen.css';
import React, { useState } from 'react';
import { Mail } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

const ForgotPasswordScreen = () => {
  const [email, setEmail] = useState('');
  const [emailError, setEmailError] = useState('');
  const navigate = useNavigate();

  const validateEmail = () => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!email || !emailRegex.test(email)) {
      setEmailError('Please enter a valid email address.');
      return false;
    }
    setEmailError('');
    return true;
  };

  const handleResetPassword = async () => {
    if (!validateEmail()) return;

    try {
      const res = await fetch('https://api-azjv7cvnxq-uc.a.run.app/auth/reset-password', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email }),
      });

      const data = await res.json();

      if (res.ok) {
        alert('Password reset link sent to your email.');
        navigate('/login');
      } else {
        alert(data.message || 'Reset failed. Try again.');
      }
    } catch (err) {
      console.error('Reset error:', err);
      alert('Something went wrong. Please try again.');
    }
  };

  return (
    <div className="login-container">
      <div className="login-card">
        <div className="login-header">
          <div className="logo-row">
            <img src="/assets/GDOT Contractor.png" alt="G Symbol" className="logo-img" />
          </div>
          <p className="login-subtext">Reset Your Password</p>
        </div>

        <div className="login-box">
          <div className="input-wrapper">
            <Mail className="input-icon" />
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Enter Your Email"
              className="input-field"
            />
          </div>
          {emailError && (
            <p style={{ color: 'red', fontSize: '14px', marginTop: '4px' }}>{emailError}</p>
          )}

          <button className="login-button" onClick={handleResetPassword}>
            Send Reset Link
          </button>

          <div className="signup-link">
            <span>Back to </span>
            <button onClick={() => navigate('/login')}>Login</button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ForgotPasswordScreen;
