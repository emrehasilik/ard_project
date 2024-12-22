import React from "react";
import { useLocation } from "react-router-dom";

const Header = () => {
  const location = useLocation();

  // Sayfa başlıklarını belirlemek için bir mapping yapıyoruz
  const pageTitles = {
    "/basvurular": "Başvurular",
    "/avukatlar": "Avukatlar",
    "/davalar": "Davalar",
  };

  // Anlık yol için başlık belirleniyor
  const title = pageTitles[location.pathname] || "Sayfa";

  return (
    <div className="bg-gradient-to-r from-[#0A2637] to-[#144272] p-4 shadow-xl flex justify-between items-center border-b-4 border-[#C9A23E]">
      <h1 className="text-2xl font-bold text-white">{title}</h1>
    </div>
  );
};

export default Header;