import React from 'react';
import { Routes, Route, useNavigate } from 'react-router-dom';
import Login from './components/login';
import Home from './container/Home';
import { GoogleOAuthProvider } from '@react-oauth/google';

const App = () => {
  return (
    <GoogleOAuthProvider clientId="207995127249-vpk23f1fqpun1h2i7m0goivdnvojlhrs.apps.googleusercontent.com">
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/*" element={<Home />} />
      </Routes>
    </GoogleOAuthProvider>
  );
};

export default App;
