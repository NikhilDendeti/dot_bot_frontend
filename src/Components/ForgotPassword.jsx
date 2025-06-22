import '../Stylying/loginscreen.css';
import React, { useState, useEffect } from 'react';
import { Mail } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import LoadingOverlay from './LoadingOverlay';

const ForgotPasswordScreen = () => {
  const [email, setEmail] = useState('');
  const [emailError, setEmailError] = useState('');
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const checkAuth = async () => {
      const token = localStorage.getItem('authToken');
      if (!token) return;

      try {
        const res = await fetch('https://api-azjv7cvnxq-uc.a.run.app/get-chat-history', {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${token}`,
          },
        });

        if (res.status === 401 || res.status === 403) {
          localStorage.removeItem('authToken');
          navigate('/login');
        }
      } catch (err) {
        console.error('Auth check failed:', err);
      }
    };

    checkAuth();
  }, [navigate]);

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

    setLoading(true);
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
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="login-container">
      {loading && <LoadingOverlay />}

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
            <p className="error-text">{emailError}</p>
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
