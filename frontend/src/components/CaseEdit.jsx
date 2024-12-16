import React, { useState } from "react";

const CaseEdit = ({ caseItem, onSave, onCancel }) => {
  const [editedCase, setEditedCase] = useState({ ...caseItem });

  const handleInputChange = (e) => {
    const { id, value } = e.target;
    if (id.startsWith("detaylar.")) {
      const key = id.split(".")[1];
      setEditedCase({
        ...editedCase,
        detaylar: { ...editedCase.detaylar, [key]: value },
      });
    } else {
      setEditedCase({ ...editedCase, [id]: value });
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onSave(editedCase);
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center">
      <div className="bg-white p-8 rounded shadow-lg w-3/4">
        <h2 className="text-xl font-bold mb-4">Dava Düzenle</h2>
        <form onSubmit={handleSubmit}>
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-gray-700 mb-2" htmlFor="adi">
                Adı
              </label>
              <input
                type="text"
                id="adi"
                className="w-full p-2 border border-gray-300 rounded"
                value={editedCase.adi}
                onChange={handleInputChange}
              />
            </div>
            <div>
              <label className="block text-gray-700 mb-2" htmlFor="soyadi">
                Soyadı
              </label>
              <input
                type="text"
                id="soyadi"
                className="w-full p-2 border border-gray-300 rounded"
                value={editedCase.soyadi}
                onChange={handleInputChange}
              />
            </div>
            <div>
              <label className="block text-gray-700 mb-2" htmlFor="ihlalNedeni">
                İhlal Nedeni
              </label>
              <input
                type="text"
                id="ihlalNedeni"
                className="w-full p-2 border border-gray-300 rounded"
                value={editedCase.ihlalNedeni}
                onChange={handleInputChange}
              />
            </div>
            <div>
              <label className="block text-gray-700 mb-2" htmlFor="detaylar.takipAvukat">
                Takip Eden Avukat
              </label>
              <input
                type="text"
                id="detaylar.takipAvukat"
                className="w-full p-2 border border-gray-300 rounded"
                value={editedCase.detaylar.takipAvukat}
                onChange={handleInputChange}
              />
            </div>
            <div>
              <label className="block text-gray-700 mb-2" htmlFor="detaylar.basvuruTarihi">
                Başvuru Tarihi
              </label>
              <input
                type="date"
                id="detaylar.basvuruTarihi"
                className="w-full p-2 border border-gray-300 rounded"
                value={editedCase.detaylar.basvuruTarihi}
                onChange={handleInputChange}
              />
            </div>
          </div>
          <div className="flex justify-end mt-4">
            <button
              type="button"
              className="px-4 py-2 bg-gray-300 text-gray-700 rounded mr-2"
              onClick={onCancel}
            >
              İptal
            </button>
            <button
              type="submit"
              className="px-4 py-2 bg-blue-500 text-white rounded"
            >
              Kaydet
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default CaseEdit;
