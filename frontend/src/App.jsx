// src/App.jsx
import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Application from './layers/Application';
import Lawyer from './layers/Lawyer';
import Case from "./layers/Case";


const App = () => {
  return (
    <Router>
      <Routes>
        <Route path="/basvurular" element={<Application />} />
        <Route path="/avukatlar" element={<Lawyer />} />
        <Route path="/davalar" element={<Case />} />
        {/* Diğer rotalar */}
      </Routes>
    </Router>
  );
};

export default App;
