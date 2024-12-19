import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "../axiosInstance"; // Axios instance import edildi
import { FaUser, FaLock } from "react-icons/fa";

const Login = () => {
  const [formData, setFormData] = useState({ username: "", password: "" });
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post("/api/auth/login", formData); // Axios instance kullanılıyor
      if (response.status === 200) {
        navigate("/basvurular"); // Giriş başarılı olursa yönlendir
      }
    } catch (error) {
      setError(error.response?.data?.message || "Bir hata oluştu! Lütfen tekrar deneyin.");
    }
  };

  return (
    <div className="flex h-screen bg-[#002855] items-center justify-center">
      <div className="w-full max-w-md bg-white rounded-lg shadow-md p-8 border-2 border-[#D4AF37]">
        <h2 className="text-2xl font-bold text-center text-[#002855] mb-6">Baro Komisyonu</h2>
        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label htmlFor="username" className="block text-gray-700 font-semibold mb-2">
              Kullanıcı Adı
            </label>
            <div className="flex items-center border border-gray-300 rounded">
              <span className="px-3 text-gray-500">
                <FaUser />
              </span>
              <input
                type="text"
                id="username"
                name="username"
                value={formData.username}
                onChange={handleInputChange}
                className="w-full p-2 focus:outline-none"
                placeholder="Kullanıcı adınızı girin"
              />
            </div>
          </div>
          <div className="mb-4">
            <label htmlFor="password" className="block text-gray-700 font-semibold mb-2">
              Şifre
            </label>
            <div className="flex items-center border border-gray-300 rounded">
              <span className="px-3 text-gray-500">
                <FaLock />
              </span>
              <input
                type="password"
                id="password"
                name="password"
                value={formData.password}
                onChange={handleInputChange}
                className="w-full p-2 focus:outline-none"
                placeholder="Şifrenizi girin"
              />
            </div>
          </div>
          {error && <p className="text-red-500 mb-4 text-sm">{error}</p>}
          <button
            type="submit"
            className="w-full bg-[#D4AF37] hover:bg-[#B89B2F] text-black font-semibold py-2 px-4 rounded focus:outline-none"
          >
            Giriş Yap
          </button>
        </form>
      </div>
    </div>
  );
};

export default Login;
