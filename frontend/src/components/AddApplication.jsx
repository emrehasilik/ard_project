// src/components/AddApplication.jsx

import React, { useState, useEffect } from "react";
import useLawyerStore from "../stores/LawyerStore";
import DetailsForm from "./ApplicationDetailsForm";
import FormField from "./ApplicationFormField";
import { validateForm } from "../utils/validation";

const AddApplication = ({ onClose, onSave }) => {
    const [formData, setFormData] = useState({
        tcKimlikNo: "",
        adi: "",
        soyadi: "",
        ihlalNedeni: "",
        detaylar: {
            basvuruNumarasi: "",
            basvuranTuru: "",
            basvuruTarihi: "",
            takipAvukat: "",
            basvuruyuAlan: "",
            dosyaAciklama: "",
            davaBilgileri: {
                dosyaNumarasi: "",
                mahkeme: "",
                mahkemeDosyaNo: "",
                sonucuAciklama: "",
                sonucuAsama: "",
            },
        },
    });

    useEffect(() => {
        const today = new Date().toISOString().split("T")[0];
        setFormData((prevFormData) => ({
            ...prevFormData,
            detaylar: {
                ...prevFormData.detaylar,
                basvuruTarihi: today,
            },
        }));
    }, []);

    const { lawyers } = useLawyerStore();
    const [isCourtInfoAvailable, setIsCourtInfoAvailable] = useState(false);
    const [isSelfApplicant, setIsSelfApplicant] = useState(false);
    const [isCustomReason, setIsCustomReason] = useState(false);
    const [errorMessage, setErrorMessage] = useState("");

    const fieldNames = {
        tcKimlikNo: "T.C. Kimlik Numarası",
        adi: "Adı",
        soyadi: "Soyadı",
        ihlalNedeni: "İhlal/Yakınma Nedeni",
        "detaylar.basvuranTuru": "Başvuran Türü",
        "detaylar.takipAvukat": "Takip Eden Avukat",
        "detaylar.basvuruyuAlan": "Başvuruyu Alan",
        "detaylar.dosyaAciklama": "Dosya Açıklaması",
    };

    const requiredFields = [
        "tcKimlikNo",
        "adi",
        "soyadi",
        "ihlalNedeni",
        "detaylar.basvuranTuru",
        "detaylar.takipAvukat",
        "detaylar.basvuruyuAlan",
        "detaylar.dosyaAciklama",
    ];

    const handleInputChange = (e) => {
        const { id, value } = e.target;
        if (id in formData.detaylar) {
            setFormData({
                ...formData,
                detaylar: {
                    ...formData.detaylar,
                    [id]: value,
                },
            });
        } else {
            setFormData({
                ...formData,
                [id]: value,
            });
        }
    };

    const handleCourtInfoChange = (e) => {
        const { id, value } = e.target;
        setFormData((prevData) => ({
            ...prevData,
            detaylar: {
                ...prevData.detaylar,
                davaBilgileri: {
                    ...prevData.detaylar.davaBilgileri,
                    [id]: value,
                },
            },
        }));
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        const error = validateForm(formData, fieldNames, requiredFields);

        if (error) {
            setErrorMessage(error);
            return;
        }

        onSave(formData);
        setErrorMessage("");
        setFormData({
            tcKimlikNo: "",
            adi: "",
            soyadi: "",
            ihlalNedeni: "",
            detaylar: {
                basvuruNumarasi: "",
                basvuranTuru: "",
                takipAvukat: "",
                basvuruyuAlan: "",
                dosyaAciklama: "",
            },
        });
        onClose();
    };

    return (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center overflow-auto">
            <div className="bg-white p-8 rounded shadow-lg w-3/4 max-h-[90vh] overflow-y-auto">
                <h2 className="text-xl font-bold mb-4">Başvuru Ekle</h2>
                <form onSubmit={handleSubmit}>
                    <div className="grid grid-cols-2 gap-4 mb-8">
                        <FormField
                            label="T.C. Kimlik No"
                            id="tcKimlikNo"
                            type="text"
                            value={formData.tcKimlikNo}
                            onChange={handleInputChange}
                            placeholder="T.C. Kimlik Numaranızı girin"
                        />
                        <FormField
                            label="Adı"
                            id="adi"
                            type="text"
                            value={formData.adi}
                            onChange={handleInputChange}
                            placeholder="Adınızı girin"
                        />
                        <FormField
                            label="Soyadı"
                            id="soyadi"
                            type="text"
                            value={formData.soyadi}
                            onChange={handleInputChange}
                            placeholder="Soyadınızı girin"
                        />
                        <div>
                            <FormField
                                label="Başvuran Türü"
                                id="basvuranTuru"
                                type="select"
                                value={formData.detaylar.basvuranTuru}
                                onChange={handleInputChange}
                                options={["STK", "Basın/Medya", "Kamu Kuruluşu", "Baro Komisyonu"]}
                                disabled={isSelfApplicant}
                            />
                            <div className="mt-2">
                                <input
                                    type="checkbox"
                                    id="isSelfApplicant"
                                    className="mr-2"
                                    checked={isSelfApplicant}
                                    onChange={() => {
                                        setIsSelfApplicant(!isSelfApplicant);
                                        setFormData({
                                            ...formData,
                                            detaylar: {
                                                ...formData.detaylar,
                                                basvuranTuru: isSelfApplicant ? "" : "Mağdur/Kendisi",
                                            },
                                        });
                                    }}
                                />
                                <label htmlFor="isSelfApplicant" className="text-gray-700">
                                    Mağdur/Kendisi
                                </label>
                            </div>
                        </div>
                        <FormField
                            label="Başvuruyu Alan"
                            id="basvuruyuAlan"
                            type="text"
                            value={formData.detaylar.basvuruyuAlan}
                            onChange={handleInputChange}
                            placeholder="Başvuruyu alan kişiyi girin"
                        />
                        <FormField
                            label="Takip Eden Avukat"
                            id="takipAvukat"
                            type="select"
                            value={formData.detaylar.takipAvukat}
                            onChange={handleInputChange}
                            options={lawyers.map((lawyer) => `${lawyer.name} ${lawyer.surname}`)}
                        />
                        <div>
                            <FormField
                                label="İhlal Nedeni"
                                id="ihlalNedeni"
                                type="select"
                                value={formData.ihlalNedeni}
                                onChange={handleInputChange}
                                options={[
                                    "Aile ve Özel Yaşam Hakkı",
                                    "Ayrımcılık",
                                    "Basın Özgürlüğü",
                                    "Kadına Karşı Şiddet ve Taciz",
                                    "Çocuğa Karşı Şiddet ve Taciz",
                                    "Örgütlenme Özgürlüğü",
                                    "İşkence ve Kötü Muamele",
                                    "Eğitim Hakkı",
                                    "Düşünce ve İfade Özgürlüğü",
                                ]}
                                disabled={isCustomReason}
                            />
                            <div className="mt-2">
                                <input
                                    type="checkbox"
                                    id="isCustomReason"
                                    className="mr-2"
                                    checked={isCustomReason}
                                    onChange={() => {
                                        setIsCustomReason(!isCustomReason);
                                        setFormData({
                                            ...formData,
                                            ihlalNedeni: isCustomReason ? "" : "Diğer",
                                        });
                                    }}
                                />
                                <label htmlFor="isCustomReason" className="text-gray-700">
                                    Yukarıdakilerden hiçbirisi ihlal/yakınma nedenim değildir.
                                </label>
                            </div>
                        </div>
                        <FormField
                            label="Başvuru Numarası"
                            id="basvuruNumarasi"
                            type="text"
                            value={formData.detaylar.basvuruNumarasi}
                            onChange={handleInputChange}
                            placeholder="Başvuru numarası girin"
                        />
                        <div>
                            <label className="block text-gray-700 mb-2" htmlFor="dosyaAciklama">
                                Dosya Açıklaması
                            </label>
                            <textarea
                                id="dosyaAciklama"
                                className="w-full p-2 border border-gray-300 rounded"
                                placeholder="Dosya açıklamasını girin"
                                value={formData.detaylar.dosyaAciklama}
                                onChange={handleInputChange}
                            />
                            <div className="mt-2 flex justify-start">
                                <button
                                    type="button"
                                    className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
                                >
                                    Dosya Ekle
                                </button>
                            </div>
                        </div>
                    </div>

                    <DetailsForm
                        formData={formData}
                        handleInputChange={handleInputChange}
                        handleCourtInfoChange={handleCourtInfoChange}
                        isCourtInfoAvailable={isCourtInfoAvailable}
                        setIsCourtInfoAvailable={setIsCourtInfoAvailable}
                    />

                    {errorMessage && <div className="text-red-500 mb-4">{errorMessage}</div>}

                    <div className="flex justify-end">
                        <button
                            type="button"
                            className="mr-4 bg-gray-300 text-gray-700 px-4 py-2 rounded"
                            onClick={onClose}
                        >
                            İptal
                        </button>
                        <button
                            type="submit"
                            className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
                        >
                            Kaydet
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default AddApplication;