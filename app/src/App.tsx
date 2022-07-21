import React, { ReactElement } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import LoginPage from './page/LoginPage';
import LoginCallbackPage from './page/LoginCallbackPage';

function App(): ReactElement {
  return (
    <Router>
      <Routes>
        <Route path='/' element={<LoginPage />} />
        <Route path='/login/callback' element={<LoginCallbackPage />} />
      </Routes>
    </Router>
  );
}

export default App;
