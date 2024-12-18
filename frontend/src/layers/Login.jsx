import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { FaUser, FaLock } from "react-icons/fa";

const Login = () => {
  const [formData, setFormData] = useState({ username: "", password: "" });
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (formData.username === "admin" && formData.password === "1234") {
      navigate("/basvurular"); // Başarı durumunda rota değiştir
    } else {
      setError("Geçersiz kullanıcı adı veya şifre!");
    }
  };

  return (
    <div className="flex h-screen bg-[#002855] items-center justify-center">
      <div className="w-full max-w-md bg-white rounded-lg shadow-md p-8 border-2 border-[#D4AF37]">
        <h2 className="text-2xl font-bold text-center text-[#002855] mb-6">Baro Komisyonu</h2>
        <form onSubmit={handleSubmit}>
          {/* Kullanıcı Adı */}
          <div className="mb-4">
            <label
              htmlFor="username"
              className="block text-gray-700 font-semibold mb-2"
            >
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

          {/* Şifre */}
          <div className="mb-4">
            <label
              htmlFor="password"
              className="block text-gray-700 font-semibold mb-2"
            >
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

          {/* Hata Mesajı */}
          {error && <p className="text-red-500 mb-4 text-sm">{error}</p>}

          {/* Giriş Butonu */}
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
