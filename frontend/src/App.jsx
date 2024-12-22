import React from "react";
import { Routes, Route } from "react-router-dom";
import Application from "./layers/Application";
import Lawyer from "./layers/Lawyer";
import Case from "./layers/Case";
import Login from "./layers/Login";
import LawyerAccess from "./layers/lawyerAccess"; // Yeni bileşeni import ediyoruz
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
          <ProtectedRoute requiredRole="Baro">
            <Application />
          </ProtectedRoute>
        }
      />
      <Route
        path="/avukatlar"
        element={
          <ProtectedRoute requiredRole="Baro">
            <Lawyer />
          </ProtectedRoute>
        }
      />
      <Route
        path="/davalar"
        element={
          <ProtectedRoute requiredRole="lawyer">
            <Case />
          </ProtectedRoute>
        }
      />
      <Route
        path="/avukataccess"
        element={
       
            <LawyerAccess />
    
        }
      />
    </Routes>
  );
};

export default App;
