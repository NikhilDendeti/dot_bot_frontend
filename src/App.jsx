import React, { useEffect, useState } from 'react';
import { BrowserRouter, Route, Routes, Navigate } from 'react-router-dom';
import { getAuth, onAuthStateChanged } from './auth/firebase';

import SplashScreen from './Components/splashscreen';
import LoginScreen from './Components/loginscreen';
import SignupScreen from './Components/signupscreen';
import HomeScreen from './Components/Homepage';
import ChatScreen from './Components/Chatscreen';
import PageNotFound from './Components/PageNotFound';
import ForgotPasswordScreen from './Components/ForgotPassword';
import CreateNewChatScreen from './Components/CreateNewChatScreen';

const ProtectedRoute = ({ children }) => {
  const [loading, setLoading] = useState(true);
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(getAuth(), (user) => {
      setIsAuthenticated(!!user);
      setLoading(false);
    });

    return () => unsubscribe();
  }, []);

  if (loading) return <div>Loading...</div>;
  return isAuthenticated ? children : <Navigate to="/login" />;
};

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<SplashScreen />} />
        <Route path="/login" element={<LoginScreen />} />
        <Route path="/signup" element={<SignupScreen />} />
        <Route path="/forgotpassword" element={<ForgotPasswordScreen />} />

        <Route
          path="/home"
          element={
            <ProtectedRoute>
              <HomeScreen />
            </ProtectedRoute>
          }
        />
        <Route
          path="/chat"
          element={
            <ProtectedRoute>
              <ChatScreen />
            </ProtectedRoute>
          }
        />
        <Route
          path="/create-chat"
          element={
            <ProtectedRoute>
              <CreateNewChatScreen />
            </ProtectedRoute>
          }
        />
        <Route path="*" element={<PageNotFound />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
