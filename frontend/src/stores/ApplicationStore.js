import axios from "axios";
import { create } from "zustand";



const useApplicationStore = create((set, get) => ({
  applications: [],

  // Başvuruları sunucudan çekme fonksiyonu
  fetchApplications: async () => {
    try {
      const response = await axios.get("/api/applications");

      // Gelen veriyi frontend için formatla
      const formattedData = response.data.map((app) => ({
        tcKimlikNo: app.nationalId || "", // T.C. Kimlik No
        adi: app.firstName || "", // Adı
        soyadi: app.lastName || "", // Soyadı
        ihlalNedeni: app.violationReason || "", // İhlal Nedeni
        detaylar: {
          basvuruTuru: app.applicationType || "",
          basvuruTarihi: app.applicationDate || "",
          basvuruyuAlan: app.handler || "",
          dosyaAciklama: app.description || "",
          dosyaLinkleri: app.fileLinks || [],
        },
        status: app.status || "pending", // Durum
        _id: app._id, // Backend'den dönen ID
      }));

      set({ applications: formattedData });
    } catch (error) {
      console.error("Error fetching applications:", error);
    }
  },

  // Yeni başvuru ekleme fonksiyonu
  addApplication: async (application) => {
    try {
      const response = await axios.post("/api/applications", application);

      const newApplication = {
        tcKimlikNo: response.data.nationalId || "",
        adi: response.data.firstName || "",
        soyadi: response.data.lastName || "",
        ihlalNedeni: response.data.violationReason || "",
        detaylar: {
          basvuruTuru: response.data.applicationType || "",
          basvuruTarihi: response.data.applicationDate || "",
          basvuruyuAlan: response.data.handler || "",
          dosyaAciklama: response.data.description || "",
          dosyaLinkleri: response.data.fileLinks || [],
        },
        status: response.data.status || "pending",
        _id: response.data._id,
      };

      set((state) => ({
        applications: [...state.applications, newApplication],
      }));
    } catch (error) {
      console.error("Error adding application:", error);
    }
  },

  // Başvuru silme fonksiyonu
  removeApplication: async (applicationId) => {
    try {
      await axios.delete(`/api/applications/${applicationId}`);
      set((state) => ({
        applications: state.applications.filter((app) => app._id !== applicationId),
      }));
    } catch (error) {
      console.error("Error removing application:", error);
    }
  },

  // Başvuru güncelleme fonksiyonu
  updateApplication: async (applicationId, updatedApplication) => {
    try {
      const response = await axios.put(`/api/applications/${applicationId}`, updatedApplication);

      const updatedApp = {
        tcKimlikNo: response.data.nationalId || "", // T.C. Kimlik No
        adi: response.data.firstName || "",
        soyadi: response.data.lastName || "",
        ihlalNedeni: response.data.violationReason || "",
        detaylar: {
          basvuruTuru: response.data.applicationType || "",
          basvuruTarihi: response.data.applicationDate || "",
          basvuruyuAlan: response.data.handler || "",
          dosyaAciklama: response.data.description || "",
          dosyaLinkleri: response.data.fileLinks || [],
        },
        status: response.data.status || "pending",
        _id: response.data._id,
      };

      set((state) => ({
        applications: state.applications.map((app) =>
          app._id === applicationId ? updatedApp : app
        ),
      }));
    } catch (error) {
      console.error("Error updating application:", error);
    }
  },

  // Onaylanan başvuruları filtreleyen fonksiyon
  getApprovedApplications: () => {
    return get().applications.filter((app) => app.status === "approved");
  },
}));

export default useApplicationStore;
