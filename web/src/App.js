import React from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Landpage from './Landpage';
import LogIn from './LogIn';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<LogIn />}></Route>
        <Route path="/home" element={<Landpage />}></Route>    
      </Routes>  
    </BrowserRouter>
  );
}

export default App;