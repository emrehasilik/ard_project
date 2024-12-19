import React from 'react';

const ViolationForm = ({
  violationData,
  setViolationData,
  isViolationInfoAvailable,
  setIsViolationInfoAvailable,
}) => {
  const handleViolationFieldChange = (e) => {
    const { id, value } = e.target;
    setViolationData((prevData) => ({
      ...prevData,
      [id]: value,
    }));
  };

  const handleFileChange = (e) => {
    const selectedFiles = Array.from(e.target.files);
    setViolationData((prevData) => ({
      ...prevData,
      uploadedFiles: selectedFiles.map((file) => file.name), // Gerçekte burada dosya yüklemesi yapıp elde edilen linkleri eklemeniz gerekir.
    }));
  };

  const handleCategoryChange = (e) => {
    const { value } = e.target;
    setViolationData((prevData) => ({
      ...prevData,
      dataCategory: value,
      // Seçim yapıldığında ilgili alanları temizleyebilirsiniz
      reportingOrganization: "",
      takenByCommission: "",
      publicInstitution: "",
      source: "",
      link: "",
      visualLink: ""
    }));
  };

  return (
    <div className="mt-4">
      <input
        type="checkbox"
        id="violationInfo"
        className="mr-2"
        checked={isViolationInfoAvailable}
        onChange={() => setIsViolationInfoAvailable(!isViolationInfoAvailable)}
      />
      <label htmlFor="violationInfo" className="text-purple-600 font-semibold">
        İhlal Bilgileri Mevcut
      </label>

      {isViolationInfoAvailable && (
        <div className="border border-gray-300 rounded mt-4 p-4">

          {/* Ortak Alanlar */}
          <div className="mb-4">
            <label className="block text-gray-700 mb-2" htmlFor="scanningPeriod">
              Tarama Dönemi
            </label>
            <input
              type="text"
              id="scanningPeriod"
              className="w-full p-2 border border-gray-300 rounded"
              placeholder="Tarama dönemi girin"
              value={violationData.scanningPeriod || ""}
              onChange={handleViolationFieldChange}
            />
          </div>

          <div className="mb-4">
            <label className="block text-gray-700 mb-2" htmlFor="eventCategory">
              Olay Kategorisi
            </label>
            <input
              type="text"
              id="eventCategory"
              className="w-full p-2 border border-gray-300 rounded"
              placeholder="Olay kategorisi girin"
              value={violationData.eventCategory || ""}
              onChange={handleViolationFieldChange}
            />
          </div>

          <div className="mb-4">
            <label className="block text-gray-700 mb-2" htmlFor="eventSummary">
              Olay Özeti
            </label>
            <textarea
              id="eventSummary"
              className="w-full p-2 border border-gray-300 rounded"
              placeholder="Olay özetini girin"
              value={violationData.eventSummary || ""}
              onChange={handleViolationFieldChange}
            />
          </div>

          {/* Veri Kategorisi Seçimi */}
          <div className="mb-4">
            <label className="block text-gray-700 mb-2" htmlFor="dataCategory">
              Veri Kategorisi
            </label>
            <select
              id="dataCategory"
              className="w-full p-2 border border-gray-300 rounded"
              value={violationData.dataCategory || ""}
              onChange={handleCategoryChange}
            >
              <option value="">Kategori Seçin</option>
              <option value="ngo">STK Verileri</option>
              <option value="media">Medya Taraması</option>
              <option value="barCommission">Baro Komisyonları</option>
              <option value="publicInstitution">Kamu Kurumları</option>
            </select>
          </div>

          {/* Seçilen Kategoriye Göre Alanlar */}
          {violationData.dataCategory === "media" && (
            <>
              <div className="mb-4">
                <label className="block text-gray-700 mb-2" htmlFor="source">
                  Kaynak
                </label>
                <input
                  type="text"
                  id="source"
                  className="w-full p-2 border border-gray-300 rounded"
                  placeholder="Kaynak girin"
                  value={violationData.source || ""}
                  onChange={handleViolationFieldChange}
                />
              </div>

              <div className="mb-4">
                <label className="block text-gray-700 mb-2" htmlFor="link">
                  Genel Link
                </label>
                <input
                  type="text"
                  id="link"
                  className="w-full p-2 border border-gray-300 rounded"
                  placeholder="Genel link girin"
                  value={violationData.link || ""}
                  onChange={handleViolationFieldChange}
                />
              </div>

              <div className="mb-4">
                <label className="block text-gray-700 mb-2" htmlFor="visualLink">
                  Görsel Link
                </label>
                <input
                  type="text"
                  id="visualLink"
                  className="w-full p-2 border border-gray-300 rounded"
                  placeholder="Görsel link girin"
                  value={violationData.visualLink || ""}
                  onChange={handleViolationFieldChange}
                />
              </div>
            </>
          )}

          {violationData.dataCategory === "ngo" && (
            <div className="mb-4">
              <label className="block text-gray-700 mb-2" htmlFor="reportingOrganization">
                Bildirim Kurumu
              </label>
              <input
                type="text"
                id="reportingOrganization"
                className="w-full p-2 border border-gray-300 rounded"
                placeholder="Bildirim kurumunu girin"
                value={violationData.reportingOrganization || ""}
                onChange={handleViolationFieldChange}
              />
            </div>
          )}

          {violationData.dataCategory === "barCommission" && (
            <div className="mb-4">
              <label className="block text-gray-700 mb-2" htmlFor="takenByCommission">
                Vakanın Alındığı Komisyon
              </label>
              <input
                type="text"
                id="takenByCommission"
                className="w-full p-2 border border-gray-300 rounded"
                placeholder="Vakanın alındığı komisyonu girin"
                value={violationData.takenByCommission || ""}
                onChange={handleViolationFieldChange}
              />
            </div>
          )}

          {violationData.dataCategory === "publicInstitution" && (
            <div className="mb-4">
              <label className="block text-gray-700 mb-2" htmlFor="publicInstitution">
                Kamu Kurumu
              </label>
              <input
                type="text"
                id="publicInstitution"
                className="w-full p-2 border border-gray-300 rounded"
                placeholder="Kamu kurumu girin"
                value={violationData.publicInstitution || ""}
                onChange={handleViolationFieldChange}
              />
            </div>
          )}

          {/* Dosya Yükleme */}
          <div className="mb-4">
            <label className="block text-gray-700 mb-2" htmlFor="uploadedFiles">
              Dosya Yükleme (Her türlü format)
            </label>
            <input
              type="file"
              id="uploadedFiles"
              multiple
              className="w-full p-2 border border-gray-300 rounded"
              onChange={handleFileChange}
            />
            {violationData.uploadedFiles && violationData.uploadedFiles.length > 0 && (
              <div className="text-sm text-gray-700 mt-2">
                {violationData.uploadedFiles.length} dosya seçildi.
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
};

export default ViolationForm;
