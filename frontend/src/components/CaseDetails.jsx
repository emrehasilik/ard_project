import React from "react";
import { AiOutlineClose } from "react-icons/ai";

const CaseDetails = ({ selectedDetails, onClose }) => {
  if (!selectedDetails) return null; // Eğer detay yoksa render edilmez.

  return (
    <div className="w-full bg-white shadow-lg rounded-lg p-4 mt-4 overflow-y-auto max-h-[250px]">
      <div>
        <div className="flex justify-between items-center mb-4">
          <h3 className="text-xl font-bold text-gray-800">Başvuru Bilgileri</h3>
          <button
            className="w-8 h-8 bg-red-500 text-white rounded-full flex items-center justify-center hover:bg-red-600"
            onClick={onClose}
          >
            <AiOutlineClose size={20} />
          </button>
        </div>
        <div className="grid grid-cols-1 gap-4 text-gray-700 text-sm">
          <p>
            <strong>Başvuru Numarası:</strong> {selectedDetails.basvuruNumarasi}
          </p>
          <p>
            <strong>Başvuran Türü:</strong> {selectedDetails.basvuranTuru}
          </p>
          <p>
            <strong>Başvuru Tarihi:</strong> {selectedDetails.basvuruTarihi}
          </p>
          <p>
            <strong>Başvuruyu Alan:</strong> {selectedDetails.basvuruyuAlan}
          </p>
          <p>
            <strong>Takip Eden Avukat:</strong> {selectedDetails.takipAvukat}
          </p>
          <p>
            <strong>Açıklama:</strong> {selectedDetails.dosyaAciklama}
          </p>
        </div>
        {selectedDetails.davaBilgileri && (
          <div className="mt-4 grid grid-cols-1 gap-4 text-gray-700 text-sm">
            <h3 className="text-xl font-bold text-gray-800">Dava Bilgileri</h3>
            <p>
              <strong>Dosya Numarası:</strong> {selectedDetails.davaBilgileri.dosyaNumarasi}
            </p>
            <p>
              <strong>Mahkeme:</strong> {selectedDetails.davaBilgileri.mahkeme}
            </p>
            <p>
              <strong>Mahkeme Dosya Numarası:</strong>{" "}
              {selectedDetails.davaBilgileri.mahkemeDosyaNo}
            </p>
            <p>
              <strong>Sonuç Açıklama:</strong>{" "}
              {selectedDetails.davaBilgileri.sonucuAciklama}
            </p>
            <p>
              <strong>Sonuç Aşama:</strong> {selectedDetails.davaBilgileri.sonucuAsama}
            </p>
          </div>
        )}
      </div>
    </div>
  );
};

export default CaseDetails;
