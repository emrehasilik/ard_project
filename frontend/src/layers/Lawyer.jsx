import React, { useState, useEffect } from "react";
import Sidebar from "../components/Sidebar";
import AddLawyer from "../components/AddLawyer";
import Header from "../components/Header";
import useLawyerStore from "../stores/LawyerStore"; // Zustand Store'u ekle
import { FaEye, FaEyeSlash, FaCopy } from "react-icons/fa";

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
    <div className="flex h-screen">
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
            <div className="bg-white p-6 rounded shadow-lg">
              <p className="mb-4">
                {confirmDelete.firstName} {confirmDelete.lastName} avukatını silmek istiyor musunuz?
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
                  <th className="border border-gray-300 px-4 py-2">E-posta</th>
                  <th className="border border-gray-300 px-4 py-2">İşlem</th>
                </tr>
              </thead>
              <tbody>
                {filteredLawyers.map((lawyer, index) => (
                  <tr key={index} className={index % 2 === 0 ? "bg-white" : "bg-gray-100"}>
                    <td className="border border-gray-300 px-4 py-2">{lawyer.nationalId}</td>
                    <td className="border border-gray-300 px-4 py-2">{lawyer.firstName}</td>
                    <td className="border border-gray-300 px-4 py-2">{lawyer.lastName}</td>
                    <td className="border border-gray-300 px-4 py-2">{lawyer.mail}</td>
                    <td className="border border-gray-300 px-4 py-2">
                      <button
                        className="px-2 py-1 bg-red-500 text-white rounded hover:bg-red-600"
                        onClick={() =>
                          setConfirmDelete({
                            firstName: lawyer.firstName,
                            lastName: lawyer.lastName,
                            nationalId: lawyer.nationalId,
                          })
                        }
                      >
                        Sil
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
            {filteredLawyers.length === 0 && (
              <p className="text-center text-gray-500 mt-4">Henüz avukat eklenmedi.</p>
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
