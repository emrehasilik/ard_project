import React from "react";
import { Routes, Route } from "react-router-dom";
import Application from "./layers/Application";
import Lawyer from "./layers/Lawyer";
import Case from "./layers/Case";

const App = () => {
  return (
    <Routes>
      <Route path="/basvurular" element={<Application />} />
      <Route path="/avukatlar" element={<Lawyer />} />
      <Route path="/davalar" element={<Case />} />
    </Routes>
  );
};

export default App;
