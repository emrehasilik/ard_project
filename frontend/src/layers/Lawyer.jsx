import React, { useState, useEffect } from "react";
import Sidebar from "../components/Sidebar";
import AddLawyer from "../components/AddLawyer";
import Header from "../components/Header";
import useLawyerStore from "../stores/LawyerStore"; // Zustand Store'u ekle
import { FaEye, FaEyeSlash, FaCopy, FaTrash } from "react-icons/fa";


const Lawyer = () => {
  const [notification, setNotification] = useState("");
  const [confirmDelete, setConfirmDelete] = useState(null);
  const [showAddLawyer, setShowAddLawyer] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const [visiblePassword, setVisiblePassword] = useState(null);

  // Zustand Store'dan gerekli veriler ve fonksiyonları al
  const { lawyers, addLawyer, removeLawyer, fetchLawyers } = useLawyerStore();

  // Avukatları sayfa yüklendiğinde çek
  useEffect(() => {
    fetchLawyers();
  }, [fetchLawyers]);

  const handleSaveLawyer = (lawyerData) => {
    addLawyer(lawyerData);
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
    const fullName = `${lawyer.firstName} ${lawyer.lastName}`.toLowerCase();
    return (
      lawyer.nationalId.toLowerCase().includes(lowerCaseSearchTerm) ||
      lawyer.firstName.toLowerCase().includes(lowerCaseSearchTerm) ||
      lawyer.lastName.toLowerCase().includes(lowerCaseSearchTerm) ||
      fullName.includes(lowerCaseSearchTerm)
    );
  });

  return (
    <div className="flex h-screen bg-[#F5F5F5]">
      <Sidebar />
  
      <div className="flex-1 flex flex-col">
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
            <div className="bg-white p-6 rounded-lg border-2 border-[#D4AF37] shadow-lg">
              <p className="mb-4 text-gray-800">
                {confirmDelete.firstName} {confirmDelete.lastName} avukatını silmek istiyor musunuz?
              </p>
              <div className="flex justify-end space-x-4">
                <button
                  className="px-4 py-2 bg-gray-300 text-gray-800 rounded hover:bg-gray-400"
                  onClick={() => setConfirmDelete(null)}
                >
                  Hayır
                </button>
                <button
                  className="px-4 py-2 bg-red-500 text-white rounded hover:bg-red-600"
                  onClick={() => {
                    removeLawyer(confirmDelete.nationalId);
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
        <div className="bg-white flex-1 p-8 rounded-lg shadow-md">
          <div className="flex justify-between mb-4">
            <input
              type="text"
              placeholder="Avukat Ara"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="px-4 py-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-[#D4AF37] flex-grow mr-4"
            />
            <button
              className="px-4 py-2 bg-[#002855] text-white font-semibold rounded hover:bg-[#004080]"
              onClick={() => setShowAddLawyer(true)}
            >
              Avukat Ekle
            </button>
          </div>
  
          {/* Avukatlar Tablosu */}
          <div className="text-gray-700 max-h-[520px] overflow-y-auto">
            <table className="table-auto w-full border border-gray-300">
              <thead className="bg-[#002855] text-white">
                <tr>
                  <th className="border border-gray-300 px-4 py-2">T.C. Kimlik No</th>
                  <th className="border border-gray-300 px-4 py-2">Ad</th>
                  <th className="border border-gray-300 px-4 py-2">Soyad</th>
                  <th className="border border-gray-300 px-4 py-2">E-posta</th>
                  <th className="border border-gray-300 px-4 py-2">İşlem</th>
                </tr>
              </thead>
              <tbody>
                {filteredLawyers.map((lawyer, index) => (
                  <tr
                    key={index}
                    className={
                      index % 2 === 0 ? "bg-gray-100" : "bg-white"
                    }
                  >
                    <td className="border border-gray-300 px-4 py-2 text-center">
                      {lawyer.nationalId}
                    </td>
                    <td className="border border-gray-300 px-4 py-2 text-center">
                      {lawyer.firstName}
                    </td>
                    <td className="border border-gray-300 px-4 py-2 text-center">
                      {lawyer.lastName}
                    </td>
                    <td className="border border-gray-300 px-4 py-2 text-center">
                      {lawyer.mail}
                    </td>
                    <td className="border border-gray-300 px-4 py-2 text-center">
  <button
    className="p-2 bg-red-500 text-white rounded hover:bg-red-600 flex items-center justify-center"
    onClick={() =>
      setConfirmDelete({
        firstName: lawyer.firstName,
        lastName: lawyer.lastName,
        nationalId: lawyer.nationalId,
      })
    }
  >
    <FaTrash size={12}/>
  </button>
</td>
                  </tr>
                ))}
              </tbody>
            </table>
            {filteredLawyers.length === 0 && (
              <p className="text-center text-gray-500 mt-4">
                Henüz avukat eklenmedi.
              </p>
            )}
          </div>
        </div>
      </div>
  
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
