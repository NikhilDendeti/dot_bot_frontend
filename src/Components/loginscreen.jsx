import '../Stylying/loginscreen.css';
import React, { useState } from 'react';
import { Mail, Lock, Eye, EyeOff } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

const LoginScreen = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [emailError, setEmailError] = useState('');
  const [passwordError, setPasswordError] = useState('');
  const navigate = useNavigate();

  const validateInputs = () => {
    let isValid = true;
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    if (!email || !emailRegex.test(email)) {
      setEmailError('Please enter a valid email address.');
      isValid = false;
    } else {
      setEmailError('');
    }

    if (!password || password.length < 6) {
      setPasswordError('Password must be at least 6 characters.');
      isValid = false;
    } else {
      setPasswordError('');
    }

    return isValid;
  };

  const handleLogin = async () => {
    if (!validateInputs()) return;

    try {
      const idToken = "<FIREBASE_ID_TOKEN>"; // Replace with actual Firebase Auth token

      const res = await fetch('https://api-azjv7cvnxq-uc.a.run.app/auth/social-login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ idToken }),
      });

      const data = await res.json();
      if (res.ok) {
        localStorage.setItem('authToken', idToken);
        navigate('/home');
      } else {
        alert(data.message || 'Login failed');
      }
    } catch (err) {
      console.error('Login error:', err);
      alert('Something went wrong. Please try again.');
    }
  };

  const handleSignup = () => {
    navigate('/signup');
  };

  const handleForgotPassword = () => {
    navigate('/forgotpassword');
  };

  return (
    <div className="login-container">
      <div className="login-card">
        <div className="login-header">
          <div className="logo-row">
            <img src="/assets/GDOT Contractor.png" alt="G Symbol" className="logo-img" />
          </div>
          <p className="login-subtext">Please Login To Your Account</p>
        </div>

        <div className="login-box">
          <div className="social-buttons">
            <button className="social-button">
              <img src="/assets/Vector (2).png" alt="Google" className="icon-img" />
            </button>
            <button className="social-button">
              <img src="/assets/Vector (1).png" alt="Facebook" className="icon-img" />
            </button>
            <button className="social-button">
              <img src="/assets/Vector.png" alt="Apple" className="icon-img" />
            </button>
          </div>

          <div className="divider">
            <div className="line" />
            <span className="or-text">or</span>
            <div className="line" />
          </div>

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
          {emailError && <p style={{ color: 'red', fontSize: '14px', marginTop: '4px' }}>{emailError}</p>}

          <div className="input-wrapper">
            <Lock className="input-icon" />
            <input
              type={showPassword ? 'text' : 'password'}
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Enter Your Password"
              className="input-field"
            />
            <button
              type="button"
              onClick={() => setShowPassword(!showPassword)}
              className="eye-toggle"
            >
              {showPassword ? <EyeOff className="eye-icon" /> : <Eye className="eye-icon" />}
            </button>
          </div>
          {passwordError && <p style={{ color: 'red', fontSize: '14px', marginTop: '4px' }}>{passwordError}</p>}

          <div className="forgot-password">
            <button onClick={handleForgotPassword}>Forgot Password?</button>
          </div>

          <button className="login-button" onClick={handleLogin}>
            Login
          </button>

          <div className="signup-link">
            <span>Don't Have Account? </span>
            <button onClick={handleSignup}>Sign Up</button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LoginScreen;
