import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { FaUser, FaLock } from "react-icons/fa";

const Login = () => {
  const [formData, setFormData] = useState({ username: "", password: "" });
  const [error, setError] = useState("");
  const [successMessage, setSuccessMessage] = useState(""); // Avukat girişi başarılı mesajı için state
  const navigate = useNavigate();

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setSuccessMessage("");
  try {
  const response = await axios.post("http://localhost:5000/auth/login", {
    username: formData.username,
    password: formData.password,
  });

  if (response.status === 200 && response.data.token) {
    const token = response.data.token;
    localStorage.setItem("token", token);

    // Kullanıcı rolüne göre yönlendirme
    const decodedToken = JSON.parse(atob(token.split(".")[1]));
    const userRole = decodedToken.role[0];
    console.log(userRole);
    if (userRole === "Baro") {
      navigate("/basvurular");
    } else if (userRole === "lawyer") {
      navigate("/avukataccess");
    } else {
      setError("Geçersiz kullanıcı rolü!");
    }
  } else {
    setError("Beklenmeyen bir hata oluştu.");
  }
} catch (err) {
  if (err.response && err.response.status === 401) {
    setError("Geçersiz kullanıcı adı veya şifre!");
  } else {
    setError("Sunucuya bağlanırken bir hata oluştu!");
  }
}

  };

  return (
    <div
      className="flex h-screen bg-cover bg-center items-center justify-center"
      style={{ backgroundImage: "url('/loginpages.jpg')" }}
    >
      <div className="w-full max-w-md bg-white rounded-lg shadow-lg p-10 border-t-4 border-[#D4AF37]">
        <h2 className="text-3xl font-bold text-center text-[#002855] mb-8">
          Baro Komisyonu Giriş
        </h2>
        <form onSubmit={handleSubmit}>
          {/* Kullanıcı Adı */}
          <div className="mb-6">
            <label
              htmlFor="username"
              className="block text-gray-700 font-medium mb-2"
            >
              Kullanıcı Adı
            </label>
            <div className="flex items-center border border-gray-300 rounded-lg bg-gray-50 focus-within:ring-2 focus-within:ring-[#D4AF37]">
              <span className="px-4 text-gray-500">
                <FaUser />
              </span>
              <input
                type="text"
                id="username"
                name="username"
                value={formData.username}
                onChange={handleInputChange}
                className="w-full p-3 focus:outline-none bg-transparent"
                placeholder="Kullanıcı adınızı girin"
              />
            </div>
          </div>

          {/* Şifre */}
          <div className="mb-6">
            <label
              htmlFor="password"
              className="block text-gray-700 font-medium mb-2"
            >
              Şifre
            </label>
            <div className="flex items-center border border-gray-300 rounded-lg bg-gray-50 focus-within:ring-2 focus-within:ring-[#D4AF37]">
              <span className="px-4 text-gray-500">
                <FaLock />
              </span>
              <input
                type="password"
                id="password"
                name="password"
                value={formData.password}
                onChange={handleInputChange}
                className="w-full p-3 focus:outline-none bg-transparent"
                placeholder="Şifrenizi girin"
              />
            </div>
          </div>

          {/* Hata Mesajı */}
          {error && (
            <p className="text-red-500 text-center mb-6 text-sm">{error}</p>
          )}

          {/* Başarı Mesajı (Avukat girişi) */}
          {successMessage && (
            <p className="text-green-600 text-center mb-6 text-sm">
              {successMessage}
            </p>
          )}

          {/* Giriş Butonu */}
          <button
            type="submit"
            className="w-full bg-[#D4AF37] hover:bg-[#B89B2F] text-white font-semibold py-3 px-6 rounded-lg focus:outline-none transition-all duration-200"
          >
            Giriş Yap
          </button>
        </form>
      </div>
    </div>
  );
};

export default Login;
