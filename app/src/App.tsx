import React, { ReactElement } from 'react';
import {
  BrowserRouter as Router,
  Routes,
  Route,
} from 'react-router-dom';
import LoginPage from './page/LoginPage';

function App(): ReactElement {
  return (
    <Router>
      <Routes>
        <Route path='/' element={<LoginPage/>}/>
      </Routes>
    </Router>
  );
}

export default App;