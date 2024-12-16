// src/components/Sidebar.jsx

import React from "react";
import { Link } from "react-router-dom";

const Sidebar = () => {
  return (
    <div className="h-screen w-60 bg-[#002855] text-white shadow-md flex flex-col justify-between">
      {/* Üst Logo ve Menü Alanı */}
      <div>
     <div className="p-4 text-lg font-bold flex items-center border-b border-[#D4AF37]">
  <img
    src="/baro_logo.jpg"
    alt="Logo"
    className="w-24 h-24 object-cover border-2 border-[#D4AF37] rounded-full"
  />
  <span className="ml-3 text-white">BARO</span>
</div>


        <ul className="mt-4 space-y-2">
          <li className="py-2 px-4 hover:bg-[#D4AF37] hover:text-black cursor-pointer">
            <Link
              to="/basvurular"
              className="block w-full h-full"
            >
              Başvurular
            </Link>
          </li>
          <li className="py-2 px-4 hover:bg-[#D4AF37] hover:text-black cursor-pointer">
            <Link
              to="/avukatlar"
              className="block w-full h-full"
            >
              Avukatlar
            </Link>
          </li>
          <li className="py-2 px-4 hover:bg-[#D4AF37] hover:text-black cursor-pointer">
            <Link
              to="/davalar"
              className="block w-full h-full"
            >
              Davalar
            </Link>
          </li>
        </ul>
      </div>

      {/* Alt Menü */}
      <div className="p-4 border-t border-[#D4AF37]">
        <button className="w-full bg-[#D4AF37] text-black py-2 rounded hover:bg-[#B89B2F]">
          Logout
        </button>
      </div>
    </div>
  );
};

export default Sidebar;
