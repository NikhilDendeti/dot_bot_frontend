import React from 'react';
import { BrowserRouter, Route, Routes, Navigate } from 'react-router-dom';

import SplashScreen from './Components/splashscreen';
import LoginScreen from './Components/loginscreen';
import SignupScreen from './Components/signupscreen';
import HomeScreen from './Components/Homepage';
import ChatScreen from './Components/Chatscreen';
import PageNotFound from './Components/PageNotFound';
import ForgotPasswordScreen from './Components/ForgotPassword';
import CreateNewChatScreen from './Components/CreateNewChatScreen';


const ProtectedRoute = ({ children }) => {
  const isAuthenticated = true; // <-- Change to `false` to test redirection
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
         <Route path='create-chat' element={<CreateNewChatScreen />} />
        <Route path="*" element={<PageNotFound />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
