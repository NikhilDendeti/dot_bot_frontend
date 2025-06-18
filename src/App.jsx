import React from 'react'
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import SplashScreen from './Components/splashscreen'
import LoginScreen from './Components/loginscreen'
import SignupScreen from './Components/signupscreen'
import HomeScreen from './Components/Homepage'
import ChatScreen from './Components/Chatscreen'
import PageNotFound from './Components/PageNotFound'

function App() {
  return (
    <BrowserRouter>
    <Routes>
      <Route path="/" element={<SplashScreen />}/>
      <Route path="/login" element={<LoginScreen />}/>
      <Route path="/signup" element={<SignupScreen />}/>
      <Route path="/home" element={<HomeScreen />}/>
      <Route path="/chat" element={<ChatScreen />}/>
      <Route path="*" element={<PageNotFound />}/>
      </Routes>
    </BrowserRouter>
    
  )
}

export default App