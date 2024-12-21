import React from "react";
import { Routes, Route } from "react-router-dom";
import Application from "./layers/Application";
import Lawyer from "./layers/Lawyer";
import Case from "./layers/Case";
import Login from "./layers/Login"; 
import ProtectedRoute from "./components/ProtectedRoute "; 

const App = () => {
  return (
    <Routes>
      {/* Login Sayfası */}
      <Route path="/" element={<Login />} />

      {/* Korunan Sayfalar */}
      <Route
        path="/basvurular"
        element={
          <ProtectedRoute>
            <Application />
          </ProtectedRoute>
        }
      />
      <Route
        path="/avukatlar"
        element={
          <ProtectedRoute>
            <Lawyer />
          </ProtectedRoute>
        }
      />
      <Route
        path="/davalar"
        element={
          <ProtectedRoute>
            <Case />
          </ProtectedRoute>
        }
      />
    </Routes>
  );
};  

export default App;
