import '../Stylying/loginscreen.css';
import React, { useState } from 'react';
import { User, Mail, Lock, Eye, EyeOff } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

const SignupScreen = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const [nameError, setNameError] = useState('');
  const [emailError, setEmailError] = useState('');
  const [passwordError, setPasswordError] = useState('');

  const navigate = useNavigate();

  const validateInputs = () => {
    let isValid = true;
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    const nameRegex = /^[a-zA-Z\s]{2,}$/;

    if (!name.trim()) {
      setNameError('Name is required.');
      isValid = false;
    } else if (!nameRegex.test(name.trim())) {
      setNameError('Invalid Name');
      isValid = false;
    } else {
      setNameError('');
    }

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

  const handleSignup = async () => {
    if (!validateInputs()) return;

    try {
      const res = await fetch('https://api-azjv7cvnxq-uc.a.run.app/auth/signup', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          email,
          password,
          username: name,
        }),
      });

      const data = await res.json();
      if (res.ok) {
        alert('Signup successful! Please login.');
        navigate('/login');
      } else {
        alert(data.message || 'Signup failed');
      }
    } catch (err) {
      console.error('Signup error:', err);
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
          <p className="login-subtext">Please Sign Up To Your Account</p>
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
            <User className="input-icon" />
            <input
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="Enter Your Name"
              className="input-field"
            />
          </div>
          {nameError && <p style={{ color: 'red', fontSize: '14px', marginTop: '4px' }}>{nameError}</p>}

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
              {showPassword ? <Eye className="eye-icon" /> : <EyeOff className="eye-icon" />}
            </button>
          </div>
          {passwordError && <p style={{ color: 'red', fontSize: '14px', marginTop: '4px' }}>{passwordError}</p>}

          <button className="login-button" onClick={handleSignup}>
            Create Account
          </button>

          <div className="signup-link">
            <span>Already Have Account? </span>
            <button onClick={() => navigate('/login')}>Login</button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SignupScreen;
