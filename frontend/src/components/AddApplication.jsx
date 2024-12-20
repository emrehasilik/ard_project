import React, { useState, useEffect } from "react";
import useLawyerStore from "../stores/LawyerStore";
import DetailsForm from "./ApplicationDetailsForm";
import FormField from "./ApplicationFormField";
import { validateForm } from "../utils/validation";
import ViolationForm from "./ViolationForm";
import axios from "axios";

const AddApplication = ({ onClose, onSave }) => {
  const [formData, setFormData] = useState({
    tcKimlikNo: "",
    adi: "",
    soyadi: "",
    ihlalNedeni: "",
    detaylar: {
      basvuranTuru: "",
      basvuruTarihi: "",
      takipAvukat: "",
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

  const [violationData, setViolationData] = useState({
    scanningPeriod: "",
    eventCategory: "",
    eventSummary: "",
    source: "",
    link: "",
    visualLink: "",
    uploadedFiles: [],
    reportingOrganization: "",
    takenByCommission: "",
    publicInstitution: "",
    dataCategory: "",
  });
  const [isViolationInfoAvailable, setIsViolationInfoAvailable] = useState(false);

  const [isCourtInfoAvailable, setIsCourtInfoAvailable] = useState(false);
  const [isSelfApplicant, setIsSelfApplicant] = useState(false);
  const [isCustomReason, setIsCustomReason] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const [files, setFiles] = useState([]);

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

  const { lawyers, fetchLawyers } = useLawyerStore();

  useEffect(() => {
    fetchLawyers();
  }, [fetchLawyers]);

  const fieldNames = {
    tcKimlikNo: "T.C. Kimlik Numarası",
    adi: "Adı",
    soyadi: "Soyadı",
    ihlalNedeni: "İhlal/Yakınma Nedeni",
    "detaylar.basvuranTuru": "Başvuran Türü",
    "detaylar.takipAvukat": "Takip Eden Avukat",
    "detaylar.dosyaAciklama": "Dosya Açıklaması",
  };

  const requiredFields = [
    "tcKimlikNo",
    "adi",
    "soyadi",
    "ihlalNedeni",
    "detaylar.basvuranTuru",
    "detaylar.takipAvukat",
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

  const handleFileUpload = async (e) => {
    const file = e.target.files[0];
    if (!file) {
      alert("Dosya seçilmedi");
      return;
    }

    const formData = new FormData();
    formData.append("file", file);

    try {
      const response = await axios.post("http://localhost:5000/api/s3/upload", formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });

      alert("Dosya başarıyla yüklendi: " + response.data.url);
    } catch (error) {
      console.error("Dosya yükleme hatası:", error);
      alert("Dosya yükleme başarısız oldu");
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    const error = validateForm(formData, fieldNames, requiredFields);
    if (error) {
      setErrorMessage(error);
      return;
    }

    if (files.length > 0 && !formData.detaylar.dosyaAciklama.trim()) {
      setErrorMessage("Dosya eklediğinizde dosya açıklaması girmek zorundasınız.");
      return;
    }

    const fileLinks = files.map((file) => file.name);

    const description = files.length > 0 ? formData.detaylar.dosyaAciklama : "";

    const formattedData = {
      applicationData: {
        nationalId: formData.tcKimlikNo,
        firstName: formData.adi,
        lastName: formData.soyadi,
        applicationType: formData.detaylar.basvuranTuru,
        applicationDate: formData.detaylar.basvuruTarihi,
        lawyer: formData.detaylar.takipAvukat,
        violationReason: formData.ihlalNedeni,
        submissionType: "Online",
        description,
        courtInfo: {
          caseNumber: formData.detaylar.davaBilgileri.dosyaNumarasi || "",
          courtName: formData.detaylar.davaBilgileri.mahkeme || "",
          courtFileNumber: formData.detaylar.davaBilgileri.mahkemeDosyaNo || "",
          resultDescription: formData.detaylar.davaBilgileri.sonucuAciklama || "",
          resultStatus: formData.detaylar.davaBilgileri.sonucuAsama || "",
        },
        fileLinks: fileLinks,
      },
      violationData: isViolationInfoAvailable ? violationData : null,
    };

    onSave(formattedData);
    setErrorMessage("");
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
            <FormField
              label="Başvuran Türü"
              id="basvuranTuru"
              type="select"
              value={formData.detaylar.basvuranTuru}
              onChange={handleInputChange}
              options={["Kişi", "Kurum", "Diğer"]}
              disabled={isSelfApplicant}
            />
            <FormField
              label="Takip Eden Avukat"
              id="takipAvukat"
              type="select"
              value={formData.detaylar.takipAvukat}
              onChange={handleInputChange}
              options={lawyers.map((lawyer) => `${lawyer.firstName} ${lawyer.lastName}`)}
            />
            <FormField
              label="İhlal Nedeni"
              id="ihlalNedeni"
              type="select"
              value={formData.ihlalNedeni}
              onChange={handleInputChange}
              options={[
                "Aile ve Özel Yaşam Hakkı",
                "Ayrımcılık",
                "Basın/Medya Özgürlüğü",
                "Kadına Karşı Şiddet ve Taciz",
                "Çocuğa Karşı Şiddet ve Taciz",
                "Örgütlenme Özgürlüğü",
                "İşkence ve Kötü Muamele",
                "Eğitim Hakkı",
                "Düşünce ve İfade Özgürlüğü",
              ]}
              disabled={isCustomReason}
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
                disabled={files.length === 0}
              />
              <div className="mt-2 flex justify-start space-x-4">
                <label className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 cursor-pointer">
                  Dosya Ekle
                  <input
                    type="file"
                    className="hidden"
                    onChange={handleFileUpload}
                  />
                </label>
                {files.length > 0 && (
                  <div className="text-sm text-gray-700">{files.length} dosya seçildi.</div>
                )}
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

          <ViolationForm
            violationData={violationData}
            setViolationData={setViolationData}
            isViolationInfoAvailable={isViolationInfoAvailable}
            setIsViolationInfoAvailable={setIsViolationInfoAvailable}
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
