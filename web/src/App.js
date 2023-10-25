import React from 'react';
import { BrowserRouter, Route, Routes, Navigate } from 'react-router-dom';
import Landpage from './Landpage';
import LogIn from './LogIn';
import Register from './Register';


function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="" element={<Navigate to="/login" />}></Route>
        <Route path="/login" element={<LogIn />}></Route>
        <Route path="/register" element={<Register />}></Route>
        <Route path="/home" element={<Landpage />}></Route>
        <Route path="*" element={<PageNotFound />}></Route>    
      </Routes>  
    </BrowserRouter>
  );
}

function PageNotFound() {
  return (
    <div style={{ marginLeft: '20px' }}>
      <h1>404 Page not found</h1>
    </div>
  );
}

export default App;