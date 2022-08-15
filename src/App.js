import React from 'react';
import { Dashboard, Error, AuthWrapper, Login, PrivateRoute } from './pages';
import {BrowserRouter as Router, Routes, Route} from 'react-router-dom';

const App = () => {
  return (
    <AuthWrapper>
      <Router>
        <Routes>
          <Route path='/' element={
            <PrivateRoute>
            <Dashboard />
            </PrivateRoute>
          } />
          <Route path='/login' element={<Login />} />
          <Route path='*' element={<Error />} />
        </Routes>
      </Router>
    </AuthWrapper>
  )
}

export default App
