import React, { useState } from "react";
import { AiOutlineCheck, AiOutlineClose } from "react-icons/ai";
import Sidebar from "../components/Sidebar";
import Header from "../components/Header";
import AddApplication from "../components/AddApplication";
import ApplicationDetails from "../components/ApplicationDetails";
import useApplicationStore from "../stores/ApplicationStore";

const Application = () => {
  const [showAddApplication, setShowAddApplication] = useState(false);
  const [searchCriteria, setSearchCriteria] = useState("tcKimlikNo");
  const [searchValue, setSearchValue] = useState("");
  const [notification, setNotification] = useState("");
  const [statuses, setStatuses] = useState({});
  const [selectedDetails, setSelectedDetails] = useState(null);

  const { applications, addApplication } = useApplicationStore();

  const filteredApplications = applications.filter((app) => {
    if (searchCriteria === "Reddedildi") {
      return app.status === "Reddedildi";
    }
    if (searchCriteria === "Tüm Başvurular") {
      return true;
    }
    if (!searchValue) return true;
    const valueToSearch =
      searchCriteria === "tcKimlikNo"
        ? app.tcKimlikNo
        : searchCriteria === "adiSoyadi"
        ? `${app.adi} ${app.soyadi}`
        : app.ihlalNedeni;

    return valueToSearch.toLowerCase().includes(searchValue.toLowerCase());
  });

  const handleShowDetails = (app) => {
    setSelectedDetails(app.detaylar);
  };

  const handleSaveApplication = (data) => {
    addApplication(data);
    setShowAddApplication(false);
    setNotification("Başvuru Başarıyla Eklendi");
    setTimeout(() => setNotification(""), 3000);
  };

  const handleStatusChange = (tcKimlikNo, status) => {
    useApplicationStore.getState().updateApplicationStatus(tcKimlikNo, status);
    setStatuses((prevStatuses) => ({ ...prevStatuses, [tcKimlikNo]: status }));
  };

  const getStatusClass = (status) => {
    switch (status) {
      case "Onaylandı":
        return "text-green-500 font-semibold";
      case "Reddedildi":
        return "text-red-500 font-semibold";
      default:
        return "text-gray-500 font-semibold";
    }
  };

  return (
    <div className="flex h-screen">
      <Sidebar />

      <div className="flex-1 flex flex-col">
        <Header />

        {notification && (
          <div className="fixed bottom-4 right-4 bg-green-500 text-white px-4 py-2 rounded shadow-lg">
            {notification}
          </div>
        )}

        <div className="flex-1 flex flex-col bg-gray-200 p-8">
          <div className="flex justify-between mb-4">
            <div className="flex items-center space-x-2">
              <select
                className="border border-gray-300 rounded px-4 py-2"
                value={searchCriteria}
                onChange={(e) => setSearchCriteria(e.target.value)}
              >
                <option value="tcKimlikNo">T.C. Kimlik No</option>
                <option value="adiSoyadi">Başvuruyu Yapan</option>
                <option value="ihlalNedeni">İhlal/Yakınma Nedeni</option>
              </select>
              <input
                type="text"
                className="border border-gray-300 rounded px-4 py-2 flex-grow mr-4"
                placeholder={
                  searchCriteria === "tcKimlikNo"
                    ? "T.C. Kimlik No girin"
                    : searchCriteria === "adiSoyadi"
                    ? "Başvuruyu Yapan adı girin"
                    : "İhlal Nedeni girin"
                }
                value={searchValue}
                onChange={(e) => setSearchValue(e.target.value)}
              />
            </div>

            <div className="flex items-center space-x-4">
              <button
                className="px-4 py-2 bg-gray-500 text-white font-semibold rounded hover:bg-gray-600"
                onClick={() => setSearchCriteria("Tüm Başvurular")}
              >
                Tüm Başvurular
              </button>
              <button
                className="px-4 py-2 bg-red-500 text-white font-semibold rounded hover:bg-red-600"
                onClick={() => setSearchCriteria("Reddedildi")}
              >
                Reddedilen
              </button>
              <button
                className="px-4 py-2 bg-[#000090] text-white font-semibold rounded hover:bg-[#002855]"
                onClick={() => setShowAddApplication(true)}
              >
                Başvuru Ekle
              </button>
            </div>
          </div>

          <div className="text-gray-700 max-h-[520px] w-full overflow-y-auto">
            <table className="table-auto w-full border border-gray-300">
              <thead className="bg-gray-100">
                <tr>
                  <th className="border border-gray-300 px-4 py-2">T.C. Kimlik No</th>
                  <th className="border border-gray-300 px-4 py-2">Başvuruyu Yapan</th>
                  <th className="border border-gray-300 px-4 py-2">İhlal/Yakınma Nedeni</th>
                  <th className="border border-gray-300 px-4 py-2">Detaylar</th>
                  <th className="border border-gray-300 px-4 py-2">Durum</th>
                  <th className="border border-gray-300 px-4 py-2">İşlem</th>
                </tr>
              </thead>
              <tbody>
                {filteredApplications.map((app, index) => (
                  <tr
                    key={index}
                    className={index % 2 === 0 ? "bg-white" : "bg-gray-100"}
                  >
                    <td className="border border-gray-300 px-4 py-2">{app.tcKimlikNo}</td>
                    <td className="border border-gray-300 px-4 py-2">{`${app.adi} ${app.soyadi}`}</td>
                    <td className="border border-gray-300 px-4 py-2">{app.ihlalNedeni}</td>
                    <td className="border border-gray-300 px-4 py-2">
                      <button
                        className="text-blue-500 hover:underline"
                        onClick={() => handleShowDetails(app)}
                      >
                        Detaylar
                      </button>
                    </td>
                    <td
                      className={`border border-gray-300 px-4 py-2 ${getStatusClass(
                        statuses[app.tcKimlikNo] || app.status || "Bekliyor"
                      )}`}
                    >
                      {statuses[app.tcKimlikNo] || app.status || "Bekliyor"}
                    </td>
                    <td className="border border-gray-300 px-4 py-2">
                      <div className="grid grid-cols-2 gap-2">
                        <button
                          className="w-8 h-8 bg-green-500 text-white rounded-full flex items-center justify-center hover:bg-green-600"
                          onClick={() => handleStatusChange(app.tcKimlikNo, "Onaylandı")}
                        >
                          <AiOutlineCheck />
                        </button>
                        <button
                          className="w-8 h-8 bg-red-500 text-white rounded-full flex items-center justify-center hover:bg-red-600"
                          onClick={() => handleStatusChange(app.tcKimlikNo, "Reddedildi")}
                        >
                          <AiOutlineClose />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>

            <ApplicationDetails
              details={selectedDetails}
              onClose={() => setSelectedDetails(null)}
            />
          </div>
        </div>

        {showAddApplication && (
          <AddApplication
            onClose={() => setShowAddApplication(false)}
            onSave={handleSaveApplication}
          />
        )}
      </div>
    </div>
  );
};

export default Application;
