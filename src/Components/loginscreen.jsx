import '../Stylying/loginscreen.css';
import React, { useState } from 'react';
import { Mail, Lock, Eye, EyeOff } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { getAuth, signInWithEmailAndPassword, signInWithPopup, GoogleAuthProvider, FacebookAuthProvider } from 'firebase/auth';
import { initializeApp } from 'firebase/app';
import { firebaseConfig } from '../auth/firebase';

initializeApp(firebaseConfig);

const LoginScreen = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [emailError, setEmailError] = useState('');
  const [passwordError, setPasswordError] = useState('');
  const navigate = useNavigate();
  const auth = getAuth();

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
      const userCredential = await signInWithEmailAndPassword(auth, email, password);
      const idToken = await userCredential.user.getIdToken();

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
      const errorCode = err.code;
      if (errorCode === 'auth/user-not-found') {
        setEmailError('No account found with this email.');
      } else if (errorCode === 'auth/wrong-password') {
        setPasswordError('Incorrect password.');
      } else if (errorCode === 'auth/invalid-email') {
        setEmailError('Invalid email address format.');
      } else if (errorCode === 'auth/too-many-requests') {
        alert('Too many login attempts. Please try again later.');
      } else {
        alert('Login failed. Please try again.');
      }
    }
  };

  const handleSocialLogin = async (providerType) => {
    try {
      const provider = providerType === 'google' ? new GoogleAuthProvider() : new FacebookAuthProvider();
      const result = await signInWithPopup(auth, provider);
      const idToken = await result.user.getIdToken();

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
        alert(data.message || 'Social login failed');
      }
    } catch (error) {
      if (error.code !== 'auth/popup-closed-by-user') {
        alert('Social login failed. Please try again.');
      }
    }
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
            <button className="social-button" onClick={() => handleSocialLogin('google')}>
              <img src="/assets/Vector (2).png" alt="Google" className="icon-img" />
            </button>
            <button className="social-button" onClick={() => handleSocialLogin('facebook')}>
              <img src="/assets/Vector (1).png" alt="Facebook" className="icon-img" />
            </button>
            <button className="social-button" disabled>
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
            <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} placeholder="Enter Your Email" className="input-field" />
          </div>
          {emailError && <p className="error-text">{emailError}</p>}

          <div className="input-wrapper">
            <Lock className="input-icon" />
            <input type={showPassword ? 'text' : 'password'} value={password} onChange={(e) => setPassword(e.target.value)} placeholder="Enter Your Password" className="input-field" />
            <button type="button" onClick={() => setShowPassword(!showPassword)} className="eye-toggle">
              {showPassword ? <Eye className="eye-icon" /> : <EyeOff className="eye-icon" />}
            </button>
          </div>
          {passwordError && <p className="error-text">{passwordError}</p>}

          <div className="forgot-password">
            <button onClick={() => navigate('/forgotpassword')}>Forgot Password?</button>
          </div>

          <button className="login-button" onClick={handleLogin}>Login</button>

          <div className="signup-link">
            <span>Don't Have Account? </span>
            <button onClick={() => navigate('/signup')}>Sign Up</button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LoginScreen;
