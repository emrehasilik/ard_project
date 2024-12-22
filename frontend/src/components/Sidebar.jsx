import React from "react";
import { Link } from "react-router-dom";

const Sidebar = () => {
  return (
    <div className="h-screen w-64 bg-gradient-to-b from-[#0A2637] to-[#144272] text-white shadow-xl flex flex-col justify-between">
      {/* Üst Logo ve Menü Alanı */}
      <div>
        <div className="p-5 text-xl font-bold flex items-center border-b border-[#C9A23E]">
          <img
            src="/baro_logo.jpg"
            alt="Logo"
            className="w-20 h-20 object-cover border-2 border-[#C9A23E] rounded-full"
          />
          <span className="ml-4 text-[#C9A23E]">BARO</span>
        </div>

        <ul className="mt-6 space-y-3">
          <li className="py-2 px-5 hover:bg-[#C9A23E] hover:text-black cursor-pointer rounded-md">
            <Link to="/avukatlar" className="block w-full h-full">
              Avukatlar
            </Link>
          </li>
          <li className="py-2 px-5 hover:bg-[#C9A23E] hover:text-black cursor-pointer rounded-md">
            <Link to="/basvurular" className="block w-full h-full">
              Başvurular
            </Link>
          </li>

          <li className="py-2 px-5 hover:bg-[#C9A23E] hover:text-black cursor-pointer rounded-md">
            <Link to="/davalar" className="block w-full h-full">
              Davalar
            </Link>
          </li>
        </ul>
      </div>

      {/* Alt Menü */}
      <div className="p-5 border-t border-[#C9A23E]">
        <button className="w-full bg-[#C9A23E] text-black py-2 rounded-md hover:bg-[#A78936]">
          Çıkış Yap
        </button>
      </div>
    </div>
  );
};

export default Sidebar;
