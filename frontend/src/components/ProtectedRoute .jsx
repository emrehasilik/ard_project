import React from "react";
import { Navigate } from "react-router-dom";

const ProtectedRoute = ({ children }) => {
  const token = localStorage.getItem("token"); // Kullanıcı token'ı kontrol et

  if (!token) {
    console.log("Token yok");
    return <Navigate to="/" />; // Token yoksa login sayfasına yönlendir
  }

  return children; // Token varsa ilgili sayfayı göster
};

export default ProtectedRoute;
