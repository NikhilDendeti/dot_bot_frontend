import '../Stylying/loginscreen.css'
import React, { useState } from 'react';
import { Mail, Lock, Eye, EyeOff } from 'lucide-react';

const LoginScreen = ({ onLogin, onSignUp, onForgotPassword }) => {
  const [showPassword, setShowPassword] = useState(false);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

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
          {/* Social buttons */}
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

          <div className="forgot-password">
            <button onClick={onForgotPassword}>Forgot Password?</button>
          </div>

          <button className="login-button" onClick={onLogin}>Login</button>

          <div className="signup-link">
            <span>Don't Have Account? </span>
            <button onClick={onSignUp}>Sign Up</button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LoginScreen;
