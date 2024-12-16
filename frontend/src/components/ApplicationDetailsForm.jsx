// src/components/DetailsForm.jsx

import React from 'react';

const DetailsForm = ({ formData, handleInputChange, handleCourtInfoChange, isCourtInfoAvailable, setIsCourtInfoAvailable }) => {
    return (
        <div>
            <input
                type="checkbox"
                id="davaBilgileri"
                className="mr-2"
                checked={isCourtInfoAvailable}
                onChange={() => setIsCourtInfoAvailable(!isCourtInfoAvailable)}
            />
            <label htmlFor="davaBilgileri" className="text-purple-600 font-semibold">
                Dava Bilgileri Mevcut
            </label>

            {isCourtInfoAvailable && (
                <div className="border border-gray-300 rounded mt-4 p-4">
                    {/* Dosya Numarası */}
                    <div className="mb-4">
                        <label className="block text-gray-700 mb-2" htmlFor="dosyaNumarasi">
                            Dosya Numarası
                        </label>
                        <input
                            type="text"
                            id="dosyaNumarasi"
                            className="w-full p-2 border border-gray-300 rounded"
                            placeholder="Dosya numarasını girin"
                            value={formData.detaylar.davaBilgileri.dosyaNumarasi}
                            onChange={handleCourtInfoChange}
                        />
                    </div>

                    {/* Mahkeme */}
                    <div className="mb-4">
                        <label className="block text-gray-700 mb-2" htmlFor="mahkeme">
                            Mahkeme
                        </label>
                        <input
                            type="text"
                            id="mahkeme"
                            className="w-full p-2 border border-gray-300 rounded"
                            placeholder="Mahkeme adı"
                            value={formData.detaylar.davaBilgileri.mahkeme}
                            onChange={handleCourtInfoChange}
                        />
                    </div>

                    {/* Mahkeme Dosya No */}
                    <div className="mb-4">
                        <label className="block text-gray-700 mb-2" htmlFor="mahkemeDosyaNo">
                            Mahkeme Dosya No
                        </label>
                        <input
                            type="text"
                            id="mahkemeDosyaNo"
                            className="w-full p-2 border border-gray-300 rounded"
                            placeholder="Mahkeme dosya no"
                            value={formData.detaylar.davaBilgileri.mahkemeDosyaNo}
                            onChange={handleCourtInfoChange}
                        />
                    </div>

                    {/* Sonucu Açıklama */}
                    <div className="mb-4">
                        <label className="block text-gray-700 mb-2" htmlFor="sonucuAciklama">
                            Sonucu Açıklama
                        </label>
                        <input
                            type="text"
                            id="sonucuAciklama"
                            className="w-full p-2 border border-gray-300 rounded"
                            placeholder="Sonucu açıklama"
                            value={formData.detaylar.davaBilgileri.sonucuAciklama}
                            onChange={handleCourtInfoChange}
                        />
                    </div>

                    {/* Sonucu Aşama */}
                    <div className="mb-4">
                        <label className="block text-gray-700 mb-2" htmlFor="sonucuAsama">
                            Sonucu Aşama
                        </label>
                        <input
                            type="text"
                            id="sonucuAsama"
                            className="w-full p-2 border border-gray-300 rounded"
                            placeholder="Sonucu aşama"
                            value={formData.detaylar.davaBilgileri.sonucuAsama}
                            onChange={handleCourtInfoChange}
                        />
                    </div>
                </div>
            )}
        </div>
    );
};

export default DetailsForm;