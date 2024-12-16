import React, { useState, useEffect } from "react";
import Sidebar from "../components/Sidebar";
import AddLawyer from "../components/AddLawyer";
import Header from "../components/Header";
import useLawyerStore from "../stores/LawyerStore"; // Store'u ekle
import { FaEye, FaEyeSlash, FaCopy } from "react-icons/fa";

const Lawyer = () => {
  const [notification, setNotification] = useState("");
  const [confirmDelete, setConfirmDelete] = useState(null);
  const [showAddLawyer, setShowAddLawyer] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const [visiblePassword, setVisiblePassword] = useState(null); // Şifre görünürlüğü için state

  // Zustand Store'dan gerekli veriler ve fonksiyonları al
  const { lawyers, addLawyer, removeLawyer, getLawyer } = useLawyerStore();

  const handleSaveLawyer = (lawyerData) => {
    addLawyer(lawyerData); // Store'a yeni avukat ekle
    setShowAddLawyer(false);
  };

  const togglePasswordVisibility = (tcKimlikNo) => {
    setVisiblePassword((prev) => (prev === tcKimlikNo ? null : tcKimlikNo));
  };

  const copyToClipboard = (password) => {
    navigator.clipboard.writeText(password);
    setNotification("Şifre kopyalandı!");
    setTimeout(() => setNotification(""), 3000);
};

  const filteredLawyers = lawyers.filter((lawyer) => {
    const lowerCaseSearchTerm = searchTerm.toLowerCase();
    const fullName = `${lawyer.name} ${lawyer.surname}`.toLowerCase();
    return (
      lawyer.tcKimlikNo.toLowerCase().includes(lowerCaseSearchTerm) ||
      lawyer.name.toLowerCase().includes(lowerCaseSearchTerm) ||
      lawyer.surname.toLowerCase().includes(lowerCaseSearchTerm) ||
      fullName.includes(lowerCaseSearchTerm)
    );
  });

  useEffect(() => {
    // Örnek kullanım: İlk avukatı konsola yazdır
    if (lawyers.length > 0) {
      console.log(getLawyer(lawyers[0].tcKimlikNo));
    }
  }, [lawyers, getLawyer]);

  return (
    <div className="flex h-screen">
      {/* Sidebar */}
      <Sidebar />

      {/* Sağ İçerik Alanı */}
      <div className="flex-1 flex flex-col">
        {/* Header */}
        <Header />

        {/* Bildirim */}
        {notification && (
          <div className="fixed bottom-4 right-4 bg-green-500 text-white px-4 py-2 rounded shadow-lg">
            {notification}
          </div>
        )}

        {/* Silme Onayı Modal */}
        {confirmDelete && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center">
            <div className="bg-white p-6 rounded shadow-lg">
              <p className="mb-4">
                {confirmDelete.name} {confirmDelete.surname} avukatını silmek istiyor musunuz?
              </p>
              <div className="flex justify-end space-x-4">
                <button
                  className="px-4 py-2 bg-gray-300 rounded hover:bg-gray-400"
                  onClick={() => setConfirmDelete(null)}
                >
                  Hayır
                </button>
                <button
                  className="px-4 py-2 bg-red-500 text-white rounded hover:bg-red-600"
                  onClick={() => {
                    removeLawyer(confirmDelete.tcKimlikNo);
                    setConfirmDelete(null);
                  }}
                >
                  Evet
                </button>
              </div>
            </div>
          </div>
        )}

        {/* İçerik Alanı */}
        <div className="bg-gray-200 flex-1 p-8">
          <div className="flex justify-between mb-4">
            <input
              type="text"
              placeholder="Avukat Ara"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="px-4 py-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500 flex-grow mr-4"
            />
            <button
            className="px-4 py-2 bg-[#002855] text-white font-semibold rounded hover:bg-[#004080]"
            onClick={() => setShowAddLawyer(true)}
            >
              Avukat Ekle
            </button>
          </div>

          {/* Avukatlar Tablosu */}
          <div className="text-gray-700 max-h-[520px] w-full overflow-y-auto">
            <table className="table-auto w-full border border-gray-300">
              <thead className="bg-gray-100">
                <tr>
                  <th className="border border-gray-300 px-4 py-2">T.C. Kimlik No</th>
                  <th className="border border-gray-300 px-4 py-2">Ad</th>
                  <th className="border border-gray-300 px-4 py-2">Soyad</th>
                  <th className="border border-gray-300 px-4 py-2">Telefon</th>
                  <th className="border border-gray-300 px-4 py-2">E-posta</th>
                  <th className="border border-gray-300 px-4 py-2">İşlem</th>
                </tr>
              </thead>
              <tbody>
                {filteredLawyers.map((lawyer, index) => (
                  <tr
                    key={index}
                    className={index % 2 === 0 ? "bg-white" : "bg-gray-100"}
                  >
                    <td className="border border-gray-300 px-4 py-2">{lawyer.tcKimlikNo}</td>
                    <td className="border border-gray-300 px-4 py-2">{lawyer.name}</td>
                    <td className="border border-gray-300 px-4 py-2">{lawyer.surname}</td>
                    <td className="border border-gray-300 px-4 py-2">{lawyer.phone}</td>
                    <td className="border border-gray-300 px-4 py-2">{lawyer.email}</td>
                    <td className="border border-gray-300 px-4 py-2">
                      <div className="flex items-center space-x-2 relative">
                        <button
                          className="px-2 py-1 bg-red-500 text-white rounded hover:bg-red-600"
                          onClick={() => setConfirmDelete({ name: lawyer.name, surname: lawyer.surname, tcKimlikNo: lawyer.tcKimlikNo })}
                        >
                          Sil
                        </button>
                        <div
                          className="w-8 h-8 bg-gray-200 text-gray-700 rounded-full flex items-center justify-center cursor-pointer hover:bg-gray-300"
                          onClick={() => togglePasswordVisibility(lawyer.tcKimlikNo)}
                        >
                          {visiblePassword === lawyer.tcKimlikNo ? <FaEyeSlash /> : <FaEye />}
                        </div>
                        {visiblePassword === lawyer.tcKimlikNo && (
                          <div className="absolute top-10 left-0 bg-white text-gray-700 border border-gray-300 rounded px-2 py-1 shadow-lg flex items-center">
                            <span className="mr-2">{lawyer.password}</span>
                            <button
                              className="w-8 h-8 bg-blue-500 text-white rounded-full flex items-center justify-center hover:bg-blue-600"
                              onClick={() => copyToClipboard(lawyer.password)}
                            >
                              <FaCopy />
                            </button>
                          </div>
                        )}
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>

      {/* AddLawyer Modal */}
      {showAddLawyer && (
        <AddLawyer
          onClose={() => setShowAddLawyer(false)}
          onSave={handleSaveLawyer}
        />
      )}
    </div>
  );
};

export default Lawyer;
