import React from "react";
import { AiOutlineClose } from "react-icons/ai";

const ApplicationDetails = ({ details, onClose }) => {
  if (!details) return null; // Eğer detay yoksa render edilmez.

  const {
    firstName = "N/A",
    lastName = "N/A",
    description = "N/A",
    applicationDate = "N/A",
    submissionType = "N/A",
    handler = "N/A",
    lawyer = "N/A",
    violationReason = "N/A",
    courtInfo = {},
  } = details;

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
            <strong>Ad Soyad:</strong> {`${firstName} ${lastName}`}
          </p>
          <p>
            <strong>Başvuru Tarihi:</strong> {new Date(applicationDate).toLocaleDateString()}
          </p>
          <p>
            <strong>Başvuruyu Alan:</strong> {handler}
          </p>
          <p>
            <strong>Takip Eden Avukat:</strong> {lawyer}
          </p>
          <p>
            <strong>İhlal Nedeni:</strong> {violationReason}
          </p>
          <p>
            <strong>Başvuru Türü:</strong> {submissionType}
          </p>
          <p>
            <strong>Açıklama:</strong> {description}
          </p>
        </div>
        {courtInfo && (
          <div className="mt-4 grid grid-cols-1 gap-4 text-gray-700 text-sm">
            <h3 className="text-xl font-bold text-gray-800">Dava Bilgileri</h3>
            <p>
              <strong>Dosya Numarası:</strong> {courtInfo.caseNumber || "N/A"}
            </p>
            <p>
              <strong>Mahkeme:</strong> {courtInfo.courtName || "N/A"}
            </p>
            <p>
              <strong>Mahkeme Dosya Numarası:</strong> {courtInfo.courtFileNumber || "N/A"}
            </p>
            <p>
              <strong>Sonuç Açıklama:</strong> {courtInfo.resultDescription || "N/A"}
            </p>
            <p>
              <strong>Sonuç Aşama:</strong> {courtInfo.resultStatus || "N/A"}
            </p>
          </div>
        )}
      </div>
    </div>
  );
};

export default ApplicationDetails;
