import '../Stylying/loginscreen.css';
import React, { useState } from 'react';
import { User, Mail, Lock, Eye, EyeOff } from 'lucide-react';

const SignupScreen = ({ onSignup, onLogin }) => {
  const [showPassword, setShowPassword] = useState(false);
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

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
              {showPassword ? <Eye className="eye-icon" />:<EyeOff className="eye-icon" />  }
            </button>
          </div>

          <button className="login-button" onClick={onSignup}>Create Account</button>

          <div className="signup-link">
            <span>Already Have Account? </span>
            <button onClick={onLogin}>Login</button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SignupScreen;
