import React, { useEffect, useState } from "react";
import axios from "axios";

const LawyerAccess = () => {
  const [cases, setCases] = useState([]);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchAssignedCases = async () => {
      try {
        const token = localStorage.getItem("token");
        if (!token) {
          setError("Erişim reddedildi. Lütfen giriş yapın.");
          return;
        }

        const response = await axios.get("http://localhost:5000/api/cases/assigned", {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        console.log("Gelen Yanıt:", response.data);
        setCases(response.data);
      } catch (err) {
        console.error("Hata:", err.response?.data || err.message);
        setError("Davalar yüklenirken bir hata oluştu.");
      }
    };

    fetchAssignedCases();
  }, []);

  return (
    <div className="min-h-screen bg-gray-900 flex items-center justify-center py-12 px-6">
      <div className="w-full max-w-5xl bg-gray-100 rounded-lg shadow-xl">
        <header className="bg-gray-800 text-white py-4 px-6 rounded-t-lg">
          <h1 className="text-2xl font-bold tracking-wide">Avukata Atanan Davalar</h1>
        </header>
        <div className="p-6">
          {error ? (
            <div className="bg-red-50 border border-red-400 text-red-700 px-4 py-3 rounded">
              <strong className="font-semibold">Hata:</strong>{" "}
              <span>{error}</span>
            </div>
          ) : (
            <div>
              {cases.length > 0 ? (
                <ul className="divide-y divide-gray-300">
                  {cases.map((caseItem) => (
                    <li
                      key={caseItem._id}
                      className="py-4 px-6 hover:bg-gray-200 transition-all rounded-lg"
                    >
                      <div className="flex justify-between items-center">
                        <h3 className="text-lg font-semibold text-gray-700">
                          {caseItem.caseNumber}
                        </h3>
                        <span className="text-sm text-gray-500">
                          {new Date().toLocaleDateString()}
                        </span>
                      </div>
                      <p className="text-gray-600 mt-2">{caseItem.subject}</p>
                    </li>
                  ))}
                </ul>
              ) : (
                <p className="text-gray-600 text-center text-lg">
                  Henüz size atanan bir dava bulunmamaktadır.
                </p>
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default LawyerAccess;
